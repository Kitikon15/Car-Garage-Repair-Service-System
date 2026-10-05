"use client";

import { useState } from "react";
import CategoryNav from "./CategoryNav";

export default function Navbar({
  activeTab = "dashboard",
  setActiveTab,
  cartCount = 0,
  cartTotal = 0,
  apiOnline,
  onOpenRegister,
  searchQuery = "",
  setSearchQuery,
  onPerformSearch,
  currentTheme = "red-white",
  onSelectTheme,
  isBWMode = false,
  toggleBWMode,
}) {
  const [searchCategory, setSearchCategory] = useState("all");
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const navItems = [
    { id: "dashboard", label: "หน้าแรก", icon: "bi-house-door-fill" },
    { id: "vehicleSearch", label: "ค้นหาตามรุ่นรถ", icon: "bi-car-front-fill" },
    { id: "order", label: "คลังเบิก-จ่ายอะไหล่", icon: "bi-bag-check-fill" },
    { id: "parts", label: "จัดการสต็อกอะไหล่", icon: "bi-boxes" },
    { id: "jobs", label: "ใบสั่งซ่อมและใบเสร็จ", icon: "bi-file-earmark-text-fill" },
    { id: "contact", label: "ติดต่อศูนย์บริการ", icon: "bi-geo-alt-fill" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onPerformSearch) {
      onPerformSearch(searchQuery, searchCategory);
    } else if (setActiveTab) {
      setActiveTab("order");
    }
  };

  return (
    <header className="sticky-top shadow-sm">
      {/* 1. แถบประกาศข้อมูลระบบงานอู่และคลังอะไหล่ (Garage Management System Top Bar) */}
      <div className="sp-top-bar py-1 px-3 px-lg-4 d-none d-md-block">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <span className="text-white fw-semibold d-flex align-items-center gap-1">
              <i className="bi bi-wrench-adjustable-circle-fill text-warning"></i> ระบบบริหารงานอู่ซ่อมรถและบริการอะไหล่ (Car Garage System)
            </span>
            <span className="opacity-50">|</span>
            <span className="d-flex align-items-center gap-1 text-light">
              <i className="bi bi-cpu-fill text-warning"></i> ระบบคำนวณราคาซ่อม Polymorphic Engine
            </span>
            <span className="opacity-50">|</span>
            <span className="d-flex align-items-center gap-1 text-light">
              <i className="bi bi-clipboard2-check-fill text-success"></i> บันทึกงานซ่อม &amp; สต็อกอะไหล่ Real-time
            </span>
          </div>

          <div className="d-flex align-items-center gap-3 text-light small">
            {/* Quick B&W toggle in top bar */}
            <button
              type="button"
              className="btn btn-link text-white p-0 text-decoration-none d-flex align-items-center gap-1 small opacity-90"
              onClick={toggleBWMode}
              title="สลับโหมดขาวดำ / สีสัน"
            >
              <i className={`bi ${isBWMode ? "bi-circle-half text-warning" : "bi-moon-fill"}`}></i>
              <span>{isBWMode ? "โหมดสีสัน" : "โหมดขาวดำ"}</span>
            </button>
            <span className="opacity-50">|</span>
            <span className="d-flex align-items-center gap-1">
              <i className="bi bi-clock-history text-warning"></i> เปิดทุกวัน 08:30 - 18:00 น.
            </span>
          </div>
        </div>
      </div>

      {/* 2. ส่วนหัวหลัก ServiceGarage (Main Header with Search & Branding) */}
      <div className="sp-main-header py-3 px-3 px-lg-4">
        <div className="container-fluid d-flex flex-wrap align-items-center justify-content-between gap-3">
          {/* ServiceGarage Logo */}
          <a
            href="#"
            className="d-flex align-items-center gap-2 text-decoration-none"
            onClick={(e) => {
              e.preventDefault();
              if (setActiveTab) setActiveTab("dashboard");
            }}
          >
            <div
              className="bg-sp-blue text-white rounded-3 p-2 d-flex align-items-center justify-content-center shadow-sm"
              style={{ width: "44px", height: "44px" }}
            >
              <i className="bi bi-gear-wide-connected fs-4 text-warning"></i>
            </div>
            <div>
              <div className="d-flex align-items-center gap-1">
                <span className="fs-3 fw-black text-sp-blue tracking-tight" style={{ letterSpacing: "-0.5px" }}>
                  Car<span className="text-warning">Garage</span>
                </span>
                <span className="badge bg-danger ms-1 small">SYSTEM</span>
              </div>
              <div className="text-muted" style={{ fontSize: "0.72rem", marginTop: "-3px" }}>
                ระบบบริหารจัดการอู่ซ่อมรถและบริการอะไหล่ (Garage Management)
              </div>
            </div>
          </a>

          {/* ServiceGarage Search Bar */}
          <div className="flex-grow-1 mx-lg-4" style={{ maxWidth: "680px" }}>
            <form onSubmit={handleSearchSubmit} className="sp-search-container">
              <select
                className="sp-search-select d-none d-sm-block"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              >
                <option value="all">ทุกหมวดหมู่</option>
                <option value="engine">น้ำมันเครื่อง &amp; ของเหลว</option>
                <option value="brake">ระบบเบรก</option>
                <option value="filter">ไส้กรอง</option>
                <option value="battery">แบตเตอรี่ &amp; ระบบไฟ</option>
                <option value="suspension">ช่วงล่าง &amp; โช้คอัพ</option>
              </select>

              <input
                type="text"
                className="sp-search-input"
                placeholder="ค้นหา ประเภทอะไหล่, ชื่อสินค้า, ยี่ห้อ (เช่น Shell, Brembo, Civic, Camry...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              />

              <button type="submit" className="sp-search-btn">
                <i className="bi bi-search"></i>
                <span className="d-none d-sm-inline">ค้นหา</span>
              </button>
            </form>
          </div>

          {/* Right Section: Theme Selector, B&W Mode, Register Vehicle & Cart */}
          <div className="d-flex align-items-center gap-2 gap-sm-3">
            {/* 1. ปุ่มเลือกธีมสีพิเศษ (Multi-Theme Selector) */}
            <div className="position-relative">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2 py-2 px-3 rounded-pill fw-bold border bg-white shadow-sm"
                onClick={() => setShowThemeMenu((prev) => !prev)}
                title="เลือกธีมสีของระบบ"
              >
                <span
                  className="rounded-circle d-inline-block border"
                  style={{
                    width: "14px",
                    height: "14px",
                    backgroundColor:
                      currentTheme === "red-white"
                        ? "#dc2626"
                        : currentTheme === "racing"
                        ? "#991b1b"
                        : currentTheme === "cyber"
                        ? "#2563eb"
                        : currentTheme === "monochrome"
                        ? "#18181b"
                        : "#dc2626",
                    boxShadow: "0 0 6px rgba(0,0,0,0.25)",
                  }}
                />
                <span className="d-none d-md-inline small">
                  {currentTheme === "red-white"
                    ? "Red & White (แดงขาว)"
                    : currentTheme === "racing"
                    ? "Midnight Racing"
                    : currentTheme === "cyber"
                    ? "Cyber Cobalt"
                    : currentTheme === "monochrome"
                    ? "Monochrome"
                    : "Red & White (แดงขาว)"}
                </span>
                <i className="bi bi-palette-fill text-muted small"></i>
              </button>

              {/* Theme Dropdown Menu */}
              {showThemeMenu && (
                <>
                  <div
                    className="position-fixed top-0 start-0 w-100 h-100"
                    style={{ zIndex: 1055 }}
                    onClick={() => setShowThemeMenu(false)}
                  />
                  <div
                    className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg border p-2"
                    style={{ zIndex: 1060, width: "230px" }}
                  >
                    <div className="small fw-bold text-muted px-2 py-1 mb-1 border-bottom">
                      เลือกธีมสีระบบ (Auto Theme)
                    </div>

                    <button
                      type="button"
                      className={`btn btn-sm w-100 text-start d-flex align-items-center gap-2 py-2 px-2 rounded-2 mb-1 ${
                        currentTheme === "red-white" ? "bg-danger-subtle text-danger fw-bold" : "btn-light"
                      }`}
                      onClick={() => {
                        onSelectTheme && onSelectTheme("red-white");
                        setShowThemeMenu(false);
                      }}
                    >
                      <span className="rounded-circle p-1 bg-danger d-inline-block" style={{ width: "12px", height: "12px" }}></span>
                      <span>Red &amp; White (แดงขาว - ค่าเริ่มต้น)</span>
                    </button>

                    <button
                      type="button"
                      className={`btn btn-sm w-100 text-start d-flex align-items-center gap-2 py-2 px-2 rounded-2 mb-1 ${
                        currentTheme === "cyber" ? "bg-primary-subtle text-primary fw-bold" : "btn-light"
                      }`}
                      onClick={() => {
                        onSelectTheme && onSelectTheme("cyber");
                        setShowThemeMenu(false);
                      }}
                    >
                      <span className="rounded-circle p-1 bg-primary d-inline-block" style={{ width: "12px", height: "12px" }}></span>
                      <span>Cyber Cobalt (น้ำเงินไซเบอร์)</span>
                    </button>

                    <button
                      type="button"
                      className={`btn btn-sm w-100 text-start d-flex align-items-center gap-2 py-2 px-2 rounded-2 mb-1 ${
                        currentTheme === "racing" ? "bg-secondary-subtle text-dark fw-bold" : "btn-light"
                      }`}
                      onClick={() => {
                        onSelectTheme && onSelectTheme("racing");
                        setShowThemeMenu(false);
                      }}
                    >
                      <span className="rounded-circle p-1 bg-dark d-inline-block" style={{ width: "12px", height: "12px" }}></span>
                      <span>Midnight Racing (ดาร์กสปอร์ต)</span>
                    </button>

                    <button
                      type="button"
                      className={`btn btn-sm w-100 text-start d-flex align-items-center gap-2 py-2 px-2 rounded-2 ${
                        currentTheme === "monochrome" || isBWMode ? "bg-dark text-white fw-bold" : "btn-light"
                      }`}
                      onClick={() => {
                        onSelectTheme && onSelectTheme("monochrome");
                        setShowThemeMenu(false);
                      }}
                    >
                      <span className="rounded-circle p-1 bg-dark border border-white d-inline-block" style={{ width: "12px", height: "12px" }}></span>
                      <span>Monochrome (โหมดขาวดำ)</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* 2. ปุ่มสลับโหมดขาวดำโดยตรง (Quick B&W Mode Toggle) */}
            <button
              type="button"
              className={`btn btn-sm d-flex align-items-center gap-1 py-2 px-3 rounded-pill fw-bold transition-all ${
                isBWMode
                  ? "btn-dark text-white border border-light shadow"
                  : "btn-outline-dark border bg-white"
              }`}
              onClick={toggleBWMode}
              title={isBWMode ? "สลับกลับสู่โหมดสีสัน" : "เปลี่ยนเป็นโหมดขาวดำ (Black & White Mode)"}
            >
              <i className={`bi ${isBWMode ? "bi-palette-fill text-warning" : "bi-circle-half text-dark"}`}></i>
              <span className="d-none d-lg-inline">{isBWMode ? "โหมดสีสัน" : "โหมดขาวดำ"}</span>
            </button>

            {/* ปุ่มลงทะเบียนรถ/ลูกค้า */}
            <button
              className="btn btn-outline-sp-primary btn-sm d-flex align-items-center gap-1 py-2 px-3 rounded-pill"
              onClick={onOpenRegister}
              title="ลงทะเบียนรถยนต์ / เจ้าของ"
            >
              <i className="bi bi-person-plus-fill fs-6"></i>
              <span className="d-none d-lg-inline">ลงทะเบียนรถ/ลูกค้า</span>
            </button>

            {/* ปุ่มรถเข็น / ตะกร้าสินค้าสไตล์ Unique Gradient */}
            <button
              className={`btn d-flex align-items-center gap-2 py-2 px-3 rounded-pill ${
                activeTab === "cart"
                  ? "btn-garage-fire shadow-lg"
                  : cartCount > 0
                  ? "btn-garage-unique shadow"
                  : "btn-outline-danger border-sp-blue text-sp-blue bg-white"
              }`}
              onClick={() => {
                if (setActiveTab) setActiveTab("cart");
              }}
              title="ดูตะกร้าสินค้า"
            >
              <div className="position-relative">
                <i className="bi bi-cart3 fs-5"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="text-start d-none d-sm-block">
                <div className="small fw-semibold" style={{ fontSize: "0.72rem", lineHeight: "1" }}>ตะกร้าสินค้า</div>
                <div className="fw-bold" style={{ fontSize: "0.85rem", lineHeight: "1.2" }}>
                  ฿{cartTotal.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                </div>
              </div>
            </button>

            {/* Server Online Badge */}
            <span
              className={`badge ${apiOnline ? "bg-success" : "bg-danger"} p-2 rounded-circle`}
              title={apiOnline ? "เซิร์ฟเวอร์ออนไลน์" : "เซิร์ฟเวอร์ออฟไลน์"}
            >
              <i className={`bi ${apiOnline ? "bi-check" : "bi-x"} text-white`}></i>
            </span>
          </div>
        </div>
      </div>

      {/* 3. แถบเมนูนำทางหลักสีน้ำเงิน ServiceGarage (Royal Blue Navbar) */}
      <nav className="sp-navbar navbar navbar-expand-lg navbar-dark py-0">
        <div className="container-fluid px-3 px-lg-4">
          <button
            className="navbar-toggler my-2 border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#serviceGarageNav"
            aria-controls="serviceGarageNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="serviceGarageNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1 py-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <li className="nav-item" key={item.id}>
                    <button
                      className={`sp-nav-item btn btn-link ${isActive ? "active" : ""}`}
                      onClick={() => {
                        if (setActiveTab) setActiveTab(item.id);
                      }}
                    >
                      <i className={`bi ${item.icon}`}></i>
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="d-none d-lg-flex align-items-center text-white small gap-2 py-2">
              <i className="bi bi-clock-history text-warning"></i>
              <span>เปิดบริการทุกวัน 08:30 - 18:00 น.</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 4. แถบหมวดหมู่ระบบอะไหล่และงานบริการอู่ซ่อม (Garage Subsystem Navigation) */}
      <CategoryNav
        onSelectCategoryItem={(searchTerm, catId) => {
          if (setSearchQuery) setSearchQuery(searchTerm);
          if (onPerformSearch) {
            onPerformSearch(searchTerm, catId);
          } else if (setActiveTab) {
            setActiveTab("order");
          }
        }}
        onSelectBrand={(brandName) => {
          if (setSearchQuery) setSearchQuery(brandName);
          if (onPerformSearch) {
            onPerformSearch(brandName, "all");
          } else if (setActiveTab) {
            setActiveTab("order");
          }
        }}
        onGoToJobs={() => {
          if (setActiveTab) setActiveTab("jobs");
        }}
        onGoToVehicleSearch={() => {
          if (setActiveTab) setActiveTab("vehicleSearch");
        }}
      />
    </header>
  );
}
