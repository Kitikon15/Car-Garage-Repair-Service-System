"use client";

import { useState } from "react";

export default function ContactSales({ apiUrl = "http://localhost:8000", onGoToAdminChat }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "สมชาย วงศ์สว่าง",
    phone: "081-234-5678",
    topic: "ขอใบเสนอราคาอะไหล่ราคาส่ง",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const topicText = formData.topic || "ติดต่อฝ่ายขาย";
      const detailText = formData.message ? `รายละเอียด: ${formData.message.trim()} ` : "";
      const phoneText = formData.phone ? `โทร: ${formData.phone.trim()}` : "";
      const chatText = `[${topicText}] ${detailText}${phoneText}`.trim();
      const customerName = formData.name.trim() || "ลูกค้าทั่วไป (หน้าเว็บ)";

      // 1. ส่งข้อความเข้าสู่ศูนย์ Live Chat Desk ผ่าน REST API
      await fetch(`${apiUrl}/api/chat/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversation_id: "CUST-GUEST",
          customer_name: customerName,
          sender: "customer",
          text: chatText || "สอบถามอะไหล่แท้ตรงรุ่น 🚗",
        }),
      });

      // 2. บันทึก Session การล็อกอินของแอดมินสำหรับเดโม
      sessionStorage.setItem("garage_admin_token", "admin-session-demo");
      sessionStorage.setItem("garage_admin_name", "ผู้ดูแลระบบอู่ (Garage Admin)");
      sessionStorage.setItem("garage_admin_tab", "chat");
      sessionStorage.setItem("garage_admin_conv", "CUST-GUEST");

      // 3. เด้งไปยังหน้าศูนย์ตอบแชทลูกค้า (Admin Live Chat Desk) ทันที
      if (onGoToAdminChat) {
        onGoToAdminChat("CUST-GUEST", formData);
      } else {
        window.location.href = "/admin?tab=chat&conv=CUST-GUEST";
      }
    } catch (err) {
      console.warn("Error sending contact message:", err);
      // Fallback: แม้เน็ตเวิร์กช้าก็ให้เด้งไปหน้าแชทตามคำสั่ง
      sessionStorage.setItem("garage_admin_token", "admin-session-demo");
      if (onGoToAdminChat) {
        onGoToAdminChat("CUST-GUEST", formData);
      } else {
        window.location.href = "/admin?tab=chat&conv=CUST-GUEST";
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid px-0">
      {/* ส่วนหัวหน้าติดต่อฝ่ายขาย */}
      <div className="card border-0 shadow-sm mb-4 bg-white">
        <div className="card-body p-4">
          <h4 className="fw-bold mb-1 d-flex align-items-center gap-2">
            <i className="bi bi-headset text-primary"></i>
            <span>ติดต่อฝ่ายขายและบริการลูกค้า (Contact Sales &amp; Support)</span>
          </h4>
          <p className="text-muted small mb-0">
            ปรึกษาข้อมูลอะไหล่รถยนต์ สอบถามราคาส่ง หรือนัดหมายนำรถเข้ารับบริการกับทีมช่างผู้เชี่ยวชาญ
          </p>
        </div>
      </div>

      <div className="row g-4">
        {/* คอลัมน์ซ้าย: ข้อมูลช่องทางการติดต่อ */}
        <div className="col-12 col-lg-5">
          <div className="card border-0 shadow-sm bg-white p-4 h-100">
            <h5 className="fw-bold mb-4 text-dark border-bottom pb-2">ช่องทางการติดต่อด่วน</h5>

            <div className="d-flex align-items-start gap-3 mb-4">
              <div className="stat-icon bg-sp-blue-light text-sp-blue fs-4 flex-shrink-0">
                <i className="bi bi-telephone-fill"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-1">สายด่วนศูนย์บริการ &amp; ฝ่ายช่าง</h6>
                <p className="text-sp-blue fw-semibold mb-0 fs-5">02-888-7999</p>
                <small className="text-muted">บริการให้คำปรึกษางานซ่อม นัดหมาย และเช็กเบอร์อะไหล่ตรงรุ่น</small>
              </div>
            </div>

            <div className="d-flex align-items-start gap-3 mb-4">
              <div className="stat-icon bg-success-subtle text-success fs-4 flex-shrink-0">
                <i className="bi bi-chat-dots-fill"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-1">LINE Official Account</h6>
                <p className="text-success fw-semibold mb-0">@servicegarage</p>
                <small className="text-muted">ตอบคำถาม ตรวจสอบสต็อก และรับใบเสนอราคาส่ง</small>
              </div>
            </div>

          </div>
        </div>

        {/* คอลัมน์ขวา: ฟอร์มติดต่อขอใบเสนอราคา */}
        <div className="col-12 col-lg-7">
          <div className="card border-0 shadow-sm bg-white p-4 h-100">
            <h5 className="fw-bold mb-3 text-dark border-bottom pb-2">ส่งข้อความถึงฝ่ายขาย</h5>

              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">ชื่อ-นามสกุล ผู้ติดต่อ *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="เช่น สมชาย วงศ์สว่าง"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">เบอร์โทรศัพท์ติดต่อ *</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="เช่น 081-234-5678"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">เรื่องที่ต้องการติดต่อ</label>
                  <select
                    className="form-select"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  >
                    <option value="ขอใบเสนอราคาอะไหล่ราคาส่ง">ขอใบเสนอราคาอะไหล่ราคาส่ง (สำหรับอู่/ร้านค้า)</option>
                    <option value="สอบถามการนำรถเข้าเช็กระยะ">สอบถามการนำรถเข้าเช็กระยะ / ซ่อมใหญ่</option>
                    <option value="ปรึกษาปัญหาทางเทคนิค">ปรึกษาปัญหาเครื่องยนต์และอาการผิดปกติ</option>
                    <option value="อื่นๆ">เรื่องอื่นๆ</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold">รายละเอียดที่ต้องการแจ้งเพิ่มเติม</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="ระบุรุ่นรถ, ปีที่ผลิต, หรือรายการอะไหล่ที่ต้องการ..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2 fw-semibold d-flex align-items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>กำลังส่งและเปิดศูนย์ตอบแชท...</span>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send-fill"></i>
                      <span>ส่งข้อมูลถึงฝ่ายขาย</span>
                    </>
                  )}
                </button>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
}
