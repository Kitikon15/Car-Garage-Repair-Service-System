"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar({
  activeTab = "dashboard",
  setActiveTab,
  cartCount = 0,
  cartTotal = 0,
  apiOnline,
  onOpenRegister,
  currentCustomer,
  onLogoutCustomer,
  searchQuery = "",
  setSearchQuery,
  onPerformSearch,
  activeCategory = "all",
  setActiveCategory,
  currentTheme = "red-white",
  onSelectTheme,
  isBWMode = false,
  toggleBWMode,
}) {
  const { lang, t } = useLanguage();
  const [searchCategory, setSearchCategory] = useState(activeCategory || "all");

  useEffect(() => {
    if (activeCategory) {
      setSearchCategory(activeCategory);
    }
  }, [activeCategory]);

  const navItems = [
    { id: "dashboard", label: t("nav_home", "ภาพรวมศูนย์บริการ"), icon: "bi-speedometer2" },
    { id: "jobs", label: t("nav_jobs", "ใบสั่งซ่อม & ประเมินราคา"), icon: "bi-tools" },
    { id: "order", label: t("nav_order", "คลังเบิก-จ่ายอะไหล่"), icon: "bi-box-seam-fill" },
    { id: "parts", label: t("nav_parts", "รายการอะไหล่ในสต็อก"), icon: "bi-boxes" },
    { id: "vehicleSearch", label: t("nav_vehicle", "ทะเบียนรถ & ประวัติ"), icon: "bi-car-front-fill" },
    { id: "contact", label: t("nav_contact", "ติดต่อศูนย์บริการ"), icon: "bi-headset" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onPerformSearch) {
      onPerformSearch(searchQuery, searchCategory);
    } else if (setActiveTab) {
      setActiveTab("order");
    }
  };


  const isTh = lang !== "en";

  return (
    <header className="sticky-top shadow-sm" style={{ zIndex: 1050 }}>
      {/* 1. แถบประกาศข้อมูลระบบงานอู่ (Garage Operations Top Bar) */}
      <div className="sp-top-bar py-1 px-3 px-lg-4 d-none d-md-block">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <span className="text-white fw-semibold d-flex align-items-center gap-1">
              <i className="bi bi-wrench-adjustable-circle-fill text-warning"></i> {isTh ? "ระบบบริหารจัดการศูนย์บริการและอู่ซ่อมรถยนต์ (Car Garage Management)" : "Car Garage Repair & Service Management System"}
            </span>
            <span className="opacity-50">|</span>
            <span className="d-flex align-items-center gap-1 text-light small">
              <i className="bi bi-calculator-fill text-warning"></i> {isTh ? "ประเมินราคาซ่อม & ตัดสต็อกอะไหล่อัตโนมัติ" : "Automated Repair Estimation & Stock Deduction"}
            </span>
            <span className="opacity-50">|</span>
            <span className="d-flex align-items-center gap-1 text-light small">
              <i className="bi bi-shield-check text-success"></i> {isTh ? "ช่างผู้เชี่ยวชาญดูแล อะไหล่แท้ 100%" : "Certified Technicians • 100% Genuine OEM Parts"}
            </span>
          </div>

          <div className="d-flex align-items-center gap-2.5 text-light small">
            <span className="d-flex align-items-center gap-1">
              <i className="bi bi-clock-history text-warning"></i> {isTh ? "เปิดบริการทุกวัน 08:30 - 18:00 น." : "Open Daily 08:30 - 18:00"}
            </span>
            <span className="opacity-50">|</span>
            <LanguageSwitcher variant="customer" />
          </div>
        </div>
      </div>

      {/* 2. ส่วนหัวหลัก (Main Header with Search & Garage Branding) */}
      <div className="sp-main-header py-2 px-3 px-lg-4">
        <div className="container-fluid d-flex flex-wrap align-items-center justify-content-between gap-3">
          {/* Garage Branding Logo */}
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
              style={{ width: "42px", height: "42px" }}
            >
              <i className="bi bi-wrench-adjustable fs-4 text-warning"></i>
            </div>
            <div>
              <div className="d-flex align-items-center gap-1">
                <span className="fs-4 fw-black text-sp-blue tracking-tight" style={{ letterSpacing: "-0.5px" }}>
                  Car<span className="text-warning">Garage</span>
                </span>
                <span
                  className="badge ms-1 small fw-bold text-dark"
                  style={{ background: "var(--theme-accent-gradient)", letterSpacing: "0.5px" }}
                >
                  PRO
                </span>
              </div>
              <div className="text-muted" style={{ fontSize: "0.7rem", marginTop: "-2px" }}>
                {isTh ? "ระบบบริหารจัดการศูนย์บริการและอู่ซ่อมรถยนต์ครบวงจร" : "Comprehensive Automotive Service & Repair Management"}
              </div>
            </div>
          </a>

          {/* Garage Search Bar */}
          <div className="flex-grow-1 mx-lg-4" style={{ maxWidth: "680px" }}>
            <form onSubmit={handleSearchSubmit} className="sp-search-container">
              <select
                className="sp-search-select d-none d-sm-block"
                value={searchCategory}
                onChange={(e) => {
                  const newCat = e.target.value;
                  setSearchCategory(newCat);
                  if (setActiveCategory) {
                    setActiveCategory(newCat);
                  }
                  if (onPerformSearch) {
                    onPerformSearch(searchQuery, newCat);
                  } else if (setActiveTab) {
                    setActiveTab("order");
                  }
                }}
                style={{
                  minWidth: "175px",
                  fontSize: "0.86rem",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                <option value="all">{isTh ? "ทุกระบบงานซ่อม & อะไหล่" : "All Systems & Parts"}</option>
                <option value="fluids">{isTh ? "ระบบของเหลว & น้ำมันเครื่อง" : "Fluids & Engine Oils"}</option>
                <option value="suspension">{isTh ? "ระบบเบรก & ช่วงล่าง" : "Brakes & Suspension"}</option>
                <option value="engine">{isTh ? "ระบบเครื่องยนต์ & ส่งกำลัง" : "Engine & Transmission"}</option>
                <option value="cooling">{isTh ? "ระบบระบายความร้อน & หม้อน้ำ" : "Cooling & Radiators"}</option>
                <option value="electrical">{isTh ? "ระบบไฟ & แบตเตอรี่" : "Electrical & Batteries"}</option>
                <option value="filters">{isTh ? "ไส้กรอง & งานเช็กระยะ" : "Filters & Maintenance"}</option>
                <option value="body">{isTh ? "ชิ้นส่วนตัวถัง & โคมไฟ" : "Body Parts & Lighting"}</option>
                <option value="genuine">{isTh ? "อะไหล่แท้ศูนย์ OEM" : "Genuine OEM Parts"}</option>
                <option value="tools">{isTh ? "เครื่องมือช่าง & อุปกรณ์อู่" : "Mechanic Tools & Equipment"}</option>
              </select>

              <input
                type="text"
                className="sp-search-input"
                placeholder={isTh ? "ค้นหา รหัสอะไหล่, ชื่อสินค้า, แบรนด์ หรือรุ่นรถ..." : "Search part SKU, name, brand or car model..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              />

              <button type="submit" className="sp-search-btn">
                <i className="bi bi-search"></i>
                <span className="d-none d-sm-inline">{isTh ? "ค้นหา" : "Search"}</span>
              </button>
            </form>
          </div>

          {/* Right Section: Register Vehicle & Parts Cart */}
          <div className="d-flex align-items-center gap-2 gap-sm-3">
            {/* ปุ่มเปิดใบสั่งซ่อมด่วน */}
            <button
              className="btn btn-warning text-dark btn-sm d-flex align-items-center gap-1 py-1.5 px-3 rounded-pill fw-bold shadow-sm"
              onClick={() => {
                if (setActiveTab) setActiveTab("jobs");
              }}
              title={isTh ? "เปิดใบสั่งซ่อม / ประเมินราคา" : "Create Repair Job / Estimate Cost"}
            >
              <i className="bi bi-tools"></i>
              <span className="d-none d-xl-inline">{isTh ? "ใบสั่งซ่อม" : "Repair Job"}</span>
            </button>

            {/* สถานะลูกค้าที่ลงทะเบียนแล้ว หรือปุ่มลงทะเบียน */}
            {currentCustomer ? (
              <div className="d-flex align-items-center gap-1.5 bg-white border border-success-subtle py-1 px-2.5 rounded-pill shadow-sm">
                <div
                  className="d-flex align-items-center gap-1.5"
                  role="button"
                  onClick={onOpenRegister}
                  title={isTh ? `ลูกค้าที่ลงทะเบียนแล้ว: ${currentCustomer.name} (${currentCustomer.customer_id})` : `Registered: ${currentCustomer.name}`}
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-person-check-fill text-success fs-6"></i>
                  <div className="text-start d-none d-lg-block" style={{ lineHeight: "1.1" }}>
                    <div className="fw-bold text-dark text-truncate" style={{ maxWidth: "120px", fontSize: "0.76rem" }}>
                      {currentCustomer.name}
                    </div>
                    <span className="badge bg-success-subtle text-success p-0 fw-normal" style={{ fontSize: "0.68rem" }}>
                      {currentCustomer.customer_id}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-link text-muted p-0 ms-1"
                  title={isTh ? "ออกจากระบบ / เปลี่ยนลูกค้า" : "Logout / Switch Customer"}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm(isTh ? "ต้องการออกจากระบบลูกค้านี้หรือไม่?" : "Do you want to log out from this customer profile?")) {
                      if (onLogoutCustomer) onLogoutCustomer();
                    }
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <i className="bi bi-box-arrow-right text-danger fs-6"></i>
                </button>
              </div>
            ) : (
              <button
                className="btn btn-outline-sp-primary btn-sm d-flex align-items-center gap-1 py-1.5 px-3 rounded-pill"
                onClick={onOpenRegister}
                title={isTh ? "ลงทะเบียนรถยนต์ / เจ้าของ" : "Register Vehicle / Customer"}
              >
                <i className="bi bi-person-plus-fill fs-6"></i>
                <span className="d-none d-lg-inline">{isTh ? "ลงทะเบียนรถ/ลูกค้า" : "Register Car/Client"}</span>
              </button>
            )}

            {/* ปุ่มรายการเบิกอะไหล่ (Cart) */}
            <button
              className={`btn d-flex align-items-center gap-2 py-1.5 px-3 rounded-pill ${
                activeTab === "cart"
                  ? "btn-garage-fire shadow-lg"
                  : cartCount > 0
                  ? "btn-garage-unique shadow"
                  : "btn-outline-primary border-sp-blue text-sp-blue bg-white"
              }`}
              onClick={() => {
                if (setActiveTab) setActiveTab("cart");
              }}
              title={isTh ? "ดูรายการเบิกอะไหล่" : "View Parts Requisition Cart"}
            >
              <div className="position-relative">
                <i className="bi bi-cart3 fs-5"></i>
                {cartCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-white border border-light"
                    style={{ background: "#5b5ffd" }}
                  >
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="text-start d-none d-sm-block">
                <div className="small fw-semibold" style={{ fontSize: "0.72rem", lineHeight: "1" }}>{isTh ? "รายการเบิก" : "Parts Cart"}</div>
                <div className="fw-bold" style={{ fontSize: "0.85rem", lineHeight: "1.2" }}>
                  ฿{cartTotal.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                </div>
              </div>
            </button>

            {/* Server Online Badge */}
            <span
              className={`badge ${apiOnline ? "bg-success" : "bg-danger"} p-2 rounded-circle`}
              title={apiOnline ? (isTh ? "เซิร์ฟเวอร์ออนไลน์" : "Server Online") : (isTh ? "เซิร์ฟเวอร์ออฟไลน์" : "Server Offline")}
            >
              <i className={`bi ${apiOnline ? "bi-check" : "bi-x"} text-white`}></i>
            </span>
          </div>
        </div>
      </div>

      {/* 3. แถบเมนูนำทางหลักของศูนย์บริการ (Main Garage Navigation Bar) */}
      <nav className="sp-navbar navbar navbar-expand-lg navbar-dark py-0">
        <div className="container-fluid px-3 px-lg-4">
          <button
            className="navbar-toggler my-1 border-0"
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
            <ul className="navbar-nav me-auto mb-0 gap-1 py-1 align-items-center">
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
          </div>
        </div>
      </nav>
    </header>
  );
}
