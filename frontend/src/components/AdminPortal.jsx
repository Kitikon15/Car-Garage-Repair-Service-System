"use client";

import { useState, useEffect, useRef } from "react";
import ProductImage from "./ProductImage";
import AdminVuexyDashboard from "./AdminVuexyDashboard";
import { useLanguage } from "../context/LanguageContext";

export default function AdminPortal({
  parts = [],
  vehicles = [],
  customers = [],
  invoices = [],
  onRefresh,
  apiUrl,
  onSwitchTab,
  initialTab = "dashboard",
  initialConvId = "CUST-001",
  contactSubmission = null,
  activeTabOverride = null,
  onTabChange = null,
  hideBanner = false,
  hideTabs = false,
}) {
  const { lang, t } = useLanguage();
  const [internalTab, setInternalTab] = useState(initialTab || "dashboard"); // 'dashboard' | 'parts' | 'chat' | 'jobs'
  const adminTab = activeTabOverride || internalTab;

  const setAdminTab = (tab) => {
    setInternalTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  useEffect(() => {
    if (initialTab) {
      setInternalTab(initialTab);
    }
  }, [initialTab]);

  // --- Parts Management State ---
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEditPart, setSelectedEditPart] = useState(null);
  const [partSearch, setPartSearch] = useState("");
  const [newPart, setNewPart] = useState({
    part_id: "",
    part_name: "",
    price: "",
    stock_qty: "10",
  });
  const [loadingAction, setLoadingAction] = useState(false);
  const [alertNotice, setAlertNotice] = useState({ type: "", text: "" });

  // Auto-generate next SKU
  const suggestNextSKU = () => {
    const existingNums = parts
      .map((p) => {
        const match = p.part_id.match(/PART-(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter((n) => !isNaN(n));
    const maxNum = existingNums.length > 0 ? Math.max(...existingNums) : 0;
    return `PART-${String(maxNum + 1).padStart(3, "0")}`;
  };

  const handleOpenAddModal = () => {
    setNewPart({
      part_id: suggestNextSKU(),
      part_name: "",
      price: "",
      stock_qty: "10",
    });
    setShowAddModal(true);
  };

  const handleCreatePart = async (e) => {
    e.preventDefault();
    try {
      setLoadingAction(true);
      const res = await fetch(`${apiUrl}/api/parts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          part_id: newPart.part_id.trim().toUpperCase(),
          part_name: newPart.part_name.trim(),
          price: parseFloat(newPart.price) || 0,
          stock_qty: parseInt(newPart.stock_qty, 10) || 0,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "ไม่สามารถเพิ่มอะไหล่ได้");
      }

      setShowAddModal(false);
      setAlertNotice({ type: "success", text: `เพิ่มอะไหล่ ${newPart.part_id} สำเร็จเรียบร้อยแล้ว!` });
      if (onRefresh) onRefresh();
    } catch (err) {
      setAlertNotice({ type: "danger", text: err.message });
    } finally {
      setLoadingAction(false);
    }
  };

  const handleUpdatePart = async (e) => {
    e.preventDefault();
    if (!selectedEditPart) return;
    try {
      setLoadingAction(true);
      const res = await fetch(`${apiUrl}/api/parts/${selectedEditPart.part_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          part_name: selectedEditPart.part_name,
          price: parseFloat(selectedEditPart.price) || 0,
          stock_qty: parseInt(selectedEditPart.stock_qty, 10) || 0,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "ไม่สามารถอัปเดตข้อมูลอะไหล่ได้");
      }

      setShowEditModal(false);
      setSelectedEditPart(null);
      setAlertNotice({ type: "success", text: `แก้ไขอะไหล่ ${selectedEditPart.part_id} สำเร็จเรียบร้อยแล้ว!` });
      if (onRefresh) onRefresh();
    } catch (err) {
      setAlertNotice({ type: "danger", text: err.message });
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDeletePart = async (partId, partName) => {
    if (!window.confirm(`ยืนยันการลบอะไหล่ "${partName}" (${partId}) ออกจากระบบหรือไม่?`)) {
      return;
    }
    try {
      setLoadingAction(true);
      const res = await fetch(`${apiUrl}/api/parts/${partId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "ไม่สามารถลบอะไหล่ได้");
      }
      setAlertNotice({ type: "success", text: `ลบอะไหล่ ${partId} เรียบร้อยแล้ว` });
      if (onRefresh) onRefresh();
    } catch (err) {
      setAlertNotice({ type: "danger", text: err.message });
    } finally {
      setLoadingAction(false);
    }
  };

  const handleQuickRestock = async (partId, addQty) => {
    try {
      const res = await fetch(`${apiUrl}/api/parts/${partId}/restock`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: addQty }),
      });
      if (!res.ok) throw new Error("ไม่สามารถเติมสต็อกได้");
      setAlertNotice({ type: "success", text: `เติมสต็อก ${partId} เพิ่ม +${addQty} ชิ้นเรียบร้อย` });
      if (onRefresh) onRefresh();
    } catch (err) {
      setAlertNotice({ type: "danger", text: err.message });
    }
  };

  // --- Live Chat Desk State ---
  const [conversations, setConversations] = useState([
    { id: "CUST-001", name: "Alex Morgan", vehicle: "Toyota Camry 2021", phone: "+1-555-0101" },
    { id: "CUST-002", name: "Samantha Hayes", vehicle: "Honda Civic 2022", phone: "+1-555-0202" },
    { id: "CUST-003", name: "David Kim", vehicle: "Ford F-150 2020", phone: "+1-555-0303" },
    {
      id: "CUST-GUEST",
      name: contactSubmission?.name ? `${contactSubmission.name} (หน้าเว็บ)` : "ลูกค้าทั่วไป (หน้าเว็บ)",
      vehicle: contactSubmission?.topic || "ยังไม่ได้ระบุรุ่นรถ",
      phone: contactSubmission?.phone || "Online Visitor",
    },
  ]);
  const [activeConvId, setActiveConvId] = useState(initialConvId || "CUST-001");
  const [chatMessages, setChatMessages] = useState([]);
  const [adminReplyText, setAdminReplyText] = useState("");
  const chatBottomRef = useRef(null);

  useEffect(() => {
    if (initialConvId) {
      setActiveConvId(initialConvId);
    }
  }, [initialConvId]);

  useEffect(() => {
    if (contactSubmission) {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === "CUST-GUEST"
            ? {
                ...c,
                name: contactSubmission.name ? `${contactSubmission.name} (หน้าเว็บ)` : "ลูกค้าทั่วไป (หน้าเว็บ)",
                vehicle: contactSubmission.topic || "ยังไม่ได้ระบุรุ่นรถ",
                phone: contactSubmission.phone || "Online Visitor",
              }
            : c
        )
      );
    }
  }, [contactSubmission]);

  const fetchChatMessages = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/chat/messages`);
      if (res.ok) {
        const data = await res.json();
        setChatMessages(data.messages || []);
      }
    } catch (err) {
      console.warn("Chat fetch error:", err.message);
    }
  };

  useEffect(() => {
    fetchChatMessages();
    const interval = setInterval(fetchChatMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollTop = chatBottomRef.current.scrollHeight;
    }
  }, [chatMessages, activeConvId]);

  const activeCustomer = conversations.find((c) => c.id === activeConvId) || conversations[0];
  const activeConversationMessages = chatMessages.filter((m) => m.conversation_id === activeConvId);

  const markConversationAsRead = async (convId) => {
    if (!convId) return;
    // 1. Instantly update local state so badges vanish immediately!
    setChatMessages((prev) =>
      prev.map((m) => (m.conversation_id === convId ? { ...m, read: true } : m))
    );

    // 2. Call backend to persist read status
    try {
      await fetch(`${apiUrl}/api/chat/conversations/${convId}/read`, {
        method: "PUT",
      });
    } catch (err) {
      console.warn("Failed to mark conversation read:", err);
    }
  };

  const handleSelectConversation = (convId) => {
    setActiveConvId(convId);
    markConversationAsRead(convId);
  };

  useEffect(() => {
    if (activeConvId && adminTab === "chat") {
      markConversationAsRead(activeConvId);
    }
  }, [activeConvId, adminTab]);

  const handleSendAdminReply = async (textToSend) => {
    const text = (textToSend || adminReplyText).trim();
    if (!text) return;

    // Immediately mark active conversation as read
    markConversationAsRead(activeConvId);

    try {
      const res = await fetch(`${apiUrl}/api/chat/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation_id: activeConvId,
          customer_name: activeCustomer.name,
          sender: "admin",
          text: text,
        }),
      });

      if (res.ok) {
        setAdminReplyText("");
        await markConversationAsRead(activeConvId);
        fetchChatMessages();
      }
    } catch (err) {
      alert("ส่งข้อความไม่สำเร็จ: " + err.message);
    }
  };

  const quickReplies = [
    "สวัสดีครับ ยินดีให้บริการครับ มีอะไหล่ตรงรุ่นพร้อมเปลี่ยนครับ 🚗",
    "ประเมินราคาซ่อมและค่าแรงให้เรียบร้อยแล้วครับ สามารถเปิดใบสั่งซ่อมได้เลยครับ 📋",
    "อะไหล่ทุกชิ้นของทางศูนย์เป็นของแท้ 100% รับประกันงานซ่อม 1 ปีครับ ✨",
    "รถของท่านผ่านการตรวจเช็กและซ่อมบำรุงเสร็จสมบูรณ์ พร้อมรับรถได้เลยครับ 🏁",
  ];

  const filteredParts = parts.filter(
    (p) =>
      p.part_name.toLowerCase().includes(partSearch.toLowerCase()) ||
      p.part_id.toLowerCase().includes(partSearch.toLowerCase())
  );

  return (
    <div className="container-fluid px-0">
      {/* 1. Header แอดมิน */}
      {!hideBanner && (
        <div
          className="rounded-4 p-4 text-white mb-4 shadow-sm position-relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1e204c 0%, #2f3388 50%, #5b5ffd 100%)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 position-relative" style={{ zIndex: 2 }}>
            <div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge text-dark fw-bold px-2.5 py-1" style={{ background: "var(--theme-accent-gradient)" }}>
                  <i className="bi bi-shield-lock-fill me-1"></i> ADMIN PORTAL
                </span>
                <span className="badge bg-success bg-opacity-25 text-white border border-success border-opacity-50">
                  <i className="bi bi-circle-fill text-success me-1" style={{ fontSize: "0.5rem" }}></i> เจ้าหน้าที่กำลังออนไลน์
                </span>
              </div>
              <h2 className="fw-black text-white mb-1">ระบบบริหารจัดการหลังบ้าน &amp; ฝ่ายบริการลูกค้า</h2>
              <p className="text-white text-opacity-80 mb-0 small">
                เพิ่มอะไหล่สินค้าใหม่ จัดการสต็อกคลัง และตอบแชทลูกค้าแบบ Real-time
              </p>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-light text-dark fw-bold rounded-pill px-3.5 py-2 shadow-sm d-flex align-items-center gap-2"
                onClick={handleOpenAddModal}
              >
                <i className="bi bi-plus-circle-fill text-sp-blue fs-5"></i>
                <span>+ เพิ่มอะไหล่สินค้า</span>
              </button>
              <button
                className="btn btn-outline-light rounded-pill px-3 py-2 fw-semibold"
                onClick={() => onSwitchTab && onSwitchTab("dashboard")}
              >
                <i className="bi bi-arrow-left me-1"></i> กลับหน้าหลักศูนย์
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Notification */}
      {alertNotice.text && (
        <div className={`alert alert-${alertNotice.type} alert-dismissible fade show shadow-sm mb-4`} role="alert">
          <i className="bi bi-info-circle-fill me-2"></i>
          {alertNotice.text}
          <button type="button" className="btn-close" onClick={() => setAlertNotice({ type: "", text: "" })}></button>
        </div>
      )}

      {/* 2. Admin Navigation Tabs */}
      {!hideTabs && (
        <div className="card border-0 shadow-sm mb-4 bg-white" style={{ borderRadius: "14px" }}>
          <div className="card-body p-2">
            <ul className="nav nav-pills gap-2">
              {/* Tab: Dashboard (ภาพรวมแบบในภาพตัวอย่าง) */}
              <li className="nav-item">
                <button
                  className={`nav-link rounded-pill fw-bold py-2 px-3.5 d-flex align-items-center gap-2 ${
                    adminTab === "dashboard" ? "active text-white shadow-sm" : "text-dark"
                  }`}
                  style={{
                    background: adminTab === "dashboard" ? "#7367f0" : "transparent",
                    color: adminTab === "dashboard" ? "#ffffff" : "#5d596c",
                    boxShadow: adminTab === "dashboard" ? "0 2px 6px rgba(115, 103, 240, 0.4)" : "none",
                  }}
                  onClick={() => setAdminTab("dashboard")}
                >
                  <i className="bi bi-grid-fill"></i>
                  <span>ภาพรวมแดชบอร์ด (Overview)</span>
                </button>
              </li>

              {/* Tab: Parts Management */}
              <li className="nav-item">
                <button
                  className={`nav-link rounded-pill fw-bold py-2 px-3.5 d-flex align-items-center gap-2 ${
                    adminTab === "parts" ? "active text-white shadow-sm" : "text-dark"
                  }`}
                  style={{
                    background: adminTab === "parts" ? "#7367f0" : "transparent",
                    color: adminTab === "parts" ? "#ffffff" : "#5d596c",
                    boxShadow: adminTab === "parts" ? "0 2px 6px rgba(115, 103, 240, 0.4)" : "none",
                  }}
                  onClick={() => setAdminTab("parts")}
                >
                  <i className="bi bi-boxes"></i>
                  <span>จัดการ &amp; เพิ่มอะไหล่สินค้า ({parts.length})</span>
                </button>
              </li>

              {/* Tab: Live Chat Desk */}
              <li className="nav-item">
                <button
                  className={`nav-link rounded-pill fw-bold py-2 px-3.5 d-flex align-items-center gap-2 position-relative ${
                    adminTab === "chat" ? "active text-white shadow-sm" : "text-dark"
                  }`}
                  style={{
                    background: adminTab === "chat" ? "#7367f0" : "transparent",
                    color: adminTab === "chat" ? "#ffffff" : "#5d596c",
                    boxShadow: adminTab === "chat" ? "0 2px 6px rgba(115, 103, 240, 0.4)" : "none",
                  }}
                  onClick={() => setAdminTab("chat")}
                >
                  <i className="bi bi-chat-dots-fill"></i>
                  <span>ศูนย์ตอบแชทลูกค้า (Live Chat Desk)</span>
                  {chatMessages.filter((m) => m.sender === "customer" && !m.read).length > 0 && (
                    <span className="badge bg-danger rounded-pill ms-1">
                      {chatMessages.filter((m) => m.sender === "customer" && !m.read).length} ใหม่
                    </span>
                  )}
                </button>
              </li>

              {/* Tab: Jobs & Invoices */}
              <li className="nav-item">
                <button
                  className={`nav-link rounded-pill fw-bold py-2 px-3.5 d-flex align-items-center gap-2 ${
                    adminTab === "jobs" ? "active text-white shadow-sm" : "text-dark"
                  }`}
                  style={{
                    background: adminTab === "jobs" ? "#7367f0" : "transparent",
                    color: adminTab === "jobs" ? "#ffffff" : "#5d596c",
                    boxShadow: adminTab === "jobs" ? "0 2px 6px rgba(115, 103, 240, 0.4)" : "none",
                  }}
                  onClick={() => setAdminTab("jobs")}
                >
                  <i className="bi bi-receipt"></i>
                  <span>ตรวจสอบใบสั่งซ่อม &amp; ใบเสร็จ ({invoices.length})</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* 3. TAB CONTENT 0: VUEXY DASHBOARD OVERVIEW */}
      {adminTab === "dashboard" && (
        <AdminVuexyDashboard
          parts={parts}
          vehicles={vehicles}
          customers={customers}
          invoices={invoices}
          onNavigateTab={setAdminTab}
        />
      )}

      {/* 3. TAB CONTENT 1: PARTS MANAGEMENT */}
      {adminTab === "parts" && (
        <div className="card border-0 shadow-sm bg-white">
          <div className="card-header bg-white py-3 px-4 d-flex flex-wrap align-items-center justify-content-between gap-3 border-bottom">
            <div className="d-flex align-items-center gap-2">
              <h5 className="fw-black text-dark mb-0">
                {lang === "th" ? "คลังอะไหล่และอุปกรณ์ประจำศูนย์บริการ" : "Workshop Spare Parts Inventory"}
              </h5>
              <span className="badge bg-light text-dark border">
                {filteredParts.length} {lang === "th" ? "รายการ" : "Items"}
              </span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <div className="input-group input-group-sm" style={{ width: "260px" }}>
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder={t("search_parts", "ค้นหาชื่อ หรือ รหัส SKU...")}
                  value={partSearch}
                  onChange={(e) => setPartSearch(e.target.value)}
                />
              </div>

              <button className="btn btn-sp-primary btn-sm px-3 rounded-pill fw-bold" onClick={handleOpenAddModal}>
                <i className="bi bi-plus-lg me-1"></i> {t("add_part_btn", "+ เพิ่มอะไหล่ใหม่")}
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="ps-4">{lang === "th" ? "รูปภาพ & SKU" : "Image & SKU"}</th>
                  <th scope="col">{t("part_name", "ชื่อสินค้าและอะไหล่")}</th>
                  <th scope="col" className="text-end">{t("price", "ราคาต่อหน่วย")}</th>
                  <th scope="col" className="text-center">{t("stock_qty", "สต็อกคงเหลือ")}</th>
                  <th scope="col" className="text-center">{t("status", "สถานะ")}</th>
                  <th scope="col" className="text-center pe-4">{t("actions", "การจัดการ (Admin Actions)")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredParts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      ไม่พบรายการอะไหล่ตามคำค้นหา
                    </td>
                  </tr>
                ) : (
                  filteredParts.map((part) => {
                    const isLow = part.stock_qty <= 5 && part.stock_qty > 0;
                    const isOut = part.stock_qty === 0;

                    return (
                      <tr key={part.part_id}>
                        <td className="ps-4" style={{ width: "160px" }}>
                          <div className="d-flex align-items-center gap-2">
                            <ProductImage partId={part.part_id} partName={part.part_name} size="sm" />
                            <span className="badge bg-light text-dark border fw-bold">{part.part_id}</span>
                          </div>
                        </td>
                        <td>
                          <div className="fw-bold text-dark">{part.part_name}</div>
                          <small className="text-muted">มาตรฐาน OEM สเปกศูนย์บริการ</small>
                        </td>
                        <td className="text-end fw-black text-sp-blue fs-6">
                          ฿{part.price.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="text-center">
                          <span className={`fw-black ${isOut ? "text-danger" : isLow ? "text-warning" : "text-dark"}`}>
                            {part.stock_qty}
                          </span>
                          <span className="small text-muted ms-1">ชิ้น</span>
                        </td>
                        <td className="text-center">
                          {isOut ? (
                            <span className="badge bg-danger">สินค้าหมด</span>
                          ) : isLow ? (
                            <span className="badge bg-warning text-dark">สต็อกต่ำ</span>
                          ) : (
                            <span className="badge bg-success">พร้อมจ่าย</span>
                          )}
                        </td>
                        <td className="text-center pe-4">
                          <div className="d-inline-flex align-items-center gap-1.5">
                            {/* Quick Restock */}
                            <button
                              type="button"
                              className="btn btn-outline-success btn-sm py-1 px-2 rounded"
                              title="เติมสต็อก +5"
                              onClick={() => handleQuickRestock(part.part_id, 5)}
                            >
                              +5
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-success btn-sm py-1 px-2 rounded"
                              title="เติมสต็อก +10"
                              onClick={() => handleQuickRestock(part.part_id, 10)}
                            >
                              +10
                            </button>

                            {/* Edit */}
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm py-1 px-2 rounded"
                              title="แก้ไขข้อมูลอะไหล่"
                              onClick={() => {
                                setSelectedEditPart({ ...part });
                                setShowEditModal(true);
                              }}
                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm py-1 px-2 rounded"
                              title="ลบอะไหล่"
                              onClick={() => handleDeletePart(part.part_id, part.part_name)}
                            >
                              <i className="bi bi-trash3"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. TAB CONTENT 2: LIVE CHAT DESK */}
      {adminTab === "chat" && (
        <div className="card border-0 shadow-sm bg-white overflow-hidden">
          <div className="row g-0" style={{ minHeight: "560px" }}>
            {/* ฝั่งซ้าย: รายชื่อการสนทนาของลูกค้า (Conversation Sidebar) */}
            <div className="col-12 col-md-4 border-end bg-light">
              <div className="p-3 border-bottom bg-white d-flex align-items-center justify-content-between">
                <h6 className="fw-black mb-0 d-flex align-items-center gap-2 text-dark">
                  <i className="bi bi-people-fill text-sp-blue"></i> {t("customer_chats_list", "รายการแชทลูกค้า")}
                </h6>
                <span className="badge bg-sp-blue rounded-pill">
                  {conversations.length} {t("conversations_count", "การสนทนา")}
                </span>
              </div>

              <div className="list-group list-group-flush">
                {conversations.map((conv) => {
                  const convMsgs = chatMessages.filter((m) => m.conversation_id === conv.id);
                  const lastMsg = convMsgs[convMsgs.length - 1];
                  const unreadCount = convMsgs.filter((m) => m.sender === "customer" && !m.read).length;
                  const isActive = conv.id === activeConvId;

                  return (
                    <button
                      key={conv.id}
                      type="button"
                      className={`list-group-item list-group-item-action p-3 text-start border-bottom ${
                        isActive ? "bg-white border-start border-4 border-primary shadow-sm" : ""
                      }`}
                      onClick={() => handleSelectConversation(conv.id)}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <span className="fw-bold text-dark">{conv.name}</span>
                        {lastMsg && <small className="text-muted">{lastMsg.timestamp}</small>}
                      </div>
                      <div className="small text-muted mb-1">
                        <i className="bi bi-car-front me-1"></i> {conv.vehicle}
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-truncate text-secondary" style={{ maxWidth: "200px" }}>
                          {lastMsg ? lastMsg.text : t("no_messages", "ยังไม่มีข้อความ")}
                        </small>
                        {unreadCount > 0 && <span className="badge bg-danger rounded-pill">{unreadCount}</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ฝั่งขวา: หน้าต่างส่งข้อความตอบแชท (Chat Room) */}
            <div className="col-12 col-md-8 d-flex flex-column bg-white">
              {/* Header ห้องแชท */}
              <div className="p-3 border-bottom bg-white d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{ width: "42px", height: "42px", background: "var(--theme-accent-gradient)" }}
                  >
                    <i className="bi bi-person-fill fs-5 text-dark"></i>
                  </div>
                  <div>
                    <h6 className="fw-black mb-0 text-dark">{activeCustomer.name}</h6>
                    <small className="text-muted">
                      {activeCustomer.vehicle} • โทร: {activeCustomer.phone}
                    </small>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-success bg-opacity-15 text-success border border-success border-opacity-25 px-2 py-1">
                    <i className="bi bi-circle-fill small me-1"></i> ลูกค้าออนไลน์
                  </span>
                </div>
              </div>

              {/* ข้อความสนทนา */}
              <div
                ref={chatBottomRef}
                className="flex-grow-1 p-3 p-md-4 overflow-auto"
                style={{ maxHeight: "380px", minHeight: "340px", backgroundColor: "#f8faff" }}
              >
                {activeConversationMessages.length === 0 ? (
                  <div className="text-center py-5 text-muted">
                    <i className="bi bi-chat-heart fs-1 text-muted opacity-50 mb-2"></i>
                    <div>ยังไม่มีข้อความสนทนากับลูกค้ารายนี้</div>
                    <small>พิมพ์ข้อความหรือเลือก Quick Reply ด้านล่างเพื่อเริ่มการสนทนา</small>
                  </div>
                ) : (
                  activeConversationMessages.map((msg, idx) => {
                    const isAdmin = msg.sender === "admin";
                    return (
                      <div
                        key={idx}
                        className={`d-flex mb-3 ${isAdmin ? "justify-content-end" : "justify-content-start"}`}
                      >
                        <div
                          className="p-3 rounded-4 shadow-sm position-relative"
                          style={{
                            maxWidth: "75%",
                            backgroundColor: isAdmin ? "#5b5ffd" : "#ffffff",
                            color: isAdmin ? "#ffffff" : "#1e293b",
                            border: isAdmin ? "none" : "1px solid #e2e8f0",
                          }}
                        >
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <span className="fw-bold small" style={{ opacity: 0.9 }}>
                              {isAdmin ? "👨‍🔧 แอดมิน CarGarage" : `👤 ${msg.customer_name || activeCustomer.name}`}
                            </span>
                            <span className="small opacity-75" style={{ fontSize: "0.7rem" }}>
                              {msg.timestamp}
                            </span>
                          </div>
                          <div style={{ lineHeight: "1.5", fontSize: "0.92rem" }}>{msg.text}</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Quick Reply Pills */}
              <div className="px-3 pt-2 pb-1 border-top bg-light d-flex flex-wrap gap-1.5 align-items-center">
                <span className="small text-muted fw-bold me-1">{t("quick_replies", "ตอบกลับด่วน:")}</span>
                {quickReplies.map((qr, qIdx) => (
                  <button
                    key={qIdx}
                    type="button"
                    className="btn btn-outline-secondary btn-sm rounded-pill py-0.5 px-2.5"
                    style={{ fontSize: "0.78rem" }}
                    onClick={() => handleSendAdminReply(qr)}
                  >
                    {qr}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 border-top bg-white">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendAdminReply();
                  }}
                  className="d-flex gap-2"
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("type_reply_placeholder", "พิมพ์ข้อความตอบกลับลูกค้า...")}
                    value={adminReplyText}
                    onChange={(e) => setAdminReplyText(e.target.value)}
                  />
                  <button type="submit" className="btn btn-sp-primary px-4 fw-bold rounded-pill d-flex align-items-center gap-1">
                    <i className="bi bi-send-fill"></i>
                    <span>{t("send_reply_btn", "ส่ง")}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB CONTENT 3: JOBS & INVOICES */}
      {adminTab === "jobs" && (
        <div className="card border-0 shadow-sm bg-white p-4">
          <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
            <h5 className="fw-black mb-0">รายการใบแจ้งหนี้และการชำระเงินของศูนย์บริการ</h5>
            <span className="badge bg-sp-blue">{invoices.length} รายการ</span>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>รหัสใบเสร็จ</th>
                  <th>ทะเบียนรถ</th>
                  <th>ชื่องานบริการ</th>
                  <th className="text-end">ยอดรวมสุทธิ</th>
                  <th className="text-center">สถานะชำระเงิน</th>
                  <th className="text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.invoice_id}>
                    <td className="fw-bold">{inv.invoice_id}</td>
                    <td>{inv.license_plate}</td>
                    <td>{inv.service_type || "งานซ่อมบำรุง"}</td>
                    <td className="text-end fw-bold text-sp-blue">
                      ฿{inv.total_amount?.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="text-center">
                      <span className={`badge ${inv.payment_status === "PAID" ? "bg-success" : "bg-warning text-dark"}`}>
                        {inv.payment_status === "PAID" ? "ชำระเงินแล้ว" : "รอชำระเงิน"}
                      </span>
                    </td>
                    <td className="text-center">
                      {inv.payment_status !== "PAID" ? (
                        <button
                          className="btn btn-sm btn-outline-success rounded-pill"
                          onClick={async () => {
                            await fetch(`${apiUrl}/api/invoices/${inv.invoice_id}/pay`, { method: "PUT" });
                            if (onRefresh) onRefresh();
                          }}
                        >
                          บันทึกชำระเงิน
                        </button>
                      ) : (
                        <span className="text-muted small">เรียบร้อย</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: เพิ่มอะไหล่ใหม่ (Add Part Modal) */}
      {showAddModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header bg-sp-blue text-white rounded-top-4">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-plus-circle me-2"></i> เพิ่มอะไหล่สินค้าใหม่ (Add Part SKU)
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowAddModal(false)}></button>
              </div>
              <form onSubmit={handleCreatePart}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">รหัส SKU อะไหล่</label>
                    <input
                      type="text"
                      className="form-control fw-bold"
                      required
                      value={newPart.part_id}
                      onChange={(e) => setNewPart({ ...newPart, part_id: e.target.value })}
                    />
                    <small className="text-muted">แนะนำเป็นรูปแบบ PART-XXX</small>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">ชื่ออะไหล่และอุปกรณ์</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="เช่น ไส้กรองน้ำมันเครื่อง TOYOTA Genuine"
                      value={newPart.part_name}
                      onChange={(e) => setNewPart({ ...newPart, part_name: e.target.value })}
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold text-muted">ราคาเบิก (บาท)</label>
                      <input
                        type="number"
                        className="form-control"
                        required
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={newPart.price}
                        onChange={(e) => setNewPart({ ...newPart, price: e.target.value })}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold text-muted">จำนวนสต็อกเริ่มต้น</label>
                      <input
                        type="number"
                        className="form-control"
                        required
                        min="0"
                        value={newPart.stock_qty}
                        onChange={(e) => setNewPart({ ...newPart, stock_qty: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer bg-light rounded-bottom-4">
                  <button type="button" className="btn btn-secondary rounded-pill px-3" onClick={() => setShowAddModal(false)}>
                    ยกเลิก
                  </button>
                  <button type="submit" className="btn btn-sp-primary rounded-pill px-4" disabled={loadingAction}>
                    {loadingAction ? "กำลังบันทึก..." : "ยืนยันเพิ่มอะไหล่"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: แก้ไขข้อมูลอะไหล่ (Edit Part Modal) */}
      {showEditModal && selectedEditPart && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header bg-dark text-white rounded-top-4">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-pencil-square me-2"></i> แก้ไขข้อมูลอะไหล่ ({selectedEditPart.part_id})
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowEditModal(false)}></button>
              </div>
              <form onSubmit={handleUpdatePart}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-muted">ชื่ออะไหล่</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={selectedEditPart.part_name}
                      onChange={(e) => setSelectedEditPart({ ...selectedEditPart, part_name: e.target.value })}
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-semibold text-muted">ราคาเบิก (บาท)</label>
                      <input
                        type="number"
                        className="form-control"
                        required
                        min="0"
                        step="0.01"
                        value={selectedEditPart.price}
                        onChange={(e) => setSelectedEditPart({ ...selectedEditPart, price: e.target.value })}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-semibold text-muted">จำนวนสต็อกคงเหลือ</label>
                      <input
                        type="number"
                        className="form-control"
                        required
                        min="0"
                        value={selectedEditPart.stock_qty}
                        onChange={(e) => setSelectedEditPart({ ...selectedEditPart, stock_qty: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer bg-light rounded-bottom-4">
                  <button type="button" className="btn btn-secondary rounded-pill px-3" onClick={() => setShowEditModal(false)}>
                    ยกเลิก
                  </button>
                  <button type="submit" className="btn btn-sp-primary rounded-pill px-4" disabled={loadingAction}>
                    {loadingAction ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
