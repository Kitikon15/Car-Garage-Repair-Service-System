"use client";

export default function Footer({ setActiveTab }) {
  return (
    <footer className="sp-footer pt-5 pb-4 mt-5">
      <div className="container-fluid px-4 px-lg-5">
        <div className="row g-4 pb-4 border-bottom border-secondary border-opacity-25">
          {/* คอลัมน์ที่ 1: เกี่ยวกับ ServiceGarage */}
          <div className="col-12 col-md-6 col-lg-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div
                className="bg-white rounded-2 p-1 d-flex align-items-center justify-content-center"
                style={{ width: "36px", height: "36px" }}
              >
                <i className="bi bi-gear-wide-connected fs-4 text-sp-blue"></i>
              </div>
              <span className="fs-4 fw-black text-white">
                Service<span className="text-warning">Garage</span>
              </span>
            </div>
            <p className="text-light opacity-75 small pe-lg-4" style={{ lineHeight: "1.8", maxWidth: "540px" }}>
              ศูนย์รวมสินค้าและอะไหล่สำหรับรถยนต์ครบวงจร ทั้งกลุ่มอะไหล่แท้จากศูนย์ผู้ผลิตและอะไหล่ทดแทนมาตรฐาน OEM ชั้นนำระดับโลก พร้อมระบบจัดการอู่ซ่อมรถ การประเมินราคา และออกใบสั่งซ่อมตามหลักการวิเคราะห์และออกแบบเชิงวัตถุ (OOAD)
            </p>
            <div className="d-flex flex-wrap gap-2 mt-3">
              <span className="badge bg-primary bg-opacity-25 text-white border border-primary border-opacity-50 py-2 px-3">
                <i className="bi bi-shield-check text-warning me-1"></i> อะไหล่แท้ 100%
              </span>
              <span className="badge bg-success bg-opacity-25 text-white border border-success border-opacity-50 py-2 px-3">
                <i className="bi bi-truck text-success me-1"></i> บริการจัดส่งด่วนทั่วไทย
              </span>
              <span className="badge bg-warning bg-opacity-25 text-white border border-warning border-opacity-50 py-2 px-3">
                <i className="bi bi-code-slash text-warning me-1"></i> Python FastAPI &amp; Next.js
              </span>
            </div>
          </div>

          {/* คอลัมน์ที่ 2: หมวดหมู่อะไหล่ยอดนิยม */}
          <div className="col-6 col-md-3 col-lg-3">
            <h6 className="sp-footer-title">หมวดหมู่อะไหล่</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 mb-0">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); if (setActiveTab) setActiveTab("order"); }}>
                  น้ำมันเครื่อง &amp; ของเหลว
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); if (setActiveTab) setActiveTab("order"); }}>
                  ระบบเบรก &amp; จานเบรก
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); if (setActiveTab) setActiveTab("order"); }}>
                  ไส้กรองน้ำมัน &amp; กรองแอร์
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); if (setActiveTab) setActiveTab("order"); }}>
                  แบตเตอรี่ &amp; ระบบไฟ
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); if (setActiveTab) setActiveTab("order"); }}>
                  ช่วงล่าง &amp; โช้คอัพ
                </a>
              </li>
            </ul>
          </div>

          {/* คอลัมน์ที่ 3: ระบบบริการ & OOP */}
          <div className="col-6 col-md-3 col-lg-3">
            <h6 className="sp-footer-title">บริการอู่ซ่อมรถ</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 mb-0">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); if (setActiveTab) setActiveTab("jobs"); }}>
                  ฟังชั่นประเมินราคาซ่อม
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); if (setActiveTab) setActiveTab("jobs"); }}>
                  เปิดใบสั่งซ่อมบำรุง
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); if (setActiveTab) setActiveTab("parts"); }}>
                  ตรวจสอบสต็อกคลังอะไหล่
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); if (setActiveTab) setActiveTab("jobs"); }}>
                  ตรวจสอบใบแจ้งหนี้ / ใบเสร็จ
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); if (setActiveTab) setActiveTab("contact"); }}>
                  ติดต่อฝ่ายขายและบริการ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* แถบลิขสิทธิ์และข้อมูลโครงงาน OOP */}
        <div className="d-flex flex-wrap align-items-center justify-content-between pt-3 gap-2 small text-light opacity-75">
          <div>
            © 2026 <strong>ServiceGarage</strong> ศูนย์รวมอะไหล่และบริการอู่ซ่อมรถครบวงจร • All Rights Reserved.
          </div>
          <div>
            โครงงานวิชา Object-Oriented Analysis &amp; Design (OOAD) • สมาชิกในทีม: 2 คน • ระยะเวลาดำเนินการ: 2 สัปดาห์
          </div>
        </div>
      </div>
    </footer>
  );
}
