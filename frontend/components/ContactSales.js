"use client";

import { useState } from "react";

export default function ContactSales() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    topic: "อะไหล่ราคาส่ง",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
                <h6 className="fw-bold mb-1">สายด่วนฝ่ายขาย &amp; สอบถามอะไหล่</h6>
                <p className="text-sp-blue fw-semibold mb-0 fs-5">02-007-2992</p>
                <small className="text-muted">บริการให้คำปรึกษาและเช็กเบอร์อะไหล่ตรงรุ่น</small>
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

            <div className="d-flex align-items-start gap-3 mb-4">
              <div className="stat-icon bg-info-subtle text-info fs-4 flex-shrink-0">
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-1">สำนักงานใหญ่และคลังสินค้าหลัก</h6>
                <p className="text-muted small mb-0">
                  บริษัท ServiceGarage จำกัด เลขที่ 98 ถนนสุวินทวงศ์ แขวงมีนบุรี เขตมีนบุรี กรุงเทพมหานคร 10510
                </p>
              </div>
            </div>

            <div className="d-flex align-items-start gap-3">
              <div className="stat-icon bg-warning-subtle text-warning fs-4 flex-shrink-0">
                <i className="bi bi-clock-fill"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-1">เวลาทำการศูนย์จำหน่าย</h6>
                <p className="text-muted small mb-0">
                  วันจันทร์ - อาทิตย์: 09:00 - 17:00 น.
                  <br />
                  <span className="text-success fw-semibold">เปิดบริการทุกวัน มีทีมงานสแตนด์บายตอบแชต</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* คอลัมน์ขวา: ฟอร์มติดต่อขอใบเสนอราคา */}
        <div className="col-12 col-lg-7">
          <div className="card border-0 shadow-sm bg-white p-4 h-100">
            <h5 className="fw-bold mb-3 text-dark border-bottom pb-2">ส่งข้อความถึงฝ่ายขาย</h5>

            {submitted ? (
              <div className="p-5 text-center my-auto">
                <i className="bi bi-check-circle-fill text-success fs-1 mb-3 d-block"></i>
                <h4 className="fw-bold">ได้รับข้อมูลของคุณเรียบร้อยแล้ว!</h4>
                <p className="text-muted small">
                  เจ้าหน้าที่ฝ่ายขายจะติดต่อกลับทางเบอร์ <strong>{formData.phone}</strong> ภายใน 1 ชั่วโมงทำการ
                </p>
                <button
                  className="btn btn-outline-primary btn-sm mt-3"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", phone: "", topic: "อะไหล่ราคาส่ง", message: "" });
                  }}
                >
                  ส่งข้อความอื่นเพิ่มเติม
                </button>
              </div>
            ) : (
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

                <button type="submit" className="btn btn-primary px-4 py-2 fw-semibold">
                  <i className="bi bi-send-fill me-2"></i>
                  ส่งข้อมูลถึงฝ่ายขาย
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
