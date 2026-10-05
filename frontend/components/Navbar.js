"use client";

import { useState, useEffect } from "react";

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
  activeCategory = "all",
  setActiveCategory,
  currentTheme = "red-white",
  onSelectTheme,
  isBWMode = false,
  toggleBWMode,
}) {
  const [searchCategory, setSearchCategory] = useState(activeCategory || "all");

  useEffect(() => {
    if (activeCategory) {
      setSearchCategory(activeCategory);
    }
  }, [activeCategory]);

  const navItems = [
    { id: "dashboard", label: "ภาพรวมศูนย์บริการ", icon: "bi-speedometer2" },
    { id: "jobs", label: "ใบสั่งซ่อม & ประเมินราคา", icon: "bi-tools" },
    { id: "order", label: "คลังเบิก-จ่ายอะไหล่", icon: "bi-box-seam-fill" },
    { id: "parts", label: "จัดการสต็อกอะไหล่", icon: "bi-boxes" },
    { id: "vehicleSearch", label: "ทะเบียนรถ & ประวัติ", icon: "bi-car-front-fill" },
    { id: "contact", label: "ติดต่อศูนย์บริการ", icon: "bi-headset" },
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
    <header className="sticky-top shadow-sm" style={{ zIndex: 1050 }}>
      {/* 1. แถบประกาศข้อมูลระบบงานอู่ (Garage Operations Top Bar) */}
      <div className="sp-top-bar py-1 px-3 px-lg-4 d-none d-md-block">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <span className="text-white fw-semibold d-flex align-items-center gap-1">
              <i className="bi bi-wrench-adjustable-circle-fill text-warning"></i> ระบบบริหารจัดการศูนย์บริการและอู่ซ่อมรถยนต์ (Car Garage Management)
            </span>
            <span className="opacity-50">|</span>
            <span className="d-flex align-items-center gap-1 text-light small">
              <i className="bi bi-calculator-fill text-warning"></i> ประเมินราคาซ่อม &amp; ตัดสต็อกอะไหล่อัตโนมัติ
            </span>
            <span className="opacity-50">|</span>
            <span className="d-flex align-items-center gap-1 text-light small">
              <i className="bi bi-shield-check text-success"></i> ช่างผู้เชี่ยวชาญดูแล อะไหล่แท้ 100%
            </span>
          </div>

          <div className="d-flex align-items-center gap-3 text-light small">
            <span className="d-flex align-items-center gap-1">
              <i className="bi bi-clock-history text-warning"></i> เปิดบริการทุกวัน 08:30 - 18:00 น.
            </span>
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
                <span className="badge bg-danger ms-1 small fw-bold">PRO</span>
              </div>
              <div className="text-muted" style={{ fontSize: "0.7rem", marginTop: "-2px" }}>
                ระบบบริหารจัดการศูนย์บริการและอู่ซ่อมรถยนต์ครบวงจร
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
                <option value="all">ทุกระบบงานซ่อม &amp; อะไหล่</option>
                <option value="fluids">ระบบของเหลว &amp; น้ำมันเครื่อง</option>
                <option value="suspension">ระบบเบรก &amp; ช่วงล่าง</option>
                <option value="engine">ระบบเครื่องยนต์ &amp; ส่งกำลัง</option>
                <option value="cooling">ระบบระบายความร้อน &amp; หม้อน้ำ</option>
                <option value="electrical">ระบบไฟ &amp; แบตเตอรี่</option>
                <option value="filters">ไส้กรอง &amp; งานเช็กระยะ</option>
                <option value="body">ชิ้นส่วนตัวถัง &amp; โคมไฟ</option>
                <option value="genuine">อะไหล่แท้ศูนย์ OEM</option>
                <option value="tools">เครื่องมือช่าง &amp; อุปกรณ์อู่</option>
              </select>

              <input
                type="text"
                className="sp-search-input"
                placeholder="ค้นหา รหัสอะไหล่, ชื่อสินค้า, แบรนด์ หรือรุ่นรถ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              />

              <button type="submit" className="sp-search-btn">
                <i className="bi bi-search"></i>
                <span className="d-none d-sm-inline">ค้นหา</span>
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
              title="เปิดใบสั่งซ่อม / ประเมินราคา"
            >
              <i className="bi bi-tools"></i>
              <span className="d-none d-xl-inline">ใบสั่งซ่อม</span>
            </button>

            {/* ปุ่มลงทะเบียนรถ/ลูกค้า */}
            <button
              className="btn btn-outline-sp-primary btn-sm d-flex align-items-center gap-1 py-1.5 px-3 rounded-pill"
              onClick={onOpenRegister}
              title="ลงทะเบียนรถยนต์ / เจ้าของ"
            >
              <i className="bi bi-person-plus-fill fs-6"></i>
              <span className="d-none d-lg-inline">ลงทะเบียนรถ/ลูกค้า</span>
            </button>

            {/* ปุ่มรายการเบิกอะไหล่ (Cart) */}
            <button
              className={`btn d-flex align-items-center gap-2 py-1.5 px-3 rounded-pill ${
                activeTab === "cart"
                  ? "btn-garage-fire shadow-lg"
                  : cartCount > 0
                  ? "btn-garage-unique shadow"
                  : "btn-outline-danger border-sp-blue text-sp-blue bg-white"
              }`}
              onClick={() => {
                if (setActiveTab) setActiveTab("cart");
              }}
              title="ดูรายการเบิกอะไหล่"
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
                <div className="small fw-semibold" style={{ fontSize: "0.72rem", lineHeight: "1" }}>รายการเบิก</div>
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
