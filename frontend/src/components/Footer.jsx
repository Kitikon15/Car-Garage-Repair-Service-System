"use client";

import { useLanguage } from "../context/LanguageContext";

export default function Footer({ setActiveTab, setJobsSubTab, onSelectCategory, onGoToAdmin }) {
  const { lang } = useLanguage ? useLanguage() : { lang: "th" };
  const isTh = lang !== "en";

  // ฟังก์ชันนำทางไปยังแท็บและโหมดย่อย พร้อมเลื่อนหน้าจอกลับขึ้นด้านบนแบบ Smooth
  const handleNavigate = (tab, subTab = null) => (e) => {
    e.preventDefault();
    if (setActiveTab) {
      setActiveTab(tab);
    }
    if (setJobsSubTab && subTab) {
      setJobsSubTab(subTab);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ฟังก์ชันคัดกรองหมวดหมู่อะไหล่จาก Footer
  const handleCategoryClick = (catId) => (e) => {
    e.preventDefault();
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else if (setActiveTab) {
      setActiveTab("order");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
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
                Car<span className="text-warning">Garage</span> <span className="badge ms-1 small fw-bold text-dark" style={{ fontSize: "0.68rem", background: "var(--theme-accent-gradient)" }}>PRO</span>
              </span>
            </div>
            <p className="text-white small pe-lg-4" style={{ lineHeight: "1.8", maxWidth: "540px", opacity: 0.95 }}>
              {isTh
                ? "ศูนย์รวมสินค้าและอะไหล่สำหรับรถยนต์ครบวงจร ทั้งกลุ่มอะไหล่แท้จากศูนย์ผู้ผลิตและอะไหล่ทดแทนมาตรฐาน OEM ชั้นนำระดับโลก พร้อมระบบประเมินราคาซ่อมและออกใบสั่งซ่อมบำรุงมาตรฐานสากล"
                : "Comprehensive one-stop automotive service and OEM auto parts dispensary with real-time repair cost estimator, service job creation, and polymorphic billing management."}
            </p>
            <div className="d-flex flex-wrap gap-2 mt-3">
              <span className="badge bg-primary bg-opacity-25 text-white border border-primary border-opacity-50 py-2 px-3">
                <i className="bi bi-shield-check text-warning me-1"></i> {isTh ? "อะไหล่แท้ 100%" : "100% Genuine Parts"}
              </span>
              <span className="badge bg-success bg-opacity-25 text-white border border-success border-opacity-50 py-2 px-3">
                <i className="bi bi-truck text-success me-1"></i> {isTh ? "บริการจัดส่งด่วนทั่วไทย" : "Fast Nationwide Delivery"}
              </span>
              <span className="badge bg-warning bg-opacity-25 text-white border border-warning border-opacity-50 py-2 px-3">
                <i className="bi bi-wrench-adjustable-circle text-warning me-1"></i> {isTh ? "ช่างผู้เชี่ยวชาญดูแล" : "Certified Technicians"}
              </span>
            </div>
          </div>

          {/* คอลัมน์ที่ 2: หมวดหมู่อะไหล่ยอดนิยม */}
          <div className="col-6 col-md-3 col-lg-3">
            <h6 className="sp-footer-title">{isTh ? "หมวดหมู่อะไหล่" : "Parts Categories"}</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 mb-0">
              <li>
                <a href="#" onClick={handleCategoryClick("fluids")} className="text-decoration-none text-white-50 hover-white">
                  <i className="bi bi-chevron-right text-warning me-2 small" style={{ fontSize: "0.72rem" }}></i>
                  <span>{isTh ? "น้ำมันเครื่อง & ของเหลว" : "Fluids & Engine Oils"}</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={handleCategoryClick("brake")} className="text-decoration-none text-white-50 hover-white">
                  <i className="bi bi-chevron-right text-warning me-2 small" style={{ fontSize: "0.72rem" }}></i>
                  <span>{isTh ? "ระบบเบรก & จานเบรก" : "Brakes & Rotors"}</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={handleCategoryClick("filters")} className="text-decoration-none text-white-50 hover-white">
                  <i className="bi bi-chevron-right text-warning me-2 small" style={{ fontSize: "0.72rem" }}></i>
                  <span>{isTh ? "ไส้กรองน้ำมัน & กรองแอร์" : "Oil & Air Filters"}</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={handleCategoryClick("electrical")} className="text-decoration-none text-white-50 hover-white">
                  <i className="bi bi-chevron-right text-warning me-2 small" style={{ fontSize: "0.72rem" }}></i>
                  <span>{isTh ? "แบตเตอรี่ & ระบบไฟ" : "Batteries & Electrical"}</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={handleCategoryClick("suspension")} className="text-decoration-none text-white-50 hover-white">
                  <i className="bi bi-chevron-right text-warning me-2 small" style={{ fontSize: "0.72rem" }}></i>
                  <span>{isTh ? "ช่วงล่าง & โช้คอัพ" : "Suspension & Shocks"}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* คอลัมน์ที่ 3: ระบบบริการอู่ซ่อมรถ */}
          <div className="col-6 col-md-3 col-lg-3">
            <h6 className="sp-footer-title">{isTh ? "บริการอู่ซ่อมรถ" : "Garage Services"}</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 mb-0">
              <li>
                <a
                  href="#"
                  onClick={handleNavigate("jobs", "estimator")}
                  className="text-decoration-none text-white-50 hover-white"
                >
                  <i className="bi bi-chevron-right text-warning me-2 small" style={{ fontSize: "0.72rem" }}></i>
                  <span>{isTh ? "ฟังก์ชันประเมินราคาซ่อม" : "Repair Cost Estimator"}</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleNavigate("jobs", "form")}
                  className="text-decoration-none text-white-50 hover-white"
                >
                  <i className="bi bi-chevron-right text-warning me-2 small" style={{ fontSize: "0.72rem" }}></i>
                  <span>{isTh ? "เปิดใบสั่งซ่อมบำรุง" : "Create Service Job"}</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleNavigate("parts")}
                  className="text-decoration-none text-white-50 hover-white"
                >
                  <i className="bi bi-chevron-right text-warning me-2 small" style={{ fontSize: "0.72rem" }}></i>
                  <span>{isTh ? "ตรวจสอบสต็อกคลังอะไหล่" : "Check Parts Inventory"}</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleNavigate("jobs", "invoices")}
                  className="text-decoration-none text-white-50 hover-white"
                >
                  <i className="bi bi-chevron-right text-warning me-2 small" style={{ fontSize: "0.72rem" }}></i>
                  <span>{isTh ? "ตรวจสอบใบแจ้งหนี้ / ใบเสร็จ" : "View Invoices & Receipts"}</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={handleNavigate("contact")}
                  className="text-decoration-none text-white-50 hover-white"
                >
                  <i className="bi bi-chevron-right text-warning me-2 small" style={{ fontSize: "0.72rem" }}></i>
                  <span>{isTh ? "ติดต่อฝ่ายช่างและศูนย์บริการ" : "Contact Service Advisors"}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* แถบลิขสิทธิ์ */}
        <div className="d-flex flex-wrap align-items-center justify-content-between pt-3 gap-2 small text-white border-top border-white border-opacity-25 mt-3" style={{ opacity: 0.9 }}>
          <div>
            © 2026 <strong>CarGarage</strong> {isTh ? "ระบบบริหารจัดการอู่ซ่อมรถและบริการอะไหล่ • All Rights Reserved." : "Car Garage Management & Parts Service • All Rights Reserved."}
          </div>
          <div>
            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                if (onGoToAdmin) onGoToAdmin();
                else window.location.href = "/admin";
              }}
              className="text-white-50 text-decoration-none hover-white d-flex align-items-center gap-1"
              style={{ fontSize: "0.74rem" }}
              title="สำหรับเจ้าหน้าที่ผู้ดูแลระบบเท่านั้น (Restricted Access)"
            >
              <i className="bi bi-shield-lock"></i>
              <span>{isTh ? "เข้าสู่ระบบเจ้าหน้าที่ (Admin Portal)" : "Staff Login (Admin Portal)"}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
