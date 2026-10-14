"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function CustomerChatWidget({ apiUrl, defaultConversation = "CUST-001" }) {
  const { lang } = useLanguage ? useLanguage() : { lang: "th" };
  const isTh = lang !== "en";

  const [isOpen, setIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState(defaultConversation);
  const [customerName, setCustomerName] = useState("Alex Morgan");
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const chatScrollRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/chat/messages?conversation_id=${conversationId}`);
      if (res.ok) {
        const data = await res.json();
        const msgList = data.messages || [];
        setMessages(msgList);

        // Count unread from admin
        if (!isOpen) {
          const unread = msgList.filter((m) => m.sender === "admin" && !m.read).length;
          setUnreadCount(unread);
        }
      }
    } catch (err) {
      console.warn("Widget fetch error:", err.message);
    }
  };

  useEffect(() => {
    fetchMessages();
    const timer = setInterval(fetchMessages, 3000);
    return () => clearInterval(timer);
  }, [conversationId, isOpen]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (customText) => {
    const text = (customText || inputText).trim();
    if (!text) return;

    try {
      const res = await fetch(`${apiUrl}/api/chat/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation_id: conversationId,
          customer_name: customerName,
          sender: "customer",
          text: text,
        }),
      });

      if (res.ok) {
        setInputText("");
        fetchMessages();
      }
    } catch (err) {
      alert((isTh ? "ส่งข้อความไม่สำเร็จ: " : "Failed to send message: ") + err.message);
    }
  };

  const sampleInquiries = isTh
    ? ["สอบถามอะไหล่แท้ตรงรุ่น 🚗", "ประเมินราคาซ่อมเบื้องต้น 📋", "ปรึกษาอาการเบรกเสียงดัง 🛠️"]
    : ["OEM parts inquiry 🚗", "Initial repair estimate 📋", "Squeaking brake noise 🛠️"];

  return (
    <aside
      aria-label="ระบบแชทลูกค้าสัมพันธ์ CarGarage"
      className="position-fixed"
      style={{ bottom: "24px", right: "24px", zIndex: 1090 }}
    >
      {/* 1. หน้าต่างกล่องแชท (Chat Window Modal Pop-up) */}
      {isOpen && (
        <div
          className="card border-0 shadow-lg rounded-4 overflow-hidden mb-3 animate-fade-in"
          style={{
            width: "370px",
            height: "510px",
            boxShadow: "0 12px 40px rgba(30, 32, 76, 0.25)",
            border: "1px solid rgba(91, 95, 253, 0.2)",
          }}
        >
          {/* Header กล่องแชท */}
          <div
            className="p-3 text-white d-flex align-items-center justify-content-between"
            style={{
              background: "linear-gradient(135deg, #1e204c 0%, #2f3388 50%, #5b5ffd 100%)",
            }}
          >
            <div className="d-flex align-items-center gap-2.5">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center text-dark fw-bold"
                style={{ width: "38px", height: "38px", background: "var(--theme-accent-gradient)" }}
              >
                <i className="bi bi-tools fs-5"></i>
              </div>
              <div>
                <div className="fw-black" style={{ fontSize: "0.95rem", lineHeight: "1.2" }}>
                  CarGarage Live Support
                </div>
                <div className="small text-white text-opacity-80 d-flex align-items-center gap-1" style={{ fontSize: "0.72rem" }}>
                  <span className="badge bg-success rounded-circle p-1" style={{ width: "7px", height: "7px" }}> </span>
                  <span>{isTh ? "ช่างเทคนิค & แอดมินออนไลน์" : "Technicians & Admins Online"}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setIsOpen(false)}
              title={isTh ? "ปิดหน้าต่างแชท" : "Close chat window"}
            ></button>
          </div>

          {/* แถบเลือกลูกค้าสำหรับทดสอบแชท */}
          <div className="px-3 py-1.5 bg-light border-bottom d-flex align-items-center justify-content-between" style={{ fontSize: "0.76rem" }}>
            <span className="text-muted fw-bold">{isTh ? "สนทนาในชื่อ:" : "Chat as:"}</span>
            <select
              className="form-select form-select-sm py-0 px-2"
              style={{ fontSize: "0.75rem", width: "180px" }}
              value={conversationId}
              onChange={(e) => {
                const val = e.target.value;
                setConversationId(val);
                if (val === "CUST-001") setCustomerName("Alex Morgan");
                else if (val === "CUST-002") setCustomerName("Samantha Hayes");
                else if (val === "CUST-003") setCustomerName("David Kim");
                else setCustomerName(isTh ? "ลูกค้าทั่วไป" : "Guest Customer");
              }}
            >
              <option value="CUST-001">Alex Morgan (Camry)</option>
              <option value="CUST-002">Samantha Hayes (Civic)</option>
              <option value="CUST-003">David Kim (F-150)</option>
              <option value="CUST-GUEST">{isTh ? "ลูกค้าทั่วไป (Guest)" : "Guest Customer"}</option>
            </select>
          </div>

          {/* สตรีมข้อความแชท */}
          <div
            ref={chatScrollRef}
            className="flex-grow-1 p-3 overflow-auto"
            style={{ backgroundColor: "#f8faff" }}
          >
            {messages.length === 0 ? (
              <div className="text-center py-4 text-muted">
                <i className="bi bi-chat-quote fs-2 text-primary opacity-50 mb-1"></i>
                <div className="fw-bold small">{isTh ? "ยินดีต้อนรับสู่ศูนย์บริการ CarGarage" : "Welcome to CarGarage Support"}</div>
                <div style={{ fontSize: "0.75rem" }}>
                  {isTh
                    ? "พิมพ์ข้อความเพื่อสอบถามอะไหล่หรือขอรับคำปรึกษาได้ทันที"
                    : "Type a message below to inquire about parts or ask for advice."}
                </div>
              </div>
            ) : (
              messages.map((m, idx) => {
                const isCustomer = m.sender === "customer";
                return (
                  <div
                    key={idx}
                    className={`d-flex mb-2.5 ${isCustomer ? "justify-content-end" : "justify-content-start"}`}
                  >
                    <div
                      className="p-2.5 rounded-3 shadow-sm"
                      style={{
                        maxWidth: "80%",
                        backgroundColor: isCustomer ? "#5b5ffd" : "#ffffff",
                        color: isCustomer ? "#ffffff" : "#1e293b",
                        border: isCustomer ? "none" : "1px solid #e2e8f0",
                        fontSize: "0.85rem",
                        lineHeight: "1.4",
                      }}
                    >
                      <div className="d-flex align-items-center gap-1 mb-0.5">
                        <span className="fw-bold" style={{ fontSize: "0.7rem", opacity: 0.85 }}>
                          {isCustomer ? (isTh ? "คุณ" : "You") : (isTh ? "👨‍🔧 ช่างศูนย์ CarGarage" : "👨‍🔧 CarGarage Tech")}
                        </span>
                        <span className="ms-auto" style={{ fontSize: "0.65rem", opacity: 0.75 }}>
                          {m.timestamp}
                        </span>
                      </div>
                      <div>{m.text}</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Questions Chips */}
          <div className="px-3 py-1.5 bg-white border-top d-flex gap-1 overflow-auto">
            {sampleInquiries.map((inq, i) => (
              <button
                key={i}
                type="button"
                className="btn btn-outline-secondary btn-sm rounded-pill py-0.5 px-2 text-nowrap"
                style={{ fontSize: "0.72rem" }}
                onClick={() => handleSendMessage(inq)}
              >
                {inq}
              </button>
            ))}
          </div>

          {/* กล่องพิมพ์ส่งข้อความ */}
          <div className="p-2.5 bg-white border-top">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="d-flex gap-1.5"
            >
              <input
                type="text"
                className="form-control form-control-sm rounded-pill px-3"
                placeholder={isTh ? "พิมพ์ข้อความสอบถามที่นี่..." : "Type your message here..."}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-sp-primary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "34px", height: "34px" }}
                title={isTh ? "ส่งข้อความ" : "Send message"}
              >
                <i className="bi bi-send-fill" style={{ fontSize: "0.8rem" }}></i>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. ปุ่มลูกลอยแชทหลัก (Floating Chat Trigger Bubble) */}
      <div className="d-flex align-items-center gap-2">
        {!isOpen && (
          <div
            className="d-none d-sm-flex align-items-center gap-2 py-1.5 px-3 rounded-pill shadow bg-white border cursor-pointer animate-fade-in"
            onClick={() => setIsOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <span className="badge bg-success rounded-circle p-1" style={{ width: "8px", height: "8px" }}> </span>
            <span className="fw-bold text-dark" style={{ fontSize: "0.82rem" }}>
              {isTh ? "แชทปรึกษาช่างอู่ & แอดมิน" : "Live Mechanic & Admin Chat"}
            </span>
          </div>
        )}

        <button
          type="button"
          className="btn rounded-circle shadow-lg position-relative d-flex align-items-center justify-content-center text-white"
          style={{
            width: "58px",
            height: "58px",
            background: "linear-gradient(135deg, #1e204c 0%, #4f46e5 50%, #5b5ffd 100%)",
            border: "2px solid rgba(255, 255, 255, 0.4)",
            boxShadow: "0 8px 24px rgba(91, 95, 253, 0.45)",
            transition: "transform 0.2s ease",
          }}
          onClick={() => setIsOpen(!isOpen)}
          title={isTh ? "เปิด/ปิด แชทสดกับช่างอู่" : "Toggle Live Mechanic Chat"}
        >
          <i className={`bi ${isOpen ? "bi-x-lg" : "bi-chat-dots-fill"} fs-4`}></i>
          {unreadCount > 0 && !isOpen && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
