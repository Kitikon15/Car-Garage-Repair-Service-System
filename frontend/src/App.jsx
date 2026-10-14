
import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StatsCards from "./components/StatsCards";
import PartsInventory from "./components/PartsInventory";
import CreateServiceJob from "./components/CreateServiceJob";
import InvoiceList from "./components/InvoiceList";
import InvoiceModal from "./components/InvoiceModal";
import RegisterModal from "./components/RegisterModal";
import OrderCatalog from "./components/OrderCatalog";
import VehicleSearch from "./components/VehicleSearch";
import CartView from "./components/CartView";
import ContactSales from "./components/ContactSales";
import GarageBuilder from "./components/GarageBuilder";
import PromoBannerCarousel from "./components/PromoBannerCarousel";
import ProductImage from "./components/ProductImage";
import AdminPage from "./components/AdminPage";
import CustomerChatWidget from "./components/CustomerChatWidget";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Dashboard() {
  const { lang } = useLanguage ? useLanguage() : { lang: "th" };
  const isTh = lang !== "en";

  // เมนูแท็บ: 'dashboard' | 'vehicleSearch' | 'order' | 'parts' | 'jobs' | 'contact' | 'cart'
  const [activeTab, setActiveTab] = useState("dashboard");
  // โหมดการทำงานในหน้างานซ่อม: 'estimator' (ฟังชั่นประเมินราคา) | 'form' | 'invoices'
  const [jobsSubTab, setJobsSubTab] = useState("estimator");

  // ตรวจสอบเส้นทาง URL ว่าเป็นหน้าแอดมิน (/admin) หรือไม่
  const checkIsAdminUrl = () => {
    if (typeof window === "undefined") return false;
    return (
      window.location.pathname === "/admin" ||
      window.location.pathname.startsWith("/admin/") ||
      window.location.search.includes("page=admin") ||
      window.location.hash === "#/admin" ||
      window.location.hash.startsWith("#/admin")
    );
  };

  const [isPageAdmin, setIsPageAdmin] = useState(checkIsAdminUrl);

  useEffect(() => {
    const handleLocationChange = () => {
      setIsPageAdmin(checkIsAdminUrl());
    };
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  const [adminInitialTab, setAdminInitialTab] = useState(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("tab") || sessionStorage.getItem("garage_admin_tab") || "parts";
    }
    return "parts";
  });

  const [adminInitialConvId, setAdminInitialConvId] = useState(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("conv") || sessionStorage.getItem("garage_admin_conv") || "CUST-001";
    }
    return "CUST-001";
  });

  const [lastContactSubmission, setLastContactSubmission] = useState(null);

  const navigateToAdmin = (tab = "parts", convId = "CUST-001") => {
    const url = tab === "chat" ? `/admin?tab=chat&conv=${convId}` : "/admin";
    window.history.pushState({}, "", url);
    setAdminInitialTab(tab);
    setAdminInitialConvId(convId);
    setIsPageAdmin(true);
    window.scrollTo(0, 0);
  };

  const handleGoToAdminChat = (convId = "CUST-GUEST", contactInfo = null) => {
    window.history.pushState({}, "", `/admin?tab=chat&conv=${convId}`);
    setAdminInitialTab("chat");
    setAdminInitialConvId(convId);
    if (contactInfo) {
      setLastContactSubmission(contactInfo);
    }
    setIsPageAdmin(true);
    window.scrollTo(0, 0);
  };

  const navigateToCustomerSite = () => {
    window.history.pushState({}, "", "/");
    setIsPageAdmin(false);
    window.scrollTo(0, 0);
  };

  // ตัวกรองเมื่อเลือกจาก Carousel หน้าแรก
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState("all");
  const [selectedSearchBrand, setSelectedSearchBrand] = useState("Toyota");

  // ระบบเลือกธีมสีและโหมดขาวดำ (Multi-Theme System & B&W Mode)
  const [currentTheme, setCurrentTheme] = useState("red-white"); // 'red-white' | 'cyber' | 'racing' | 'monochrome'
  const [isBWMode, setIsBWMode] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("garage_active_theme");
      const savedBW = localStorage.getItem("garage_bw_mode");
      if (savedTheme) {
        setCurrentTheme(savedTheme);
        document.body.setAttribute("data-garage-theme", savedTheme);
        if (savedTheme === "monochrome" || savedBW === "true") {
          setIsBWMode(true);
          document.body.classList.add("mode-bw");
        }
      } else {
        // ค่าเริ่มต้น Red & White
        document.body.setAttribute("data-garage-theme", "red-white");
        if (savedBW === "true") {
          setIsBWMode(true);
          setCurrentTheme("monochrome");
          document.body.setAttribute("data-garage-theme", "monochrome");
          document.body.classList.add("mode-bw");
        }
      }
    } catch (e) {
      console.warn("localStorage error:", e);
    }
  }, []);

  const handleSelectTheme = (themeName) => {
    setCurrentTheme(themeName);
    document.body.setAttribute("data-garage-theme", themeName);
    try {
      localStorage.setItem("garage_active_theme", themeName);
    } catch (e) {}

    if (themeName === "monochrome") {
      setIsBWMode(true);
      document.body.classList.add("mode-bw");
      try { localStorage.setItem("garage_bw_mode", "true"); } catch (e) {}
    } else {
      setIsBWMode(false);
      document.body.classList.remove("mode-bw");
      try { localStorage.setItem("garage_bw_mode", "false"); } catch (e) {}
    }
  };

  const toggleBWMode = () => {
    if (isBWMode) {
      // สลับกลับเป็นโหมดสี (ถ้าเดิมเคยเป็น red-white, cyber, racing ให้กลับไป หรือ default เป็น red-white)
      const prevColorTheme = currentTheme === "monochrome" ? "red-white" : currentTheme;
      handleSelectTheme(prevColorTheme);
    } else {
      // สลับเป็นโหมดขาวดำ
      handleSelectTheme("monochrome");
    }
  };

  const [apiOnline, setApiOnline] = useState(false);
  const [stats, setStats] = useState(null);
  const [parts, setParts] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);
  
  // สถานะค้นหาจากแถบ Header
  const [headerSearchQuery, setHeaderSearchQuery] = useState("");

  // สถานะตะกร้าสินค้าอะไหล่
  const [cart, setCart] = useState([]);

  // สถานะเปิด/ปิด Modal
  const [activeInvoice, setActiveInvoice] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [lastCreatedMessage, setLastCreatedMessage] = useState("");

  // สถานะลูกค้าที่เข้าสู่ระบบ / ลงทะเบียนแล้ว
  const [currentCustomer, setCurrentCustomer] = useState(() => {
    try {
      const saved = localStorage.getItem("garage_registered_customer");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // สินค้าที่รอเพิ่มลงในตะกร้าหลังจากลงทะเบียนสำเร็จ
  const [pendingCartItem, setPendingCartItem] = useState(null);

  const handleRegisterSuccess = (customerData) => {
    setCurrentCustomer(customerData);
    try {
      localStorage.setItem("garage_registered_customer", JSON.stringify(customerData));
    } catch (e) {
      console.warn("localStorage error:", e);
    }

    if (pendingCartItem) {
      const { part, qty } = pendingCartItem;
      setCart((prev) => {
        const existing = prev.find((item) => item.part_id === part.part_id);
        if (existing) {
          return prev.map((item) =>
            item.part_id === part.part_id
              ? { ...item, quantity: Math.min(part.stock_qty, item.quantity + qty) }
              : item
          );
        }
        return [
          ...prev,
          {
            part_id: part.part_id,
            part_name: part.part_name,
            price: part.price,
            quantity: qty,
            stock_qty: part.stock_qty,
          },
        ];
      });
      setLastCreatedMessage(
        isTh
          ? `ลงทะเบียนสำเร็จ! เพิ่ม "${pendingCartItem.part.part_name}" (${pendingCartItem.qty} ชิ้น) ลงในตะกร้าเรียบร้อยแล้ว`
          : `Registration successful! Added "${pendingCartItem.part.part_name}" (${pendingCartItem.qty} pcs) to your cart.`
      );
      setPendingCartItem(null);
    }
    fetchData();
  };

  const handleLogoutCustomer = () => {
    setCurrentCustomer(null);
    try {
      localStorage.removeItem("garage_registered_customer");
    } catch (e) {}
  };

  const fetchData = useCallback(async () => {
    try {
      const [statsRes, partsRes, vehiclesRes, customersRes, invoicesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/stats`),
        fetch(`${API_BASE_URL}/api/parts`),
        fetch(`${API_BASE_URL}/api/vehicles`),
        fetch(`${API_BASE_URL}/api/customers`),
        fetch(`${API_BASE_URL}/api/invoices`),
      ]);

      if (statsRes.ok) {
        setApiOnline(true);
        setStats(await statsRes.json());
      }
      if (partsRes.ok) setParts(await partsRes.json());
      if (vehiclesRes.ok) setVehicles(await vehiclesRes.json());
      if (customersRes.ok) setCustomers(await customersRes.json());
      if (invoicesRes.ok) setInvoices(await invoicesRes.json());
    } catch (err) {
      console.warn("Backend API not reachable:", err.message);
      setApiOnline(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // อัปเดตทุก 10 วิ
    return () => clearInterval(interval);
  }, [fetchData]);

  // เลื่อนกลับขึ้นด้านบนสุดเมื่อผู้ใช้สลับหน้าหรือคลิกลิงก์นำทาง
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  // ฟังก์ชันจัดการค้นหาจากแถบ Header และ Mega Menu
  const handlePerformSearch = (query, category) => {
    setHeaderSearchQuery(query || "");
    if (category) {
      setSelectedCatalogCategory(category);
    }
    setActiveTab("order");
  };

  // ฟังก์ชันจัดการตะกร้าสินค้า (บล็อกผู้ใช้ที่ยังไม่ลงทะเบียน)
  const handleAddToCart = (part, qty) => {
    if (!currentCustomer) {
      setPendingCartItem({ part, qty });
      alert(
        isTh
          ? "⚠️ กรุณาลงทะเบียนลูกค้าหรือรถยนต์ก่อนเพิ่มสินค้าลงในตะกร้า\n(ระบบกำลังเปิดหน้าต่างลงทะเบียนให้คุณ)"
          : "⚠️ Please register your customer profile or vehicle before adding items to cart.\n(Opening registration window for you)"
      );
      setShowRegisterModal(true);
      return false;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.part_id === part.part_id);
      if (existing) {
        return prev.map((item) =>
          item.part_id === part.part_id
            ? { ...item, quantity: Math.min(part.stock_qty, item.quantity + qty) }
            : item
        );
      }
      return [
        ...prev,
        {
          part_id: part.part_id,
          part_name: part.part_name,
          price: part.price,
          quantity: qty,
          stock_qty: part.stock_qty,
        },
      ];
    });
    return true;
  };

  const handleUpdateCartQty = (partId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(partId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.part_id === partId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveFromCart = (partId) => {
    setCart((prev) => prev.filter((item) => item.part_id !== partId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // เมื่องานบริการถูกสร้างสำเร็จ
  const handleJobCreated = (result) => {
    setLastCreatedMessage(
      isTh
        ? `สร้างใบสั่งซ่อม #${result.job?.job_id} (${result.job?.job_type === "REPAIR" ? "งานซ่อมทั่วไป" : "งานบำรุงรักษาตามระยะ"}) สำเร็จ! ยอดรวมสุทธิ: ฿${result.calculated_cost.toLocaleString("th-TH", { minimumFractionDigits: 2 })}`
        : `Service Job #${result.job?.job_id} (${result.job?.job_type === "REPAIR" ? "General Repair" : "Periodic Maintenance"}) created successfully! Net Total: ฿${result.calculated_cost.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
    );
    if (result.invoice) {
      setActiveInvoice(result.invoice);
    }
    fetchData();
  };

  const handleMarkPaid = () => {
    fetchData();
    if (activeInvoice) {
      setActiveInvoice({ ...activeInvoice, payment_status: "PAID" });
    }
  };

  // สรุปยอดเงินในตะกร้า
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // หาก URL อยู่ในเส้นทาง /admin ให้แสดงผลหน้า AdminPage ที่มีระบบล็อกอินแยกต่างหาก
  if (isPageAdmin) {
    return (
      <AdminPage
        apiUrl={API_BASE_URL}
        parts={parts}
        vehicles={vehicles}
        customers={customers}
        invoices={invoices}
        onRefresh={fetchData}
        onBackToCustomerSite={navigateToCustomerSite}
        initialTab={adminInitialTab}
        initialConvId={adminInitialConvId}
        contactSubmission={lastContactSubmission}
      />
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* 1. Header & Navigation Bar สไตล์ ServiceGarage (ServiceGarage System) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        cartTotal={totalCartAmount}
        apiOnline={apiOnline}
        onOpenRegister={() => setShowRegisterModal(true)}
        currentCustomer={currentCustomer}
        onLogoutCustomer={handleLogoutCustomer}
        searchQuery={headerSearchQuery}
        setSearchQuery={setHeaderSearchQuery}
        onPerformSearch={handlePerformSearch}
        activeCategory={selectedCatalogCategory}
        setActiveCategory={setSelectedCatalogCategory}
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
        isBWMode={isBWMode}
        toggleBWMode={toggleBWMode}
      />

      {/* 2. Main Content Body */}
      <main className="container-fluid px-3 px-lg-4 py-4 flex-grow-1">
        {/* ข้อความแจ้งเตือนเมื่องานบริการถูกสร้างสำเร็จ */}
        {lastCreatedMessage && (
          <div className="alert alert-success alert-dismissible fade show d-flex align-items-center gap-2 shadow-sm mb-4">
            <i className="bi bi-check-circle-fill text-success fs-5"></i>
            <div>{lastCreatedMessage}</div>
            <button
              type="button"
              className="btn-close"
              onClick={() => setLastCreatedMessage("")}
            ></button>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 1: หน้าแรก (ServiceGarage Homepage & Dashboard) */}
        {/* ========================================================== */}
        {/* ========================================================== */}
        {/* TAB 1: หน้าแรก (CarGarage PRO Dashboard & Operations) */}
        {/* ========================================================== */}
        {activeTab === "dashboard" && (
          <div>
            {/* 1. HERO COMMAND CENTER ศูนย์บริการและอู่ซ่อมรถยนต์ */}
            <PromoBannerCarousel
              vehiclesCount={vehicles?.length || 0}
              partsCount={parts?.length || 0}
              invoicesCount={invoices?.length || 0}
              onShopNow={() => setActiveTab("order")}
              onEstimate={() => {
                setActiveTab("jobs");
                setJobsSubTab("estimator");
              }}
              onOpenJob={() => {
                setActiveTab("jobs");
                setJobsSubTab("form");
              }}
              onViewVehicles={() => setActiveTab("vehicleSearch")}
            />

            {/* 2. มาตรฐานการบริการของศูนย์ซ่อม (Garage Service Standards) */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card h-100 p-3 bg-white border-0 shadow-sm d-flex flex-row align-items-center gap-3">
                  <div className="stat-icon bg-sp-blue-light text-sp-blue fs-3">
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-dark">
                      {isTh ? "อะไหล่แท้มาตรฐาน OEM" : "OEM Standard Parts"}
                    </h6>
                    <small className="text-muted">
                      {isTh ? "คัดสรรตรงรุ่น พร้อมใบรับประกัน" : "Model-matched with full warranty"}
                    </small>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card h-100 p-3 bg-white border-0 shadow-sm d-flex flex-row align-items-center gap-3">
                  <div className="stat-icon bg-success-subtle text-success fs-3">
                    <i className="bi bi-speedometer2"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-dark">
                      {isTh ? "บริการด่วน ทันใจ" : "Fast & Express Service"}
                    </h6>
                    <small className="text-muted">
                      {isTh ? "ตรวจเช็กแม่นยำ ส่งมอบตรงเวลา" : "Accurate diagnostics & on-time delivery"}
                    </small>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card h-100 p-3 bg-white border-0 shadow-sm d-flex flex-row align-items-center gap-3">
                  <div className="stat-icon bg-warning-subtle text-warning fs-3">
                    <i className="bi bi-receipt-cutoff"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-dark">
                      {isTh ? "ราคาโปร่งใส มาตรฐาน" : "Transparent Pricing"}
                    </h6>
                    <small className="text-muted">
                      {isTh ? "คำนวณค่าแรงและอะไหล่แม่นยำ" : "Accurate labor & itemized part pricing"}
                    </small>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="card h-100 p-3 bg-white border-0 shadow-sm d-flex flex-row align-items-center gap-3">
                  <div className="stat-icon bg-info-subtle text-info fs-3">
                    <i className="bi bi-person-gear"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0 text-dark">
                      {isTh ? "ช่างผู้เชี่ยวชาญดูแล" : "Certified Technicians"}
                    </h6>
                    <small className="text-muted">
                      {isTh ? "พร้อมเครื่องมือวิเคราะห์ครบครัน" : "Equipped with advanced diagnostic tools"}
                    </small>
                  </div>
                </div>
              </div>
            </div>


            {/* 4. การ์ดสถิติ 4 ตัวหลัก (Garage KPI Metrics) */}
            <StatsCards stats={stats} />

            {/* 5. อะไหล่แนะนำสำหรับงานบริการ (Essential Parts for Garage Service) */}
            <div className="mb-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <h5 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
                    <i className="bi bi-box-seam text-danger"></i>
                    <span>
                      {isTh
                        ? "อะไหล่พร้อมใช้งานสำหรับงานบริการ (Service Replacement Parts)"
                        : "Ready-to-Use Service Replacement Parts"}
                    </span>
                  </h5>
                  <small className="text-muted">
                    {isTh
                      ? "อะไหล่แท้มาตรฐาน OEM พร้อมเบิกจ่ายเข้าใบสั่งซ่อมบำรุงทันที"
                      : "OEM certified components ready for immediate service order requisition"}
                  </small>
                </div>
                <button
                  className="btn btn-outline-sp-primary btn-sm rounded-pill fw-semibold"
                  onClick={() => setActiveTab("order")}
                >
                  {isTh
                    ? `ดูคลังอะไหล่ทั้งหมด (${parts?.length} รายการ)`
                    : `View All Inventory (${parts?.length} items)`}{" "}
                  <i className="bi bi-arrow-right ms-1"></i>
                </button>
              </div>

              <div className="row g-3">
                {parts.slice(0, 4).map((part) => {
                  return (
                    <div className="col-12 col-sm-6 col-lg-3" key={part.part_id}>
                      <div className="sp-product-card h-100 d-flex flex-column justify-content-between p-3 bg-white rounded-3 border">
                        <div>
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className="badge bg-light text-dark border font-monospace small">
                              {part.part_id}
                            </span>
                            <span className={`badge ${part.stock_qty > 5 ? "bg-success bg-opacity-25 text-success border border-success border-opacity-50" : "bg-danger bg-opacity-25 text-danger border border-danger border-opacity-50"} small`}>
                              {isTh ? `สต็อก ${part.stock_qty} ชิ้น` : `Stock: ${part.stock_qty} pcs`}
                            </span>
                          </div>

                          <ProductImage
                            partId={part.part_id}
                            partName={part.part_name}
                            size="card"
                            className="mb-3"
                          />

                          <h6
                            className="fw-bold text-dark mb-2"
                            style={{
                              minHeight: "2.6rem",
                              fontSize: "0.9rem",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                            title={part.part_name}
                          >
                            {part.part_name}
                          </h6>
                        </div>

                        <div className="mt-auto pt-2 border-top">
                          <div className="d-flex align-items-baseline justify-content-between mb-3">
                            <div className="fs-5 fw-bold text-danger">
                              ฿{part.price.toLocaleString(isTh ? "th-TH" : "en-US", { minimumFractionDigits: 2 })}
                            </div>
                            <span className="text-muted small">{isTh ? "ราคาต่อหน่วย" : "Unit Price"}</span>
                          </div>

                          <button
                            className="btn btn-garage-unique btn-sm w-100 py-2 d-flex align-items-center justify-content-center gap-1 rounded-pill"
                            onClick={() => handleAddToCart(part, 1)}
                          >
                            <i className="bi bi-cart-plus"></i>
                            <span>{isTh ? "เบิกอะไหล่รายการนี้" : "Requisition This Part"}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* แสดงตารางใบแจ้งหนี้ล่าสุดและคลังอะไหล่ */}
            <div className="row g-4 mb-4">
              <div className="col-12 col-lg-7">
                <InvoiceList
                  invoices={invoices}
                  onSelectInvoice={(inv) => setActiveInvoice(inv)}
                />
              </div>
              <div className="col-12 col-lg-5">
                <PartsInventory
                  parts={parts.slice(0, 5)}
                  onRefresh={fetchData}
                  apiUrl={API_BASE_URL}
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 2: ค้นหาตามรุ่นรถ (Vehicle Search - ServiceGarage Feature) */}
        {/* ========================================================== */}
        {activeTab === "vehicleSearch" && (
          <VehicleSearch
            parts={parts}
            vehicles={vehicles}
            onAddToCart={handleAddToCart}
            onGoToCart={() => setActiveTab("cart")}
            initialBrand={selectedSearchBrand}
          />
        )}

        {/* ========================================================== */}
        {/* TAB 3: สั่งซื้ออะไหล่ (ServiceGarage Order Catalog) */}
        {/* ========================================================== */}
        {activeTab === "order" && (
          <OrderCatalog
            parts={parts}
            onAddToCart={handleAddToCart}
            onGoToCart={() => setActiveTab("cart")}
            initialSearch={headerSearchQuery}
            initialCategory={selectedCatalogCategory}
          />
        )}

        {/* ========================================================== */}
        {/* TAB 4: หมวดหมู่อะไหล่ / คลังสินค้า (Parts Inventory) */}
        {/* ========================================================== */}
        {activeTab === "parts" && (
          <div className="row">
            <div className="col-12">
              <PartsInventory
                parts={parts}
                onRefresh={fetchData}
                apiUrl={API_BASE_URL}
                isAdmin={false}
              />
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 5: ใบสั่งซ่อมและใบเสร็จ (พร้อมฟังชั่นประเมินราคา) */}
        {/* ========================================================== */}
        {activeTab === "jobs" && (
          <div className="container-fluid px-0">
            {/* แถบสลับระหว่าง: ฟังชั่นประเมินราคา vs เปิดใบสั่งซ่อมด่วน vs รายการใบเสร็จ */}
            <div className="card border-0 shadow-sm bg-white mb-4 p-3">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <h4 className="fw-bold mb-1 text-sp-blue d-flex align-items-center gap-2">
                    <i className="bi bi-wrench-adjustable-circle"></i>
                    <span>
                      {isTh
                        ? "บริการงานซ่อมและใบเสร็จ (Service Jobs & Invoices)"
                        : "Service Jobs & Billing Invoices"}
                    </span>
                  </h4>
                  <p className="text-muted small mb-0">
                    {isTh
                      ? "ระบบประเมินราคาค่าซ่อมและอะไหล่มาตรฐาน พร้อมออกใบสั่งซ่อมและใบเสร็จรับเงิน"
                      : "Standard repair cost estimator, itemized service orders, and automated invoice issuance."}
                  </p>
                </div>

                <div className="btn-group p-1 bg-light rounded-pill border">
                  <button
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 fw-semibold ${
                      jobsSubTab === "estimator"
                        ? "btn-sp-primary text-white shadow-sm"
                        : "btn-light text-muted"
                    }`}
                    onClick={() => setJobsSubTab("estimator")}
                  >
                    <i className="bi bi-calculator-fill me-1 text-warning"></i>
                    {isTh ? "ฟังชั่นประเมินราคา" : "Cost Estimator"}
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 fw-semibold ${
                      jobsSubTab === "form"
                        ? "btn-sp-primary text-white shadow-sm"
                        : "btn-light text-muted"
                    }`}
                    onClick={() => setJobsSubTab("form")}
                  >
                    <i className="bi bi-file-earmark-plus-fill me-1"></i>
                    {isTh ? "เปิดใบสั่งซ่อมด่วน" : "Quick Service Job"}
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 fw-semibold ${
                      jobsSubTab === "invoices"
                        ? "btn-sp-primary text-white shadow-sm"
                        : "btn-light text-muted"
                    }`}
                    onClick={() => setJobsSubTab("invoices")}
                  >
                    <i className="bi bi-receipt me-1"></i>
                    {isTh
                      ? `รายการใบเสร็จ (${invoices?.length})`
                      : `Invoices (${invoices?.length})`}
                  </button>
                </div>
              </div>
            </div>

            {/* 1. ฟังชั่นประเมินราคา (Repair Cost Estimator) */}
            {jobsSubTab === "estimator" && (
              <GarageBuilder
                vehicles={vehicles}
                parts={parts}
                onJobCreated={(result) => {
                  handleJobCreated(result);
                  setJobsSubTab("invoices");
                }}
                onAddToCart={handleAddToCart}
                apiUrl={API_BASE_URL}
              />
            )}

            {/* 2. เปิดใบสั่งซ่อมด่วน (Quick Form) */}
            {jobsSubTab === "form" && (
              <div className="row g-4">
                <div className="col-12 col-lg-6">
                  <CreateServiceJob
                    vehicles={vehicles}
                    parts={parts}
                    onJobCreated={(result) => {
                      handleJobCreated(result);
                      setJobsSubTab("invoices");
                    }}
                    apiUrl={API_BASE_URL}
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <InvoiceList
                    invoices={invoices}
                    onSelectInvoice={(inv) => setActiveInvoice(inv)}
                  />
                </div>
              </div>
            )}

            {/* 3. รายการใบเสร็จรับเงิน (Invoices List) */}
            {jobsSubTab === "invoices" && (
              <div className="row">
                <div className="col-12">
                  <InvoiceList
                    invoices={invoices}
                    onSelectInvoice={(inv) => setActiveInvoice(inv)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 7: ติดต่อเรา & สาขา (Contact ServiceGarage) */}
        {/* ========================================================== */}
        {activeTab === "contact" && (
          <ContactSales
            apiUrl={API_BASE_URL}
          />
        )}

        {/* ========================================================== */}
        {/* TAB 8: ตะกร้าสินค้า (Cart View) */}
        {/* ========================================================== */}
        {activeTab === "cart" && (
          <CartView
            cart={cart}
            onUpdateQty={handleUpdateCartQty}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onContinueShopping={() => setActiveTab("order")}
            apiUrl={API_BASE_URL}
            currentCustomer={currentCustomer}
            onOpenRegister={() => setShowRegisterModal(true)}
            onOrderCompleted={() => {
              fetchData();
            }}
          />
        )}
      </main>

      {/* 3. Footer สไตล์ ServiceGarage (ServiceGarage System) */}
      <Footer
        setActiveTab={setActiveTab}
        setJobsSubTab={setJobsSubTab}
        onSelectCategory={(catId) => handlePerformSearch("", catId)}
        onGoToAdmin={navigateToAdmin}
      />

      {/* Modal แสดงใบแจ้งหนี้/ใบเสร็จรับเงินที่คำนวณราคาเรียบร้อย */}
      <InvoiceModal
        invoice={activeInvoice}
        onClose={() => setActiveInvoice(null)}
        onMarkPaid={handleMarkPaid}
        apiUrl={API_BASE_URL}
      />

      {/* Modal ลงทะเบียนลูกค้าและยานพาหนะ */}
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => {
          setShowRegisterModal(false);
          setPendingCartItem(null);
        }}
        customers={customers}
        onRefresh={fetchData}
        apiUrl={API_BASE_URL}
        onRegisterSuccess={handleRegisterSuccess}
        pendingItemName={pendingCartItem?.part?.part_name}
      />

      {/* ระบบแชทสดสัมพันธ์ลูกค้า (Customer Live Chat Widget) สำหรับผู้ใช้งาน */}
      <CustomerChatWidget apiUrl={API_BASE_URL} />
    </div>
  );
}

