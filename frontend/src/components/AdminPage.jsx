"use client";

import { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";
import AdminPortal from "./AdminPortal";
import AdminVuexyDashboard from "./AdminVuexyDashboard";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";

export default function AdminPage({
  apiUrl = "http://localhost:8000",
  parts = [],
  vehicles = [],
  customers = [],
  invoices = [],
  onRefresh,
  onBackToCustomerSite,
  initialTab = "dashboard",
  initialConvId = "CUST-001",
  contactSubmission = null,
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return !!sessionStorage.getItem("garage_admin_token");
    }
    return false;
  });

  const [adminName, setAdminName] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("garage_admin_name") || "John Doe";
    }
    return "John Doe";
  });

  // Active view tab: 'dashboard' | 'parts' | 'chat' | 'jobs' | 'customers'
  const [activeTab, setActiveTab] = useState(initialTab || "dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const { lang, t } = useLanguage();

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setAdminName(userData.name || "John Doe");
  };

  const handleLogout = () => {
    if (window.confirm(t("confirm_logout", "คุณต้องการออกจากระบบผู้ดูแลระบบใช่หรือไม่?"))) {
      sessionStorage.removeItem("garage_admin_token");
      sessionStorage.removeItem("garage_admin_name");
      sessionStorage.removeItem("garage_admin_role");
      setIsAuthenticated(false);
    }
  };

  // If not logged in, render dedicated Login Portal
  if (!isAuthenticated) {
    return (
      <AdminLogin
        apiUrl={apiUrl}
        onLoginSuccess={handleLoginSuccess}
        onBackToSite={onBackToCustomerSite}
      />
    );
  }

  // Calculate quick notification counts
  const lowStockCount = parts.filter((p) => (p.stock_qty || 0) < 5).length;
  const pendingInvoices = invoices.filter((i) => i.payment_status === "PENDING").length;

  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      icon: "bi-exclamation-triangle-fill text-warning",
      bgClass: "bg-warning bg-opacity-10",
      titleKey: "notif_low_stock_title",
      descKey: "notif_low_stock_desc",
      time: "10m",
      tab: "parts",
      isRead: false,
    },
    {
      id: "notif-2",
      icon: "bi-chat-dots-fill text-primary",
      bgClass: "bg-primary bg-opacity-10",
      titleKey: "notif_chat_title",
      descKey: "notif_chat_desc",
      time: "25m",
      tab: "chat",
      isRead: false,
    },
    {
      id: "notif-3",
      icon: "bi-receipt text-danger",
      bgClass: "bg-danger bg-opacity-10",
      titleKey: "notif_invoice_title",
      descKey: "notif_invoice_desc",
      time: "1h",
      tab: "jobs",
      isRead: false,
    },
    {
      id: "notif-4",
      icon: "bi-check-circle-fill text-success",
      bgClass: "bg-success bg-opacity-10",
      titleKey: "notif_ready_title",
      descKey: "notif_ready_desc",
      time: "2h",
      tab: "jobs",
      isRead: false,
    },
  ]);

  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationClick = (notif) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
    );
    setActiveTab(notif.tab);
    setShowNotifMenu(false);
  };

  const handleMarkAllNotifsRead = (e) => {
    e.stopPropagation();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div
      className="d-flex min-vh-100 position-relative"
      style={{
        background: "#f8f7fa",
        color: "#5d596c",
        fontFamily: "'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* ======================================================== */}
      {/* 1. LEFT SIDEBAR (VUEXY / MATERIO STYLE) */}
      {/* ======================================================== */}
      <aside
        className={`bg-white border-end d-flex flex-column transition-all shadow-sm ${
          mobileSidebarOpen
            ? "position-fixed top-0 start-0 vh-100 d-flex"
            : "d-none d-lg-flex position-sticky top-0"
        }`}
        style={{
          width: sidebarCollapsed ? "84px" : "260px",
          minWidth: sidebarCollapsed ? "84px" : "260px",
          flexShrink: 0,
          height: "100vh",
          zIndex: 1045,
          borderColor: "rgba(75, 70, 92, 0.08)",
          transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowX: "hidden",
        }}
      >
        {/* Brand Header */}
        <div
          className="d-flex align-items-center justify-content-between px-3 py-3 border-bottom"
          style={{ height: "64px", borderColor: "rgba(75, 70, 92, 0.06)" }}
        >
          <div
            className="d-flex align-items-center gap-2 cursor-pointer overflow-hidden"
            onClick={() => setActiveTab("dashboard")}
            style={{ cursor: "pointer" }}
            title="Vuexy Dashboard"
          >
            {/* Vuexy Purple Logo Mark */}
            <div
              className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
              style={{
                width: "36px",
                height: "36px",
                background: "linear-gradient(135deg, #7367f0 0%, #9055fd 100%)",
                color: "#ffffff",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  fill="white"
                  fillOpacity="0.9"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {!sidebarCollapsed && (
              <div className="d-flex align-items-baseline gap-1.5">
                <span className="fw-black fs-4 tracking-tight" style={{ color: "#5d596c", letterSpacing: "-0.5px" }}>
                  Car<span style={{ color: "#7367f0" }}>Garage</span>
                </span>
                <span
                  className="badge rounded-pill fw-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #7367f0 0%, #9055fd 100%)",
                    fontSize: "0.62rem",
                    padding: "2px 6px",
                  }}
                >
                  PRO
                </span>
              </div>
            )}
          </div>

          {/* Pin/Collapse Button (Desktop) & Close Button (Mobile) */}
          <div className="d-flex align-items-center">
            {/* Desktop Pin Toggle */}
            <button
              type="button"
              className="btn btn-sm p-1 text-muted d-none d-lg-flex align-items-center justify-content-center rounded-circle"
              style={{ width: "26px", height: "26px", border: "none" }}
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title={sidebarCollapsed ? "ขยายเมนู (Expand)" : "ย่อเมนู (Collapse)"}
            >
              <i
                className={`bi ${
                  sidebarCollapsed ? "bi-record-circle text-primary" : "bi-disc text-primary"
                } fs-6`}
                style={{ color: "#7367f0 !important" }}
              ></i>
            </button>

            {/* Mobile Close Button */}
            <button
              type="button"
              className="btn btn-sm btn-link text-muted d-lg-none p-1"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <i className="bi bi-x-lg fs-5"></i>
            </button>
          </div>
        </div>

        {/* Sidebar Nav Items List */}
        <div className="flex-grow-1 overflow-y-auto py-3 px-2 d-flex flex-column gap-1" style={{ fontSize: "0.88rem" }}>
          {/* Section: MAIN DASHBOARD */}
          {!sidebarCollapsed && (
            <div className="px-3 pt-2 pb-1 text-uppercase fw-bold text-muted" style={{ fontSize: "0.68rem", letterSpacing: "0.8px" }}>
              {t("main_menu", "เมนูหลักศูนย์บริการ")}
            </div>
          )}

          {/* Nav Item: ภาพรวมศูนย์บริการ (Garage Overview) */}
          <button
            type="button"
            className={`btn text-start border-0 rounded-3 py-2 px-3 d-flex align-items-center gap-3 transition-all ${
              activeTab === "dashboard" ? "fw-bold text-white shadow-sm" : "text-muted hover-bg-light"
            }`}
            style={{
              background:
                activeTab === "dashboard"
                  ? "linear-gradient(72.47deg, rgb(115, 103, 240) 22.16%, rgba(115, 103, 240, 0.7) 76.47%)"
                  : "transparent",
              color: activeTab === "dashboard" ? "#ffffff" : "#5d596c",
              boxShadow: activeTab === "dashboard" ? "0 2px 6px rgba(115, 103, 240, 0.48)" : "none",
            }}
            onClick={() => setActiveTab("dashboard")}
            title={t("garage_overview", "ภาพรวมศูนย์บริการและอู่ซ่อม (Garage Overview)")}
          >
            <i className="bi bi-speedometer2 fs-5" style={{ minWidth: "22px" }}></i>
            {!sidebarCollapsed && (
              <div className="d-flex align-items-center justify-content-between flex-grow-1">
                <span>{t("garage_overview", "ภาพรวมศูนย์บริการ")}</span>
                <span
                  className="badge rounded-pill"
                  style={{
                    background: activeTab === "dashboard" ? "rgba(255,255,255,0.25)" : "#7367f0",
                    color: "#ffffff",
                    fontSize: "0.68rem",
                  }}
                >
                  LIVE
                </span>
              </div>
            )}
          </button>

          {/* Section: GARAGE OPERATIONS */}
          {!sidebarCollapsed && (
            <div className="px-3 pt-3 pb-1 text-uppercase fw-bold text-muted" style={{ fontSize: "0.68rem", letterSpacing: "0.8px" }}>
              {t("garage_operations", "งานบริการ & คลังอู่")}
            </div>
          )}

          {/* Nav Item: Parts / Products */}
          <button
            type="button"
            className={`btn text-start border-0 rounded-3 py-2 px-3 d-flex align-items-center gap-3 transition-all ${
              activeTab === "parts" ? "fw-bold text-white shadow-sm" : "text-muted hover-bg-light"
            }`}
            style={{
              background:
                activeTab === "parts"
                  ? "linear-gradient(72.47deg, rgb(115, 103, 240) 22.16%, rgba(115, 103, 240, 0.7) 76.47%)"
                  : "transparent",
              color: activeTab === "parts" ? "#ffffff" : "#5d596c",
              boxShadow: activeTab === "parts" ? "0 2px 6px rgba(115, 103, 240, 0.48)" : "none",
            }}
            onClick={() => setActiveTab("parts")}
            title={t("parts_inventory", "จัดการอะไหล่ & คลังสินค้า")}
          >
            <i className="bi bi-box-seam fs-5" style={{ minWidth: "22px" }}></i>
            {!sidebarCollapsed && (
              <div className="d-flex align-items-center justify-content-between flex-grow-1">
                <span>{t("parts_inventory", "คลังอะไหล่ (Parts)")}</span>
                <span className="badge bg-secondary bg-opacity-25 text-dark rounded-pill" style={{ fontSize: "0.7rem" }}>
                  {parts.length}
                </span>
              </div>
            )}
          </button>

          {/* Nav Item: Chat / Support Desk */}
          <button
            type="button"
            className={`btn text-start border-0 rounded-3 py-2 px-3 d-flex align-items-center gap-3 transition-all ${
              activeTab === "chat" ? "fw-bold text-white shadow-sm" : "text-muted hover-bg-light"
            }`}
            style={{
              background:
                activeTab === "chat"
                  ? "linear-gradient(72.47deg, rgb(115, 103, 240) 22.16%, rgba(115, 103, 240, 0.7) 76.47%)"
                  : "transparent",
              color: activeTab === "chat" ? "#ffffff" : "#5d596c",
              boxShadow: activeTab === "chat" ? "0 2px 6px rgba(115, 103, 240, 0.48)" : "none",
            }}
            onClick={() => setActiveTab("chat")}
            title={t("live_chat", "ศูนย์ตอบแชทลูกค้า (Live Chat Desk)")}
          >
            <i className="bi bi-chat-dots-fill fs-5" style={{ minWidth: "22px" }}></i>
            {!sidebarCollapsed && (
              <div className="d-flex align-items-center justify-content-between flex-grow-1">
                <span>{t("live_chat", "แชทลูกค้า (Live Chat)")}</span>
                <span
                  className="badge rounded-pill fw-bold"
                  style={{
                    background: activeTab === "chat" ? "rgba(255,255,255,0.25)" : "#28c76f",
                    color: "#ffffff",
                    fontSize: "0.68rem",
                  }}
                >
                  LIVE
                </span>
              </div>
            )}
          </button>

          {/* Nav Item: Invoices / Orders */}
          <button
            type="button"
            className={`btn text-start border-0 rounded-3 py-2 px-3 d-flex align-items-center gap-3 transition-all ${
              activeTab === "jobs" ? "fw-bold text-white shadow-sm" : "text-muted hover-bg-light"
            }`}
            style={{
              background:
                activeTab === "jobs"
                  ? "linear-gradient(72.47deg, rgb(115, 103, 240) 22.16%, rgba(115, 103, 240, 0.7) 76.47%)"
                  : "transparent",
              color: activeTab === "jobs" ? "#ffffff" : "#5d596c",
              boxShadow: activeTab === "jobs" ? "0 2px 6px rgba(115, 103, 240, 0.48)" : "none",
            }}
            onClick={() => setActiveTab("jobs")}
            title={t("repair_orders_invoices", "ใบสั่งซ่อม & ใบแจ้งหนี้")}
          >
            <i className="bi bi-receipt-cutoff fs-5" style={{ minWidth: "22px" }}></i>
            {!sidebarCollapsed && (
              <div className="d-flex align-items-center justify-content-between flex-grow-1">
                <span>{t("repair_orders_invoices", "ใบสั่งซ่อม & ใบแจ้งหนี้")}</span>
                <span className="badge bg-secondary bg-opacity-25 text-dark rounded-pill" style={{ fontSize: "0.7rem" }}>
                  {invoices.length}
                </span>
              </div>
            )}
          </button>

          {/* Section: SYSTEM ACTIONS */}
          {!sidebarCollapsed && (
            <div className="px-3 pt-3 pb-1 text-uppercase fw-bold text-muted" style={{ fontSize: "0.68rem", letterSpacing: "0.8px" }}>
              {t("brand_sub", "ระบบ & เว็บไซต์")}
            </div>
          )}

          {/* Public Garage Site */}
          <button
            type="button"
            className="btn text-start border-0 rounded-3 py-2 px-3 d-flex align-items-center gap-3 text-muted hover-bg-light"
            style={{ color: "#5d596c" }}
            onClick={onBackToCustomerSite}
            title={t("view_customer_site", "ดูหน้าเว็บศูนย์บริการสำหรับลูกค้า")}
          >
            <i className="bi bi-box-arrow-up-right fs-5 text-primary" style={{ minWidth: "22px", color: "#7367f0 !important" }}></i>
            {!sidebarCollapsed && <span>{t("view_customer_site", "ดูหน้าเว็บลูกค้า")}</span>}
          </button>

          {/* Logout */}
          <button
            type="button"
            className="btn text-start border-0 rounded-3 py-2 px-3 d-flex align-items-center gap-3 text-danger hover-bg-light mt-auto"
            onClick={handleLogout}
            title={t("logout", "ออกจากระบบแอดมิน")}
          >
            <i className="bi bi-box-arrow-right fs-5" style={{ minWidth: "22px" }}></i>
            {!sidebarCollapsed && <span>{t("logout", "ออกจากระบบ")}</span>}
          </button>
        </div>

        {/* Sidebar Footer Mini Profile */}
        {!sidebarCollapsed && (
          <div className="p-3 border-top bg-light bg-opacity-50 d-flex align-items-center justify-content-between" style={{ borderColor: "rgba(75, 70, 92, 0.08)" }}>
            <div className="d-flex align-items-center gap-2">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white position-relative"
                style={{ width: "34px", height: "34px", background: "#7367f0", fontSize: "0.85rem" }}
              >
                JD
                <span
                  className="position-absolute bottom-0 end-0 rounded-circle border border-white"
                  style={{ width: "8px", height: "8px", background: "#28c76f" }}
                ></span>
              </div>
              <div className="lh-sm">
                <div className="fw-bold text-dark small">{adminName}</div>
                <div className="text-muted" style={{ fontSize: "0.72rem" }}>Admin Center</div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-link text-muted p-0"
              onClick={handleLogout}
              title="ออกจากระบบ"
            >
              <i className="bi bi-power fs-5"></i>
            </button>
          </div>
        )}
      </aside>

      {/* Backdrop for Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 vh-100 bg-dark bg-opacity-50 d-lg-none"
          style={{ zIndex: 1040 }}
          onClick={() => setMobileSidebarOpen(false)}
        ></div>
      )}

      {/* ======================================================== */}
      {/* 2. MAIN CONTENT AREA (FLOATING TOPBAR + BODY + FOOTER) */}
      {/* ======================================================== */}
      <div className="flex-grow-1 d-flex flex-column min-vh-100 overflow-x-hidden" style={{ minWidth: 0 }}>
        {/* Floating Top Navbar (Vuexy Style) */}
        <header className="px-3 px-lg-4 pt-3 pb-2 sticky-top" style={{ zIndex: 1020 }}>
          <div
            className="bg-white rounded-3 px-3 py-2.5 d-flex align-items-center justify-content-between shadow-sm"
            style={{
              boxShadow: "0 4px 18px 0 rgba(75, 70, 92, 0.08)",
              borderRadius: "10px",
              border: "1px solid rgba(75, 70, 92, 0.04)",
            }}
          >
            {/* Left: Mobile Toggle + Search Bar */}
            <div className="d-flex align-items-center gap-2 flex-grow-1" style={{ maxWidth: "460px" }}>
              <button
                type="button"
                className="btn btn-sm btn-light border-0 d-lg-none p-1 text-muted"
                onClick={() => setMobileSidebarOpen(true)}
              >
                <i className="bi bi-list fs-4"></i>
              </button>

              <div
                className="d-flex align-items-center gap-2 px-3 py-1.5 rounded-3 w-100"
                style={{
                  background: "#f5f5f9",
                  border: "1px solid rgba(75, 70, 92, 0.08)",
                }}
              >
                <i className="bi bi-search text-muted fs-6"></i>
                <input
                  type="text"
                  className="form-control border-0 shadow-none p-0 text-dark bg-transparent"
                  style={{ fontSize: "0.85rem" }}
                  placeholder={t("search_placeholder", "ค้นหาอะไหล่, ทะเบียนรถ, ใบสั่งซ่อม...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Right: Quick Action Icons & John Doe Profile */}
            <div className="d-flex align-items-center gap-2 gap-sm-3">
              {/* Bilingual Language Switcher (TH / EN) */}
              <LanguageSwitcher variant="admin" />

              {/* Notification Bell with Dynamic Count Badge */}
              <div className="position-relative">
                <button
                  type="button"
                  className="btn btn-sm btn-link text-muted p-1 position-relative"
                  onClick={() => setShowNotifMenu(!showNotifMenu)}
                  title={`${t("notifications", "การแจ้งเตือนระบบ")} (${unreadNotifsCount})`}
                >
                  <i className="bi bi-bell fs-5"></i>
                  {unreadNotifsCount > 0 && (
                    <span
                      className="position-absolute top-0 end-0 badge rounded-circle p-1"
                      style={{
                        background: "#ea5455",
                        width: "18px",
                        height: "18px",
                        fontSize: "0.65rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {unreadNotifsCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifMenu && (
                  <div
                    className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg border animate-fade-in"
                    style={{
                      width: "320px",
                      zIndex: 1050,
                      borderColor: "rgba(75, 70, 92, 0.1)",
                      boxShadow: "0 10px 30px rgba(75, 70, 92, 0.15)",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                      <div className="d-flex align-items-center gap-2">
                        <h6 className="fw-bold mb-0 text-dark">{t("notification_title", "Notification")}</h6>
                        {unreadNotifsCount > 0 ? (
                          <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill">
                            {unreadNotifsCount} {t("new_notif", "New")}
                          </span>
                        ) : (
                          <span className="badge bg-success bg-opacity-10 text-success rounded-pill">
                            {t("all_read", "อ่านครบแล้ว")}
                          </span>
                        )}
                      </div>
                      {unreadNotifsCount > 0 && (
                        <button
                          type="button"
                          className="btn btn-sm btn-link p-0 text-decoration-none small"
                          style={{ fontSize: "0.75rem", color: "#7367f0" }}
                          onClick={handleMarkAllNotifsRead}
                        >
                          {t("mark_all_read", "อ่านทั้งหมด")}
                        </button>
                      )}
                    </div>

                    <div className="p-2 d-flex flex-column gap-1.5" style={{ maxHeight: "360px", overflowY: "auto" }}>
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-2.5 rounded-3 d-flex align-items-start gap-2.5 transition-all ${
                            notif.isRead
                              ? "bg-white opacity-75"
                              : "bg-light border-start border-3 border-primary"
                          }`}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleNotificationClick(notif)}
                        >
                          <div
                            className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ${notif.bgClass}`}
                            style={{ width: "32px", height: "32px", fontSize: "0.95rem" }}
                          >
                            <i className={`bi ${notif.icon}`}></i>
                          </div>
                          <div className="flex-grow-1 min-w-0">
                            <div className="d-flex justify-content-between align-items-center mb-0.5">
                              <span className={`small ${notif.isRead ? "text-secondary" : "fw-bold text-dark"}`}>
                                {t(notif.titleKey, notif.titleKey)}
                              </span>
                              <span className="text-muted" style={{ fontSize: "0.68rem" }}>
                                {notif.time}
                              </span>
                            </div>
                            <div className="text-muted text-truncate" style={{ fontSize: "0.75rem" }}>
                              {t(notif.descKey, notif.descKey)}
                            </div>
                          </div>
                          {!notif.isRead && (
                            <span
                              className="rounded-circle bg-danger mt-1.5 flex-shrink-0"
                              style={{ width: "7px", height: "7px" }}
                            ></span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar: John Doe with Online Indicator */}
              <div className="position-relative ms-1">
                <div
                  className="d-flex align-items-center gap-2 cursor-pointer p-1 rounded-pill"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="rounded-circle position-relative d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                    style={{
                      width: "38px",
                      height: "38px",
                      background: "linear-gradient(135deg, #7367f0 0%, #5e50ee 100%)",
                      fontSize: "0.9rem",
                    }}
                  >
                    JD
                    <span
                      className="position-absolute bottom-0 end-0 rounded-circle border border-2 border-white"
                      style={{
                        width: "10px",
                        height: "10px",
                        background: "#28c76f",
                      }}
                    ></span>
                  </div>

                  <div className="d-none d-md-block text-start lh-sm">
                    <div className="fw-bold text-dark small">{adminName}</div>
                    <div className="text-muted" style={{ fontSize: "0.72rem" }}>Admin</div>
                  </div>
                </div>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div
                    className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg p-2 border animate-fade-in"
                    style={{ width: "220px", zIndex: 1050, borderColor: "rgba(75, 70, 92, 0.1)" }}
                  >
                    <div className="p-2 border-bottom mb-1">
                      <div className="fw-bold text-dark">{adminName}</div>
                      <div className="text-muted small">admin@garage.pro</div>
                    </div>
                    <button
                      className="btn btn-sm text-start w-100 py-1.5 px-2 text-muted hover-bg-light rounded"
                      onClick={() => { setActiveTab("dashboard"); setShowProfileMenu(false); }}
                    >
                      <i className="bi bi-person me-2"></i> โปรไฟล์ของฉัน
                    </button>
                    <button
                      className="btn btn-sm text-start w-100 py-1.5 px-2 text-muted hover-bg-light rounded"
                      onClick={() => { setActiveTab("parts"); setShowProfileMenu(false); }}
                    >
                      <i className="bi bi-gear me-2"></i> ตั้งค่าระบบอะไหล่
                    </button>
                    <button
                      className="btn btn-sm text-start w-100 py-1.5 px-2 text-muted hover-bg-light rounded"
                      onClick={() => { onBackToCustomerSite(); setShowProfileMenu(false); }}
                    >
                      <i className="bi bi-box-arrow-up-right me-2"></i> หน้าเว็บลูกค้า
                    </button>
                    <hr className="my-1" />
                    <button
                      className="btn btn-sm text-start w-100 py-1.5 px-2 text-danger hover-bg-light rounded"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i> ออกจากระบบ
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-grow-1 px-3 px-lg-4 py-3">
          {/* TAB 1: VUEXY DASHBOARD (Matches User's Screenshot Exactly) */}
          {activeTab === "dashboard" && (
            <AdminVuexyDashboard
              parts={parts}
              vehicles={vehicles}
              customers={customers}
              invoices={invoices}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {/* TAB 2: PARTS CATALOG & INVENTORY MANAGEMENT */}
          {activeTab === "parts" && (
            <AdminPortal
              parts={parts}
              vehicles={vehicles}
              customers={customers}
              invoices={invoices}
              onRefresh={onRefresh}
              apiUrl={apiUrl}
              activeTabOverride="parts"
              onTabChange={(tab) => setActiveTab(tab)}
              hideBanner={true}
              hideTabs={false}
              initialConvId={initialConvId}
              contactSubmission={contactSubmission}
            />
          )}

          {/* TAB 3: LIVE CUSTOMER CHAT DESK */}
          {activeTab === "chat" && (
            <AdminPortal
              parts={parts}
              vehicles={vehicles}
              customers={customers}
              invoices={invoices}
              onRefresh={onRefresh}
              apiUrl={apiUrl}
              activeTabOverride="chat"
              onTabChange={(tab) => setActiveTab(tab)}
              hideBanner={true}
              hideTabs={false}
              initialConvId={initialConvId}
              contactSubmission={contactSubmission}
            />
          )}

          {/* TAB 4: INVOICES & REPAIR JOBS */}
          {activeTab === "jobs" && (
            <AdminPortal
              parts={parts}
              vehicles={vehicles}
              customers={customers}
              invoices={invoices}
              onRefresh={onRefresh}
              apiUrl={apiUrl}
              activeTabOverride="jobs"
              onTabChange={(tab) => setActiveTab(tab)}
              hideBanner={true}
              hideTabs={false}
              initialConvId={initialConvId}
              contactSubmission={contactSubmission}
            />
          )}
        </main>
      </div>
    </div>
  );
}
