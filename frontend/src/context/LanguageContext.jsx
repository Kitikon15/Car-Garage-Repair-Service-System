"use client";

import { createContext, useContext, useState, useEffect } from "react";

export const translations = {
  th: {
    // General & Switcher
    lang_th: "ภาษาไทย",
    lang_en: "English",
    lang_th_short: "TH",
    lang_en_short: "EN",
    switch_language: "เปลี่ยนภาษา",

    // Admin Sidebar
    main_menu: "เมนูหลักศูนย์บริการ",
    garage_overview: "ภาพรวมศูนย์บริการ",
    parts_inventory: "คลังอะไหล่ (Parts)",
    live_chat: "แชทลูกค้า (Live Chat)",
    garage_operations: "งานบริการ & คลังอู่",
    repair_orders_invoices: "ใบสั่งซ่อม & ใบแจ้งหนี้",
    view_customer_site: "ดูหน้าเว็บลูกค้า",
    logout: "ออกจากระบบ",
    confirm_logout: "คุณต้องการออกจากระบบผู้ดูแลระบบใช่หรือไม่?",
    brand_sub: "ระบบจัดการอู่ซ่อมรถยนต์",

    // Topbar Search & Admin Header
    search_placeholder: "ค้นหาอะไหล่, ทะเบียนรถ, ใบสั่งซ่อม...",
    notifications: "การแจ้งเตือนระบบ",
    notification_title: "Notification",
    mark_all_read: "อ่านทั้งหมด",
    all_read: "อ่านครบแล้ว",
    new_notif: "New",
    admin_center: "Admin Center",

    // Notifications
    notif_low_stock_title: "อะไหล่ใกล้หมดสต็อก",
    notif_low_stock_desc: "มีอะไหล่ต่ำกว่าเกณฑ์ 4 รายการ",
    notif_chat_title: "ข้อความลูกค้าใหม่",
    notif_chat_desc: "Alex Morgan ส่งข้อความถึงฝ่ายบริการ",
    notif_invoice_title: "ใบสั่งซ่อมรอการชำระ",
    notif_invoice_desc: "INV-001 รอชำระเงิน ฿2,952.00",
    notif_ready_title: "งานซ่อมเสร็จพร้อมส่งมอบ",
    notif_ready_desc: "Toyota Camry (1กข-9999) ซ่อมบำรุงเสร็จสิ้นแล้ว",

    // Dashboard - Master Technician
    master_technician: "MASTER TECHNICIAN",
    head_technician_name: "ช่างจันทร์ บรรลัยการช่าง",
    technician_rate_desc: "ส่งมอบงานซ่อมตรงเวลา 99.4% ประจำเดือน",
    completed_jobs_count: "48 คัน",
    completed_jobs_label: "งานซ่อมเสร็จสมบูรณ์",
    check_repair_jobs_btn: "ตรวจสอบงานซ่อม (Repair Jobs)",

    // Dashboard - KPIs
    garage_operations_title: "สถิติภาพรวมศูนย์บริการ (Garage Operations)",
    realtime_data_sub: "ข้อมูลอัปเดตระบบแบบ Real-time",
    garage_open_normal: "อู่เปิดให้บริการปกติ",
    kpi_vehicles_serviced: "รถเข้าซ่อมสะสม",
    kpi_pending_invoices: "ใบสั่งซ่อมค้างชำระ",
    kpi_total_revenue: "รายรับศูนย์บริการ",
    kpi_parts_stock: "สต็อกอะไหล่พร้อมใช้",
    kpi_active_bays: "ช่องซ่อมประจำการ",

    // Workshop Bays
    bays_title: "ช่องซ่อมประจำการ (Live Workshop Bays)",
    bay_status_in_progress: "กำลังซ่อม",
    bay_status_available: "ว่างพร้อมให้บริการ",
    bay_status_maintenance: "ซ่อมบำรุงช่อง",
    bay_technician: "ช่างประจำช่อง",

    // Admin Tabs
    tab_dashboard: "ภาพรวมศูนย์บริการ",
    tab_parts: "จัดการคลังอะไหล่",
    tab_chat: "ห้องตอบแชทลูกค้า",
    tab_jobs: "ใบสั่งซ่อม & ใบแจ้งหนี้",

    // Parts Inventory
    sku_code: "รหัสอะไหล่ (SKU)",
    part_name: "ชื่ออะไหล่",
    price: "ราคาต่อหน่วย",
    stock_qty: "คงเหลือในสต็อก",
    status: "สถานะ",
    actions: "จัดการ",
    add_part_btn: "+ เพิ่มอะไหล่ใหม่",
    quick_restock: "เติมสต็อก",
    status_in_stock: "พร้อมจ่าย",
    status_low_stock: "สต็อกต่ำ",
    status_out_of_stock: "สินค้าหมด",
    search_parts: "ค้นหาชื่ออะไหล่หรือรหัส SKU...",
    confirm_delete_part: "ยืนยันการลบอะไหล่",

    // Live Chat Desk
    customer_chats_list: "รายการแชทลูกค้า",
    conversations_count: "การสนทนา",
    chat_with: "สนทนากับ",
    vehicle_info: "ข้อมูลรถ",
    phone_info: "เบอร์โทร",
    type_reply_placeholder: "พิมพ์ข้อความตอบกลับลูกค้า...",
    send_reply_btn: "ส่ง",
    quick_replies: "ตอบกลับด่วน:",
    no_messages: "ยังไม่มีข้อความ",

    // Customer Site
    site_title: "ระบบบริหารจัดการศูนย์บริการและอู่ซ่อมรถยนต์ (Car Garage Management)",
    site_sub_top: "ประเมินราคาซ่อม & ตัดสต็อกอะไหล่อัตโนมัติ",
    nav_home: "ภาพรวมศูนย์บริการ",
    nav_jobs: "ใบสั่งซ่อม & ประเมินราคา",
    nav_order: "คลังเบิก-จ่ายอะไหล่",
    nav_parts: "รายการอะไหล่ในสต็อก",
    nav_vehicle: "ทะเบียนรถ & ประวัติ",
    nav_contact: "ติดต่อศูนย์บริการ",
    nav_cart: "ตะกร้าอะไหล่",
    nav_admin_portal: "เข้าระบบแอดมิน",
    garage_portal_btn: "ระบบหลังบ้าน แอดมิน",
  },
  en: {
    // General & Switcher
    lang_th: "ภาษาไทย",
    lang_en: "English",
    lang_th_short: "TH",
    lang_en_short: "EN",
    switch_language: "Switch Language",

    // Admin Sidebar
    main_menu: "MAIN MENU",
    garage_overview: "Garage Overview",
    parts_inventory: "Parts Inventory",
    live_chat: "Live Chat Desk",
    garage_operations: "GARAGE OPERATIONS",
    repair_orders_invoices: "Repair Orders & Invoices",
    view_customer_site: "Customer Portal",
    logout: "Log Out",
    confirm_logout: "Are you sure you want to log out of the admin center?",
    brand_sub: "Car Garage Service & Repair",

    // Topbar Search & Admin Header
    search_placeholder: "Search parts, license plate, repair orders...",
    notifications: "System Notifications",
    notification_title: "Notification",
    mark_all_read: "Mark all read",
    all_read: "All caught up",
    new_notif: "New",
    admin_center: "Admin Center",

    // Notifications
    notif_low_stock_title: "Low Stock Alert",
    notif_low_stock_desc: "4 spare parts below safety threshold",
    notif_chat_title: "New Customer Message",
    notif_chat_desc: "Alex Morgan sent a support inquiry",
    notif_invoice_title: "Pending Repair Invoice",
    notif_invoice_desc: "INV-001 awaiting payment ฿2,952.00",
    notif_ready_title: "Ready for Delivery",
    notif_ready_desc: "Toyota Camry (1กข-9999) repair completed",

    // Dashboard - Master Technician
    master_technician: "MASTER TECHNICIAN",
    head_technician_name: "Technician Chan (Banlai Garage)",
    technician_rate_desc: "On-time delivery 99.4% for this month",
    completed_jobs_count: "48 Cars",
    completed_jobs_label: "Successfully Repaired",
    check_repair_jobs_btn: "Inspect Repair Jobs",

    // Dashboard - KPIs
    garage_operations_title: "Garage Operations Overview",
    realtime_data_sub: "Real-time system operational metrics",
    garage_open_normal: "Workshop Operating Normally",
    kpi_vehicles_serviced: "Vehicles Serviced",
    kpi_pending_invoices: "Pending Invoices",
    kpi_total_revenue: "Total Revenue",
    kpi_parts_stock: "Ready Parts Stock",
    kpi_active_bays: "Active Service Bays",

    // Workshop Bays
    bays_title: "Live Workshop Service Bays",
    bay_status_in_progress: "In Repair",
    bay_status_available: "Available",
    bay_status_maintenance: "Under Maintenance",
    bay_technician: "Assigned Tech",

    // Admin Tabs
    tab_dashboard: "Garage Overview",
    tab_parts: "Parts Inventory",
    tab_chat: "Customer Live Chat",
    tab_jobs: "Repair Jobs & Invoices",

    // Parts Inventory
    sku_code: "Part SKU",
    part_name: "Part Name",
    price: "Unit Price",
    stock_qty: "Stock Quantity",
    status: "Status",
    actions: "Actions",
    add_part_btn: "+ Add New Part",
    quick_restock: "Restock",
    status_in_stock: "In Stock",
    status_low_stock: "Low Stock",
    status_out_of_stock: "Out of Stock",
    search_parts: "Search by part name or SKU...",
    confirm_delete_part: "Confirm deletion of part",

    // Live Chat Desk
    customer_chats_list: "Customer Conversations",
    conversations_count: "Chats",
    chat_with: "Chatting with",
    vehicle_info: "Vehicle",
    phone_info: "Phone",
    type_reply_placeholder: "Type a reply to customer...",
    send_reply_btn: "Send",
    quick_replies: "Quick Replies:",
    no_messages: "No messages yet",

    // Customer Site
    site_title: "Car Garage Repair & Service Management System",
    site_sub_top: "Automated Repair Estimation & Inventory Deduction",
    nav_home: "Garage Overview",
    nav_jobs: "Repair Jobs & Estimates",
    nav_order: "Parts Ordering",
    nav_parts: "Parts Catalog",
    nav_vehicle: "Vehicle History",
    nav_contact: "Contact Support",
    nav_cart: "Parts Cart",
    nav_admin_portal: "Admin Portal",
    garage_portal_btn: "Admin Center",
  },
};

const LanguageContext = createContext({
  lang: "th",
  setLang: () => {},
  toggleLang: () => {},
  t: (key, fallback) => fallback || key,
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("garage_lang") || "th";
    }
    return "th";
  });

  const setLang = (newLang) => {
    const validLang = newLang === "en" ? "en" : "th";
    setLangState(validLang);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("garage_lang", validLang);
      } catch (e) {
        console.warn("Could not save language preference:", e);
      }
    }
  };

  const toggleLang = () => {
    setLang(lang === "th" ? "en" : "th");
  };

  const t = (key, fallback = "") => {
    if (translations[lang] && translations[lang][key] !== undefined) {
      return translations[lang][key];
    }
    if (translations.th && translations.th[key] !== undefined) {
      return translations.th[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
