"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function AdminVuexyDashboard({
  parts = [],
  vehicles = [],
  customers = [],
  invoices = [],
  onNavigateTab,
}) {
  const { lang, t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState("2026");

  // Calculate live stats from database
  const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.total_amount || 0), 0);
  const paidRevenue = invoices
    .filter((inv) => inv.payment_status === "PAID")
    .reduce((sum, inv) => sum + (inv.total_amount || 0), 0);
  const pendingRevenue = invoices
    .filter((inv) => inv.payment_status === "PENDING")
    .reduce((sum, inv) => sum + (inv.total_amount || 0), 0);

  const totalPartsStock = parts.reduce((sum, p) => sum + (p.stock_qty || 0), 0);
  const lowStockCount = parts.filter((p) => (p.stock_qty || 0) < 5).length;

  // Monthly Revenue & Parts Cost Data (Jan - Sep 2026) in Thousands THB
  const monthlyData = [
    { month: "Jan", earn: 85, exp: 38 },
    { month: "Feb", earn: 120, exp: 45 },
    { month: "Mar", earn: 145, exp: 68 },
    { month: "Apr", earn: 165, exp: 82 },
    { month: "May", earn: 95, exp: 42 },
    { month: "Jun", earn: 110, exp: 48 },
    { month: "Jul", earn: 135, exp: 58 },
    { month: "Aug", earn: 155, exp: 62 },
    { month: "Sep", earn: 125, exp: 50 },
  ];

  return (
    <div className="d-flex flex-column gap-4 animate-fade-in" style={{ color: "#5d596c" }}>
      {/* ======================================================== */}
      {/* ROW 1: Master Technician of the Month + Core Garage KPIs */}
      {/* ======================================================== */}
      <div className="row g-4">
        {/* 1. ช่างเทคนิคดีเด่นประจำเดือน (Master Technician of the Month) */}
        <div className="col-12 col-xl-4 col-lg-5">
          <div
            className="card border-0 h-100 p-4 position-relative overflow-hidden shadow-sm"
            style={{
              borderRadius: "16px",
              background: "#ffffff",
              boxShadow: "0 4px 18px 0 rgba(75, 70, 92, 0.08)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="d-flex align-items-center gap-1.5 mb-1">
                  <span className="badge rounded-pill px-2.5 py-1 text-white fw-bold small" style={{ background: "#7367f0", fontSize: "0.72rem" }}>
                    🔧 MASTER TECHNICIAN
                  </span>
                </div>
                <h5 className="fw-bold mb-1 text-dark" style={{ letterSpacing: "-0.3px" }}>
                  {lang === "th" ? "ช่างจันทร์ บรรลัยการช่าง" : "Technician Chan (Banlai Garage)"}
                </h5>
                <p className="small mb-3 text-muted">
                  {lang === "th" ? (
                    <>ส่งมอบงานซ่อมตรงเวลา <strong>99.4%</strong> ประจำเดือน</>
                  ) : (
                    <>On-time repair delivery <strong>99.4%</strong> this month</>
                  )}
                </p>

                <div className="d-flex align-items-baseline gap-2 mb-3">
                  <h3 className="fw-black mb-0 text-sp-blue" style={{ color: "#7367f0" }}>
                    {lang === "th" ? "48 คัน" : "48 Cars"}
                  </h3>
                  <small className="text-muted fw-semibold">
                    {t("completed_jobs_label", "งานซ่อมเสร็จสมบูรณ์")}
                  </small>
                </div>

                <button
                  type="button"
                  className="btn btn-sm text-white px-3 py-2 fw-semibold rounded-3 shadow-sm d-flex align-items-center gap-2"
                  style={{
                    background: "#7367f0",
                    border: "none",
                    boxShadow: "0 2px 6px rgba(115, 103, 240, 0.4)",
                  }}
                  onClick={() => onNavigateTab && onNavigateTab("jobs")}
                >
                  <i className="bi bi-wrench-adjustable"></i>
                  <span>{t("check_repair_jobs_btn", "ตรวจสอบงานซ่อม (Repair Jobs)")}</span>
                </button>
              </div>

              {/* Professional Automotive Mechanic Tools Graphic (เครื่องมือช่าง) */}
              <div className="flex-shrink-0 pe-2">
                <svg width="115" height="115" viewBox="0 0 120 120" fill="none">
                  <defs>
                    {/* Ambient Glow */}
                    <radialGradient id="toolGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#7367f0" stopOpacity="0.18" />
                      <stop offset="70%" stopColor="#7367f0" stopOpacity="0.04" />
                      <stop offset="100%" stopColor="#7367f0" stopOpacity="0" />
                    </radialGradient>

                    {/* Chrome Metallic Gradients */}
                    <linearGradient id="chromeBody" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="30%" stopColor="#e2e8f0" />
                      <stop offset="70%" stopColor="#94a3b8" />
                      <stop offset="100%" stopColor="#64748b" />
                    </linearGradient>

                    <linearGradient id="chromeDark" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#94a3b8" />
                      <stop offset="50%" stopColor="#64748b" />
                      <stop offset="100%" stopColor="#334155" />
                    </linearGradient>

                    <linearGradient id="chromeHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.4" />
                    </linearGradient>

                    {/* Grip Purple Gradient */}
                    <linearGradient id="purpleGrip" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b7ff8" />
                      <stop offset="50%" stopColor="#7367f0" />
                      <stop offset="100%" stopColor="#5544d6" />
                    </linearGradient>

                    {/* Gold Accent / Spark */}
                    <linearGradient id="goldSpark" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fde047" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>

                    {/* Drop Shadow Filter */}
                    <filter id="toolShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#4b465c" floodOpacity="0.18" />
                    </filter>
                  </defs>

                  {/* Ambient Glow & Gear Ring Backdrop */}
                  <circle cx="60" cy="60" r="54" fill="url(#toolGlow)" />

                  {/* Outer Mechanical Gear Ring */}
                  <g opacity="0.35" stroke="#7367f0">
                    <circle cx="60" cy="60" r="46" strokeWidth="2.5" strokeDasharray="7 5" />
                    <circle cx="60" cy="60" r="51" strokeWidth="1" strokeOpacity="0.5" />
                  </g>

                  {/* TOOL 1: Combination Wrench (ประแจรวมปากตายและแหวน) */}
                  <g transform="rotate(-38 60 60)" filter="url(#toolShadow)">
                    {/* Wrench Shaft */}
                    <rect x="55.5" y="24" width="9" height="72" rx="3.5" fill="url(#chromeBody)" />
                    {/* Recessed Center Groove */}
                    <rect x="58" y="34" width="4" height="52" rx="2" fill="url(#chromeDark)" />
                    <rect x="58.5" y="35" width="1.5" height="50" rx="1" fill="url(#chromeHighlight)" opacity="0.7" />

                    {/* Top Open Jaw */}
                    <path d="M50 20 L55 24 L60 21 L65 24 L70 20 C68 14 65 10 60 10 C55 10 52 14 50 20 Z" fill="url(#chromeBody)" />
                    <path d="M55 12 L65 12 L65 22 L60 25 L55 22 Z" fill="#ffffff" opacity="0.95" />

                    {/* Bottom Ring Box End */}
                    <circle cx="60" cy="96" r="11" fill="url(#chromeBody)" />
                    <circle cx="60" cy="96" r="6" fill="#ffffff" />
                    <circle cx="60" cy="96" r="6.8" stroke="url(#chromeDark)" strokeWidth="1.8" strokeDasharray="2.2 1.4" />
                  </g>

                  {/* TOOL 2: Automotive Mechanic Screwdriver (ไขควงช่างยนต์) */}
                  <g transform="rotate(38 60 60)" filter="url(#toolShadow)">
                    {/* Steel Shaft */}
                    <rect x="57.5" y="16" width="5" height="48" rx="1.5" fill="url(#chromeBody)" />
                    <line x1="58.8" y1="18" x2="58.8" y2="60" stroke="#ffffff" strokeWidth="1" opacity="0.8" />
                    {/* Screwdriver Tip */}
                    <path d="M56.5 16 L63.5 16 L61.5 10 L58.5 10 Z" fill="url(#chromeDark)" />
                    {/* Bolster */}
                    <rect x="56" y="58" width="8" height="5" rx="1.5" fill="url(#chromeDark)" />

                    {/* Screwdriver Ergonomic Handle */}
                    <path d="M53 63 C52 68 53 84 52 92 C51.5 98 55 106 60 106 C65 106 68.5 98 68 92 C67 84 68 68 67 63 C65 62 55 62 53 63 Z" fill="url(#purpleGrip)" />

                    {/* Grip Grooves */}
                    <rect x="55.5" y="68" width="9" height="3" rx="1.5" fill="#334155" opacity="0.85" />
                    <rect x="54.5" y="75" width="11" height="3" rx="1.5" fill="#334155" opacity="0.85" />
                    <rect x="54" y="82" width="12" height="3.5" rx="1.5" fill="#334155" opacity="0.85" />
                    <rect x="54.5" y="89" width="11" height="3" rx="1.5" fill="#334155" opacity="0.85" />
                    <rect x="56" y="96" width="8" height="2.5" rx="1.2" fill="#334155" opacity="0.85" />

                    <path d="M55 66 C54.5 75 54.5 88 55.5 98" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
                  </g>

                  {/* Centerpiece: Polished Hex Nut */}
                  <g filter="url(#toolShadow)">
                    <polygon points="60,49 69.5,54.5 69.5,65.5 60,71 50.5,65.5 50.5,54.5" fill="url(#chromeBody)" stroke="url(#chromeDark)" strokeWidth="1.5" />
                    <circle cx="60" cy="60" r="5.2" fill="#1e293b" />
                    <circle cx="60" cy="60" r="4.2" stroke="#e2e8f0" strokeWidth="0.8" opacity="0.7" />
                  </g>

                  {/* Sparkles */}
                  <g transform="translate(86, 24)">
                    <path d="M0 -6 Q0 0 6 0 Q0 0 0 6 Q0 0 -6 0 Q0 0 0 -6 Z" fill="url(#goldSpark)" />
                    <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
                  </g>
                  <g transform="translate(28, 86)">
                    <path d="M0 -4 Q0 0 4 0 Q0 0 0 4 Q0 0 -4 0 Q0 0 0 -4 Z" fill="url(#goldSpark)" opacity="0.8" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 2. สถิติ 4 ตัวหลักของศูนย์บริการและอู่ซ่อม (Core Garage KPIs) */}
        <div className="col-12 col-xl-8 col-lg-7">
          <div
            className="card border-0 h-100 p-4 shadow-sm"
            style={{
              borderRadius: "16px",
              background: "#ffffff",
              boxShadow: "0 4px 18px 0 rgba(75, 70, 92, 0.08)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 className="fw-bold mb-0 text-dark">
                  {t("garage_operations_title", "สถิติภาพรวมศูนย์บริการ (Garage Operations)")}
                </h5>
                <small className="text-muted">
                  {t("realtime_data_sub", "ข้อมูลอัปเดตระบบแบบ Real-time")}
                </small>
              </div>
              <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2.5 py-1 fw-semibold small">
                <i className="bi bi-record-fill me-1 text-success"></i> {t("garage_open_normal", "อู่เปิดให้บริการปกติ")}
              </span>
            </div>

            <div className="row g-3 my-auto">
              {/* Metric 1: รถเข้าซ่อมสะสม (Vehicles Serviced) */}
              <div className="col-6 col-sm-3">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "rgba(115, 103, 240, 0.12)",
                      color: "#7367f0",
                    }}
                  >
                    <i className="bi bi-car-front-fill fs-5"></i>
                  </div>
                  <div>
                    <h5 className="fw-black mb-0 text-dark">230 คัน</h5>
                    <small className="text-muted" style={{ fontSize: "0.78rem" }}>รถเข้าซ่อม (Cars)</small>
                  </div>
                </div>
              </div>

              {/* Metric 2: ลูกค้าศูนย์บริการ (Customers) */}
              <div className="col-6 col-sm-3">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "rgba(0, 207, 232, 0.12)",
                      color: "#00cfe8",
                    }}
                  >
                    <i className="bi bi-person-badge-fill fs-5"></i>
                  </div>
                  <div>
                    <h5 className="fw-black mb-0 text-dark">8.54k ราย</h5>
                    <small className="text-muted" style={{ fontSize: "0.78rem" }}>ลูกค้าศูนย์ (Clients)</small>
                  </div>
                </div>
              </div>

              {/* Metric 3: อะไหล่ในคลังพร้อมเบิก (Parts Stock) */}
              <div className="col-6 col-sm-3">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "rgba(234, 84, 85, 0.12)",
                      color: "#ea5455",
                    }}
                  >
                    <i className="bi bi-box-seam-fill fs-5"></i>
                  </div>
                  <div>
                    <h5 className="fw-black mb-0 text-dark">{totalPartsStock || 1423} ชิ้น</h5>
                    <small className="text-muted" style={{ fontSize: "0.78rem" }}>
                      สต็อกอะไหล่ ({parts.length} SKU)
                    </small>
                  </div>
                </div>
              </div>

              {/* Metric 4: รายได้ศูนย์บริการรวม (Service Revenue) */}
              <div className="col-6 col-sm-3">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "rgba(40, 199, 111, 0.12)",
                      color: "#28c76f",
                    }}
                  >
                    <i className="bi bi-cash-stack fs-5"></i>
                  </div>
                  <div>
                    <h5 className="fw-black mb-0 text-dark">
                      ฿{totalRevenue > 0 ? totalRevenue.toLocaleString("th-TH") : "98,745"}
                    </h5>
                    <small className="text-muted" style={{ fontSize: "0.78rem" }}>รายได้ค่าบริการรวม</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* ROW 2: Left (ส่งมอบ, ความพึงพอใจ, สัดส่วนงาน) + Right (รายงานการเงินศูนย์) */}
      {/* ======================================================== */}
      <div className="row g-4">
        {/* Left Column: Mini cards + Service Mix Donut */}
        <div className="col-12 col-xl-4 col-lg-5 d-flex flex-column gap-4">
          {/* Mini Cards Row: รถส่งมอบแล้ว & อัตราความพึงพอใจ */}
          <div className="row g-3">
            {/* Delivered Cars (Orders) */}
            <div className="col-6">
              <div
                className="card border-0 p-3 shadow-sm h-100"
                style={{
                  borderRadius: "16px",
                  background: "#ffffff",
                  boxShadow: "0 4px 18px 0 rgba(75, 70, 92, 0.08)",
                }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <small className="text-muted fw-semibold">รถส่งมอบแล้ว</small>
                  <span className="badge bg-warning bg-opacity-25 text-warning" style={{ fontSize: "0.65rem" }}>
                    +14.8%
                  </span>
                </div>
                <h4 className="fw-black text-dark my-1">28 คัน</h4>
                <small className="text-muted" style={{ fontSize: "0.72rem" }}>สัปดาห์นี้ (Mon-Sat)</small>

                {/* Orange Vertical Bar Sparkline (Cars Delivered Daily) */}
                <div className="d-flex align-items-end justify-content-between pt-2" style={{ height: "48px" }}>
                  <div style={{ width: "8px", height: "45%", background: "#ff9f43", borderRadius: "4px" }} title="จันทร์: 4 คัน"></div>
                  <div style={{ width: "8px", height: "70%", background: "#ff9f43", borderRadius: "4px" }} title="อังคาร: 6 คัน"></div>
                  <div style={{ width: "8px", height: "95%", background: "#ff9f43", borderRadius: "4px" }} title="พุธ: 8 คัน"></div>
                  <div style={{ width: "8px", height: "60%", background: "#ff9f43", borderRadius: "4px" }} title="พฤหัสบดี: 5 คัน"></div>
                  <div style={{ width: "8px", height: "85%", background: "#ff9f43", borderRadius: "4px" }} title="ศุกร์: 7 คัน"></div>
                  <div style={{ width: "8px", height: "50%", background: "#ff9f43", borderRadius: "4px" }} title="เสาร์: 4 คัน"></div>
                </div>
              </div>
            </div>

            {/* Service Quality / CSI Score (Profit) */}
            <div className="col-6">
              <div
                className="card border-0 p-3 shadow-sm h-100"
                style={{
                  borderRadius: "16px",
                  background: "#ffffff",
                  boxShadow: "0 4px 18px 0 rgba(75, 70, 92, 0.08)",
                }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <small className="text-muted fw-semibold">ความพึงพอใจ</small>
                  <span className="badge bg-info bg-opacity-25 text-info" style={{ fontSize: "0.65rem" }}>
                    4.9/5 ★
                  </span>
                </div>
                <h4 className="fw-black text-dark my-1">98.6%</h4>
                <small className="text-muted" style={{ fontSize: "0.72rem" }}>ผ่าน QC รอบแรก 100%</small>

                {/* Cyan Wavy Line Sparkline */}
                <div className="pt-2 d-flex align-items-center" style={{ height: "48px" }}>
                  <svg width="100%" height="40" viewBox="0 0 100 40" fill="none">
                    <path
                      d="M2 30 Q 25 5, 45 22 T 85 8 T 98 2"
                      stroke="#00cfe8"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <circle cx="2" cy="30" r="3.5" fill="#00cfe8" />
                    <circle cx="45" cy="22" r="3.5" fill="#00cfe8" />
                    <circle cx="85" cy="8" r="3.5" fill="#00cfe8" />
                    <circle cx="98" cy="2" r="4" fill="#ffffff" stroke="#00cfe8" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Service Mix / Average Ticket Donut Card */}
          <div
            className="card border-0 p-4 shadow-sm"
            style={{
              borderRadius: "16px",
              background: "#ffffff",
              boxShadow: "0 4px 18px 0 rgba(75, 70, 92, 0.08)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="fw-bold mb-1 text-dark">สัดส่วนงานซ่อมบำรุง</h5>
                <small className="text-muted d-block mb-1">ค่าบริการเฉลี่ยต่องาน (Avg. Ticket)</small>
                <h4 className="fw-black text-dark mb-2">฿4,250.00</h4>
                <p className="small text-muted mb-0" style={{ fontSize: "0.76rem", lineHeight: "1.3" }}>
                  เช็กระยะ &amp; น้ำมันเครื่อง <strong>58%</strong> | ช่วงล่าง <strong>28%</strong> | ระบบไฟ <strong>14%</strong>
                </p>
              </div>

              {/* Teal/Green Progress Donut */}
              <div className="position-relative flex-shrink-0" style={{ width: "95px", height: "95px" }}>
                <svg width="95" height="95" viewBox="0 0 36 36">
                  {/* Background Circle */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e6f7ef"
                    strokeWidth="3.8"
                  />
                  {/* Progress Arc: 58% Regular Service */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#28c76f"
                    strokeWidth="3.8"
                    strokeDasharray="58, 100"
                    strokeLinecap="round"
                  />
                </svg>
                <div
                  className="position-absolute top-50 start-50 translate-middle text-center"
                  style={{ lineHeight: "1" }}
                >
                  <div className="fw-black text-dark" style={{ fontSize: "0.82rem" }}>
                    58%
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.6rem" }}>
                    เช็กระยะ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: รายงานการเงินศูนย์บริการ (Revenue vs Parts Cost) */}
        <div className="col-12 col-xl-8 col-lg-7">
          <div
            className="card border-0 h-100 p-4 shadow-sm"
            style={{
              borderRadius: "16px",
              background: "#ffffff",
              boxShadow: "0 4px 18px 0 rgba(75, 70, 92, 0.08)",
            }}
          >
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
              <div>
                <h5 className="fw-bold mb-0 text-dark">รายงานการเงินศูนย์บริการ (Revenue &amp; Cost)</h5>
                <small className="text-muted">เปรียบเทียบรายได้ค่าบริการและต้นทุนอะไหล่เข้าคลัง (หน่วย: พันบาท)</small>
              </div>

              <div className="d-flex align-items-center gap-3">
                {/* Legend */}
                <div className="d-flex align-items-center gap-2 small">
                  <span className="badge rounded-circle p-1" style={{ width: "8px", height: "8px", background: "#7367f0" }}> </span>
                  <span className="text-muted">รายได้งานซ่อม (Revenue)</span>
                </div>
                <div className="d-flex align-items-center gap-2 small">
                  <span className="badge rounded-circle p-1" style={{ width: "8px", height: "8px", background: "#ff9f43" }}> </span>
                  <span className="text-muted">ต้นทุนอะไหล่ (Cost)</span>
                </div>

                {/* Year Select */}
                <select
                  className="form-select form-select-sm border-0 bg-light rounded-pill px-3 py-1 fw-semibold"
                  style={{ width: "95px", cursor: "pointer", color: "#7367f0" }}
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>

            <div className="row g-4 align-items-center">
              {/* Dual Bar Chart (Jan - Sep) */}
              <div className="col-12 col-md-8">
                <div className="d-flex align-items-center justify-content-between pt-2 pb-1" style={{ height: "210px" }}>
                  {monthlyData.map((d, idx) => (
                    <div key={idx} className="d-flex flex-column align-items-center h-100 justify-content-center" style={{ width: "30px" }}>
                      {/* Positive Bar (Revenue - Purple) */}
                      <div className="d-flex align-items-end" style={{ height: "90px" }}>
                        <div
                          style={{
                            width: "9px",
                            height: `${(d.earn / 180) * 100}%`,
                            background: "#7367f0",
                            borderRadius: "5px 5px 0 0",
                            transition: "height 0.4s ease",
                          }}
                          title={`รายได้: ฿${d.earn},000`}
                        ></div>
                      </div>

                      {/* Zero Axis */}
                      <div style={{ width: "100%", height: "1px", background: "#f0f0f5" }}></div>

                      {/* Negative Bar (Cost - Orange) */}
                      <div className="d-flex align-items-start" style={{ height: "70px" }}>
                        <div
                          style={{
                            width: "9px",
                            height: `${(d.exp / 100) * 100}%`,
                            background: "#ff9f43",
                            borderRadius: "0 0 5px 5px",
                            transition: "height 0.4s ease",
                          }}
                          title={`ต้นทุนอะไหล่: ฿${d.exp},000`}
                        ></div>
                      </div>

                      {/* Month Label */}
                      <small className="text-muted mt-1" style={{ fontSize: "0.72rem" }}>
                        {d.month}
                      </small>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Budget Side Panel (งบประมาณสต็อกอะไหล่) */}
              <div className="col-12 col-md-4 border-start-md ps-md-4 text-center text-md-start">
                <h3 className="fw-black text-dark mb-1">฿258,520</h3>
                <small className="text-muted d-block mb-3">งบสต็อกอะไหล่ประจำเดือน (คงเหลือ)</small>

                {/* Purple Wavy Sparkline */}
                <div className="mb-3">
                  <svg width="100%" height="45" viewBox="0 0 100 30" fill="none">
                    <path
                      d="M2 20 Q 20 2, 40 18 T 80 5 T 98 12"
                      stroke="#7367f0"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <button
                  type="button"
                  className="btn btn-sm text-white px-3 py-2 fw-semibold rounded-3 shadow-sm w-100 d-flex align-items-center justify-content-center gap-1.5"
                  style={{
                    background: "#7367f0",
                    border: "none",
                    boxShadow: "0 2px 6px rgba(115, 103, 240, 0.4)",
                  }}
                  onClick={() => onNavigateTab && onNavigateTab("parts")}
                >
                  <i className="bi bi-cart-plus-fill"></i>
                  <span>เบิกงบสั่งซื้ออะไหล่เพิ่ม</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* ROW 3: Top Serviced Parts & Customer Service Desk */}
      {/* ======================================================== */}
      <div className="row g-4">
        {/* Table: อะไหล่ & งานบริการยอดนิยมประจำศูนย์ (Top Serviced Parts) */}
        <div className="col-12 col-xl-8 col-lg-7">
          <div
            className="card border-0 p-4 shadow-sm h-100"
            style={{
              borderRadius: "16px",
              background: "#ffffff",
              boxShadow: "0 4px 18px 0 rgba(75, 70, 92, 0.08)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="fw-bold mb-0 text-dark">อะไหล่ &amp; งานบริการยอดนิยม (Top Serviced Parts)</h5>
                <small className="text-muted">รายการอะไหล่มาตรฐานและบริการที่ถูกเบิกใช้สูงสุดประจำศูนย์</small>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-link p-0 text-decoration-none fw-semibold"
                style={{ color: "#7367f0" }}
                onClick={() => onNavigateTab && onNavigateTab("parts")}
              >
                ดูคลังทั้งหมด ({parts.length}) <i className="bi bi-chevron-right ms-1"></i>
              </button>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr className="small text-uppercase text-muted" style={{ letterSpacing: "0.5px", fontSize: "0.72rem" }}>
                    <th scope="col" className="ps-0">รายการอะไหล่ &amp; SKU</th>
                    <th scope="col">หมวดหมู่งานซ่อม</th>
                    <th scope="col">ปริมาณเบิกใช้</th>
                    <th scope="col">ราคาเบิก</th>
                    <th scope="col" className="text-end pe-0">แนวโน้มความต้องการ</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1: Brembo Ceramic Brake Pads */}
                  <tr>
                    <td className="ps-0">
                      <div className="d-flex align-items-center gap-2.5">
                        <div
                          className="rounded-3 d-flex align-items-center justify-content-center"
                          style={{ width: "36px", height: "36px", background: "rgba(255, 159, 67, 0.12)", color: "#ff9f43" }}
                        >
                          <i className="bi bi-disc-fill fs-6"></i>
                        </div>
                        <div>
                          <div className="fw-bold text-dark small">Brembo Ceramic Brake Pads</div>
                          <div className="text-muted" style={{ fontSize: "0.72rem" }}>PART-001 (ผ้าเบรกเซรามิกหน้า-หลัง)</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge rounded-pill px-2.5 py-1 fw-semibold small" style={{ background: "rgba(0, 207, 232, 0.12)", color: "#00cfe8" }}>
                        <i className="bi bi-gear-fill me-1"></i> ช่วงล่าง &amp; ระบบเบรก
                      </span>
                    </td>
                    <td>
                      <div className="fw-bold text-dark small">145 ชุด</div>
                      <div className="text-muted" style={{ fontSize: "0.7rem" }}>เบิกใช้เดือนนี้</div>
                    </td>
                    <td className="fw-bold text-dark small">฿2,682.00</td>
                    <td className="text-end pe-0">
                      <span className="fw-semibold text-success small">
                        98% <i className="bi bi-arrow-up-right ms-0.5"></i>
                      </span>
                    </td>
                  </tr>

                  {/* Row 2: Motul 300V Synthetic Oil */}
                  <tr>
                    <td className="ps-0">
                      <div className="d-flex align-items-center gap-2.5">
                        <div
                          className="rounded-3 d-flex align-items-center justify-content-center"
                          style={{ width: "36px", height: "36px", background: "rgba(40, 199, 111, 0.12)", color: "#28c76f" }}
                        >
                          <i className="bi bi-droplet-fill fs-6"></i>
                        </div>
                        <div>
                          <div className="fw-bold text-dark small">Motul 300V 5W-40 Synthetic</div>
                          <div className="text-muted" style={{ fontSize: "0.72rem" }}>PART-002 (น้ำมันเครื่องสังเคราะห์แท้ 100%)</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge rounded-pill px-2.5 py-1 fw-semibold small" style={{ background: "rgba(115, 103, 240, 0.12)", color: "#7367f0" }}>
                        <i className="bi bi-fuel-pump-fill me-1"></i> ของเหลวเครื่องยนต์
                      </span>
                    </td>
                    <td>
                      <div className="fw-bold text-dark small">98 แกลลอน</div>
                      <div className="text-muted" style={{ fontSize: "0.7rem" }}>งานเช็กระยะประจำ</div>
                    </td>
                    <td className="fw-bold text-dark small">฿3,200.00</td>
                    <td className="text-end pe-0">
                      <span className="fw-semibold text-success small">
                        94% <i className="bi bi-arrow-up-right ms-0.5"></i>
                      </span>
                    </td>
                  </tr>

                  {/* Row 3: Denso Iridium Spark Plugs */}
                  <tr>
                    <td className="ps-0">
                      <div className="d-flex align-items-center gap-2.5">
                        <div
                          className="rounded-3 d-flex align-items-center justify-content-center"
                          style={{ width: "36px", height: "36px", background: "rgba(255, 193, 7, 0.12)", color: "#ffb703" }}
                        >
                          <i className="bi bi-lightning-charge-fill fs-6"></i>
                        </div>
                        <div>
                          <div className="fw-bold text-dark small">Denso Iridium Power Spark Plugs</div>
                          <div className="text-muted" style={{ fontSize: "0.72rem" }}>PART-003 (หัวเทียนประสิทธิภาพสูง)</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge rounded-pill px-2.5 py-1 fw-semibold small" style={{ background: "rgba(255, 159, 67, 0.12)", color: "#ff9f43" }}>
                        <i className="bi bi-cpu-fill me-1"></i> ระบบจุดระเบิด
                      </span>
                    </td>
                    <td>
                      <div className="fw-bold text-dark small">72 ชุด</div>
                      <div className="text-muted" style={{ fontSize: "0.7rem" }}>เพิ่มอัตราเร่ง</div>
                    </td>
                    <td className="fw-bold text-dark small">฿1,850.00</td>
                    <td className="text-end pe-0">
                      <span className="fw-semibold text-success small">
                        89% <i className="bi bi-arrow-up-right ms-0.5"></i>
                      </span>
                    </td>
                  </tr>

                  {/* Row 4: GS Battery Maintenance Free */}
                  <tr>
                    <td className="ps-0">
                      <div className="d-flex align-items-center gap-2.5">
                        <div
                          className="rounded-3 d-flex align-items-center justify-content-center"
                          style={{ width: "36px", height: "36px", background: "rgba(234, 84, 85, 0.12)", color: "#ea5455" }}
                        >
                          <i className="bi bi-battery-charging fs-6"></i>
                        </div>
                        <div>
                          <div className="fw-bold text-dark small">GS Battery MFX-80 Maintenance Free</div>
                          <div className="text-muted" style={{ fontSize: "0.72rem" }}>PART-004 (แบตเตอรี่กึ่งแห้งพร้อมใช้งาน)</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge rounded-pill px-2.5 py-1 fw-semibold small" style={{ background: "rgba(234, 84, 85, 0.12)", color: "#ea5455" }}>
                        <i className="bi bi-battery-full me-1"></i> ระบบไฟฟ้า &amp; สตาร์ต
                      </span>
                    </td>
                    <td>
                      <div className="fw-bold text-dark small">34 ลูก</div>
                      <div className="text-muted" style={{ fontSize: "0.7rem" }}>เปลี่ยนทดแทนด่วน</div>
                    </td>
                    <td className="fw-bold text-dark small">฿2,900.00</td>
                    <td className="text-end pe-0">
                      <span className="fw-semibold text-success small">
                        92% <i className="bi bi-arrow-up-right ms-0.5"></i>
                      </span>
                    </td>
                  </tr>

                  {/* Row 5: Bosch Wiper Blade */}
                  <tr>
                    <td className="ps-0">
                      <div className="d-flex align-items-center gap-2.5">
                        <div
                          className="rounded-3 d-flex align-items-center justify-content-center"
                          style={{ width: "36px", height: "36px", background: "rgba(0, 207, 232, 0.12)", color: "#00cfe8" }}
                        >
                          <i className="bi bi-shield-check fs-6"></i>
                        </div>
                        <div>
                          <div className="fw-bold text-dark small">Bosch Aerotwin Frameless Wipers</div>
                          <div className="text-muted" style={{ fontSize: "0.72rem" }}>PART-005 (ใบปัดน้ำฝนไร้โครง OEM)</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge rounded-pill px-2.5 py-1 fw-semibold small" style={{ background: "rgba(40, 199, 111, 0.12)", color: "#28c76f" }}>
                        <i className="bi bi-tools me-1"></i> อะไหล่สิ้นเปลือง
                      </span>
                    </td>
                    <td>
                      <div className="fw-bold text-dark small">56 คู่</div>
                      <div className="text-muted" style={{ fontSize: "0.7rem" }}>ตรวจเช็กฤดูฝน</div>
                    </td>
                    <td className="fw-bold text-dark small">฿950.00</td>
                    <td className="text-end pe-0">
                      <span className="fw-semibold text-success small">
                        85% <i className="bi bi-arrow-up-right ms-0.5"></i>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Customer Support Desk & Service Reception Card */}
        <div className="col-12 col-xl-4 col-lg-5">
          <div
            className="card border-0 p-4 shadow-sm h-100 position-relative overflow-hidden"
            style={{
              borderRadius: "16px",
              background: "#ffffff",
              boxShadow: "0 4px 18px 0 rgba(75, 70, 92, 0.08)",
            }}
          >
            <div className="d-flex justify-content-between align-items-start mb-1">
              <h5 className="fw-bold text-dark mb-0">ฝ่ายบริการลูกค้า &amp; รับแจ้งซ่อม</h5>
              <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 small">
                ● แอดมินออนไลน์
              </span>
            </div>
            <small className="text-muted d-block mb-3">
              ประเมินราคาซ่อมด่วน ตอบแชทลูกค้า และออกใบสั่งซ่อม Real-time
            </small>

            {/* Garage Support Illustration */}
            <div className="text-center py-2">
              <svg width="220" height="140" viewBox="0 0 200 130" fill="none">
                {/* Desk */}
                <rect x="25" y="85" width="150" height="8" rx="4" fill="#cbd5e1" />
                <rect x="38" y="93" width="8" height="35" rx="3" fill="#94a3b8" />
                <rect x="154" y="93" width="8" height="35" rx="3" fill="#94a3b8" />

                {/* Chair */}
                <rect x="80" y="70" width="40" height="45" rx="6" fill="#e2e8f0" />

                {/* Service Officer Character */}
                <circle cx="100" cy="42" r="14" fill="#fed7aa" />
                <path d="M90 32 C90 22 110 22 110 32 C110 36 106 38 100 38 C94 38 90 36 90 32 Z" fill="#1e293b" />
                {/* Torso (Service Polo Shirt) */}
                <path d="M82 56 C82 50 118 50 118 56 L124 85 L76 85 Z" fill="#7367f0" />
                {/* Laptop on desk */}
                <path d="M68 85 L88 65 L94 65 L88 85 Z" fill="#ff9f43" />
                <rect x="65" y="83" width="35" height="3" rx="1.5" fill="#475569" />

                {/* Vehicle Inspection Clipboard */}
                <rect x="42" y="72" width="16" height="22" rx="2" fill="#ffffff" stroke="#cbd5e1" />
                <line x1="45" y1="78" x2="55" y2="78" stroke="#7367f0" strokeWidth="1.5" />
                <line x1="45" y1="83" x2="53" y2="83" stroke="#28c76f" strokeWidth="1.5" />

                {/* Garage Coffee Mug */}
                <rect x="140" y="76" width="10" height="12" rx="3" fill="#64748b" />
                <circle cx="152" cy="82" r="4" stroke="#64748b" strokeWidth="2" fill="none" />

                {/* Office Plant */}
                <path d="M165 110 L175 110 L173 125 L167 125 Z" fill="#f87171" />
                <path d="M170 110 C162 98 168 88 170 82 C172 88 178 98 170 110 Z" fill="#22c55e" />
              </svg>
            </div>

            <div className="d-flex flex-column gap-2 mt-auto">
              <button
                type="button"
                className="btn btn-sm text-white py-2 fw-semibold rounded-3 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                style={{
                  background: "#7367f0",
                  border: "none",
                  boxShadow: "0 2px 6px rgba(115, 103, 240, 0.35)",
                }}
                onClick={() => onNavigateTab && onNavigateTab("chat")}
              >
                <i className="bi bi-chat-dots-fill"></i>
                <span>เปิดศูนย์ตอบแชทลูกค้า (Live Chat Desk)</span>
              </button>

              <button
                type="button"
                className="btn btn-sm btn-outline-secondary py-2 fw-semibold rounded-3 d-flex align-items-center justify-content-center gap-2"
                onClick={() => onNavigateTab && onNavigateTab("parts")}
              >
                <i className="bi bi-plus-circle"></i>
                <span>จัดการ &amp; เพิ่มอะไหล่สินค้า (Parts)</span>
              </button>

              <button
                type="button"
                className="btn btn-sm btn-outline-primary py-2 fw-semibold rounded-3 d-flex align-items-center justify-content-center gap-2"
                onClick={() => onNavigateTab && onNavigateTab("jobs")}
              >
                <i className="bi bi-receipt"></i>
                <span>ตรวจสอบใบสั่งซ่อม &amp; ใบเสร็จ ({invoices.length})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* ROW 4 (NEW): สถานะช่องซ่อมสดของอู่ (Live Garage Workshop Bays) */}
      {/* ======================================================== */}
      <div className="card border-0 p-4 shadow-sm" style={{ borderRadius: "16px", background: "#ffffff", boxShadow: "0 4px 18px 0 rgba(75, 70, 92, 0.08)" }}>
        <div className="d-flex flex-wrap align-items-center justify-content-between mb-3 gap-2">
          <div>
            <h5 className="fw-bold mb-0 text-dark">
              <i className="bi bi-broadcast text-danger me-2"></i>
              {t("bays_title", "สถานะช่องซ่อมสดประจำศูนย์บริการ (Live Workshop Bays)")}
            </h5>
            <small className="text-muted">
              {lang === "th"
                ? "ตรวจสอบความคืบหน้ารถยนต์ที่อยู่ระหว่างการซ่อมบำรุงในอู่แบบ Real-time"
                : "Monitor real-time progress of vehicles undergoing service in workshop"}
            </small>
          </div>
          <span className="badge rounded-pill px-3 py-1.5 fw-bold" style={{ background: "rgba(115, 103, 240, 0.12)", color: "#7367f0" }}>
            {lang === "th" ? "4 ช่องซ่อมหลัก (Workshop Bays)" : "4 Active Workshop Bays"}
          </span>
        </div>

        <div className="row g-3">
          {/* Bay 1: Toyota Camry */}
          <div className="col-12 col-md-6 col-xl-3">
            <div className="p-3 rounded-3 border bg-light bg-opacity-50 h-100 d-flex flex-column">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="fw-bold text-dark small">{lang === "th" ? "ช่องซ่อม 1 (Bay 01)" : "Bay 01 (Service)"}</span>
                <span className="badge bg-primary bg-opacity-25 text-primary small">
                  {t("bay_status_in_progress", "กำลังซ่อม")}
                </span>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="rounded p-2 text-white" style={{ background: "#7367f0" }}>
                  <i className="bi bi-car-front fs-6"></i>
                </div>
                <div>
                  <div className="fw-bold text-dark small">Toyota Camry 2021</div>
                  <div className="text-muted" style={{ fontSize: "0.72rem" }}>
                    {lang === "th" ? "ทะเบียน 1กก-8821 (Alex)" : "Plate: 1กก-8821 (Alex)"}
                  </div>
                </div>
              </div>
              <div className="text-muted small mb-2" style={{ fontSize: "0.75rem" }}>
                🔧 {lang === "th" ? "เช็กระยะ 40,000 กม. & เปลี่ยนถ่าย Motul 300V" : "40,000 km Service & Motul 300V Oil Change"}
              </div>
              <div className="mt-auto">
                <div className="d-flex justify-content-between small text-muted mb-1" style={{ fontSize: "0.7rem" }}>
                  <span>{lang === "th" ? "ช่างจันทร์ บรรลัยการช่าง (หัวหน้าช่าง)" : "Tech Chan (Master Tech)"}</span>
                  <span className="fw-bold text-primary">85%</span>
                </div>
                <div className="progress" style={{ height: "6px" }}>
                  <div className="progress-bar bg-primary" role="progressbar" style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bay 2: Honda Civic */}
          <div className="col-12 col-md-6 col-xl-3">
            <div className="p-3 rounded-3 border bg-light bg-opacity-50 h-100 d-flex flex-column">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="fw-bold text-dark small">ช่องซ่อม 2 (Bay 02)</span>
                <span className="badge bg-warning bg-opacity-25 text-warning small">รอตรวจ QC</span>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="rounded p-2 text-white" style={{ background: "#ff9f43" }}>
                  <i className="bi bi-car-front fs-6"></i>
                </div>
                <div>
                  <div className="fw-bold text-dark small">Honda Civic 2022</div>
                  <div className="text-muted" style={{ fontSize: "0.72rem" }}>ทะเบียน 5ขข-4490 (Samantha)</div>
                </div>
              </div>
              <div className="text-muted small mb-2" style={{ fontSize: "0.75rem" }}>
                🔧 เปลี่ยนชุดผ้าเบรก Brembo Ceramic &amp; เจียรจาน
              </div>
              <div className="mt-auto">
                <div className="d-flex justify-content-between small text-muted mb-1" style={{ fontSize: "0.7rem" }}>
                  <span>ช่างวิชัย รุ่งโรจน์</span>
                  <span className="fw-bold text-warning">95%</span>
                </div>
                <div className="progress" style={{ height: "6px" }}>
                  <div className="progress-bar bg-warning" role="progressbar" style={{ width: "95%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bay 3: Ford F-150 */}
          <div className="col-12 col-md-6 col-xl-3">
            <div className="p-3 rounded-3 border bg-light bg-opacity-50 h-100 d-flex flex-column">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="fw-bold text-dark small">ช่องซ่อม 3 (Bay 03)</span>
                <span className="badge bg-success bg-opacity-25 text-success small">พร้อมส่งมอบ 🏁</span>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="rounded p-2 text-white" style={{ background: "#28c76f" }}>
                  <i className="bi bi-truck fs-6"></i>
                </div>
                <div>
                  <div className="fw-bold text-dark small">Ford F-150 2020</div>
                  <div className="text-muted" style={{ fontSize: "0.72rem" }}>ทะเบียน 9ฮฮ-1200 (David Kim)</div>
                </div>
              </div>
              <div className="text-muted small mb-2" style={{ fontSize: "0.75rem" }}>
                🔧 ตรวจเช็กระบบไฟ &amp; เปลี่ยนแบตเตอรี่ GS MFX-80
              </div>
              <div className="mt-auto">
                <div className="d-flex justify-content-between small text-muted mb-1" style={{ fontSize: "0.7rem" }}>
                  <span>ช่างธีระ ยอดทอง</span>
                  <span className="fw-bold text-success">100%</span>
                </div>
                <div className="progress" style={{ height: "6px" }}>
                  <div className="progress-bar bg-success" role="progressbar" style={{ width: "100%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bay 4: Quick Fit Bay */}
          <div className="col-12 col-md-6 col-xl-3">
            <div className="p-3 rounded-3 border bg-light bg-opacity-50 h-100 d-flex flex-column">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="fw-bold text-dark small">ช่องซ่อมด่วน (Quick Bay)</span>
                <span className="badge bg-info bg-opacity-25 text-info small">ว่าง (Available) 🟢</span>
              </div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <div className="rounded p-2 text-white" style={{ background: "#00cfe8" }}>
                  <i className="bi bi-tools fs-6"></i>
                </div>
                <div>
                  <div className="fw-bold text-dark small">ช่องซ่อมเร่งด่วน</div>
                  <div className="text-muted" style={{ fontSize: "0.72rem" }}>Fast-Fit &amp; Tire Service</div>
                </div>
              </div>
              <div className="text-muted small mb-2" style={{ fontSize: "0.75rem" }}>
                ⚡ พร้อมรับรถเช็กระยะเร่งด่วน / สลับยางถ่วงล้อทันที
              </div>
              <div className="mt-auto pt-2">
                <button
                  type="button"
                  className="btn btn-outline-info btn-sm w-100 rounded-pill py-1 fw-semibold small"
                  onClick={() => onNavigateTab && onNavigateTab("chat")}
                >
                  + รับรถเข้าซ่อมช่องนี้
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
