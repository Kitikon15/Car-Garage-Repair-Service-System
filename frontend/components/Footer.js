"use client";

export default function Footer({ setActiveTab, onSelectCategory }) {
  const handleCategoryClick = (catId) => (e) => {
    e.preventDefault();
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else if (setActiveTab) {
      setActiveTab("order");
    }
  };

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
                Car<span className="text-warning">Garage</span> <span className="badge bg-danger ms-1 small" style={{ fontSize: "0.68rem" }}>PRO</span>
              </span>
            </div>
            <p className="text-white small pe-lg-4" style={{ lineHeight: "1.8", maxWidth: "540px", opacity: 0.95 }}>
              ศูนย์รวมสินค้าและอะไหล่สำหรับรถยนต์ครบวงจร ทั้งกลุ่มอะไหล่แท้จากศูนย์ผู้ผลิตและอะไหล่ทดแทนมาตรฐาน OEM ชั้นนำระดับโลก พร้อมระบบประเมินราคาซ่อมและออกใบสั่งซ่อมบำรุงมาตรฐานสากล
            </p>
            <div className="d-flex flex-wrap gap-2 mt-3">
              <span className="badge bg-primary bg-opacity-25 text-white border border-primary border-opacity-50 py-2 px-3">
                <i className="bi bi-shield-check text-warning me-1"></i> อะไหล่แท้ 100%
              </span>
              <span className="badge bg-success bg-opacity-25 text-white border border-success border-opacity-50 py-2 px-3">
                <i className="bi bi-truck text-success me-1"></i> บริการจัดส่งด่วนทั่วไทย
              </span>
              <span className="badge bg-warning bg-opacity-25 text-white border border-warning border-opacity-50 py-2 px-3">
                <i className="bi bi-wrench-adjustable-circle text-warning me-1"></i> ช่างผู้เชี่ยวชาญดูแล
              </span>
            </div>
          </div>

          {/* คอลัมน์ที่ 2: หมวดหมู่อะไหล่ยอดนิยม */}
          <div className="col-6 col-md-3 col-lg-3">
            <h6 className="sp-footer-title">หมวดหมู่อะไหล่</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 mb-0">
              <li>
                <a href="#" onClick={handleCategoryClick("fluids")}>
                  <i className="bi bi-chevron-right text-warning me-2 small" style={{ fontSize: "0.72rem" }}></i>
                  <span>น้ำมันเครื่อง &amp; ของเหลว</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={handleCategoryClick("brake")}>
                  <i className="bi bi-chevron-right text-warning me-2 small" style={{ fontSize: "0.72rem" }}></i>
                  <span>ระบบเบรก &amp; จานเบรก</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={handleCategoryClick("filters")}>
                  <i className="bi bi-chevron-right text-warning me-2 small" style={{ fontSize: "0.72rem" }}></i>
                  <span>ไส้กรองน้ำมัน &amp; กรองแอร์</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={handleCategoryClick("electrical")}>
                  <i className="bi bi-chevron-right text-warning me-2 small" style={{ fontSize: "0.72rem" }}></i>
                  <span>แบตเตอรี่ &amp; ระบบไฟ</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={handleCategoryClick("suspension")}>
                  <i className="bi bi-chevron-right text-warning me-2 small" style={{ fontSize: "0.72rem" }}></i>
                  <span>ช่วงล่าง &amp; โช้คอัพ</span>
                </a>
              </li>
            </ul>
          </div>

          {/* คอลัมน์ที่ 3: ระบบบริการ */}
          <div className="col-6 col-md-3 col-lg-3">
            <h6 className="sp-footer-title">บริการอู่ซ่อมรถ</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 mb-0">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); if (setActiveTab) setActiveTab("jobs"); }}>
                  <i className="bi bi-chevron-right text-warning me-2 small" style={{ fontSize: "0.72rem" }}></i>
                  <span>ฟังก์ชันประเมินราคาซ่อม</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); if (setActiveTab) setActiveTab("jobs"); }}>
                  <i className="bi bi-chevron-right text-warning me-2 small" style={{ fontSize: "0.72rem" }}></i>
                  <span>เปิดใบสั่งซ่อมบำรุง</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); if (setActiveTab) setActiveTab("parts"); }}>
                  <i className="bi bi-chevron-right text-warning me-2 small" style={{ fontSize: "0.72rem" }}></i>
                  <span>ตรวจสอบสต็อกคลังอะไหล่</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); if (setActiveTab) setActiveTab("jobs"); }}>
                  <i className="bi bi-chevron-right text-warning me-2 small" style={{ fontSize: "0.72rem" }}></i>
                  <span>ตรวจสอบใบแจ้งหนี้ / ใบเสร็จ</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); if (setActiveTab) setActiveTab("contact"); }}>
                  <i className="bi bi-chevron-right text-warning me-2 small" style={{ fontSize: "0.72rem" }}></i>
                  <span>ติดต่อฝ่ายช่างและศูนย์บริการ</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* แถบลิขสิทธิ์ */}
        <div className="d-flex flex-wrap align-items-center justify-content-center pt-3 gap-2 small text-white border-top border-white border-opacity-25 mt-3" style={{ opacity: 0.9 }}>
          <div>
            © 2026 <strong>CarGarage</strong> ระบบบริหารจัดการอู่ซ่อมรถและบริการอะไหล่ • All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
