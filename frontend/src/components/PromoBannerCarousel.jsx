"use client";

export default function PromoBannerCarousel({
  onShopNow,
  onEstimate,
  onOpenJob,
  onViewVehicles,
  vehiclesCount = 0,
  partsCount = 0,
  invoicesCount = 0,
}) {
  // รายการเครื่องมือช่างและอุปกรณ์ช่างอู่สำหรับแถบเลื่อนไปเลื่อนมา (Sliding Marquee Tools)
  const mechanicTools = [
    { icon: "bi-wrench-adjustable", name: "ประแจปอนด์ดิจิทัล", desc: "Digital Torque Wrench", cat: "วัดแรงบิด" },
    { icon: "bi-cpu-fill", name: "เครื่องสแกน OBD-II / ECU", desc: "Diagnostic Scanner", cat: "ตรวจเช็กระบบไฟ" },
    { icon: "bi-tools", name: "บล็อกลมกระแทกไฮพาวเวอร์", desc: "Air Impact Wrench", cat: "ถอดประกอบช่วงล่าง" },
    { icon: "bi-droplet-half", name: "เครื่องฟลัชชิ่งน้ำมันเครื่อง & เกียร์", desc: "Oil Flushing Unit", cat: "เปลี่ยนถ่ายของเหลว" },
    { icon: "bi-car-front-fill", name: "แม่แรงไฮดรอลิก & ลิฟต์ยกรถ 4 เสา", desc: "Hydraulic Car Lift", cat: "ยกรถตรวจช่วงล่าง" },
    { icon: "bi-disc-fill", name: "เครื่องเจียรจานเบรกอัตโนมัติ", desc: "Brake Disc Lathe", cat: "ระบบเบรก" },
    { icon: "bi-battery-charging", name: "เครื่องวิเคราะห์แบตเตอรี่ & ไดชาร์จ", desc: "Battery Analyzer", cat: "ตรวจวัดกระแสไฟ" },
    { icon: "bi-snow", name: "สถานีแวคคั่มและเติมน้ำยาแอร์ R134a", desc: "A/C Recovery Station", cat: "ระบบปรับอากาศ" },
    { icon: "bi-speedometer2", name: "เกจวัดแรงดันกำลังอัดกระบอกสูบ", desc: "Compression Tester", cat: "ตรวจเช็กเครื่องยนต์" },
    { icon: "bi-gear-wide-connected", name: "ชุดเครื่องมือตั้งมาร์กสายพานไทม์มิ่ง", desc: "Timing Tool Kit", cat: "ระบบสายพาน" },
  ];

  // ไอคอนเครื่องมือช่างลอยไปลอยมาในพื้นหลัง (Floating Ambient Tools)
  const floatingIcons = [
    { icon: "bi-wrench-adjustable", size: 56, top: "8%", left: "4%", opacity: 0.18, anim: "anim-float-1", color: "#c6f6ff" },
    { icon: "bi-gear-wide-connected", size: 70, top: "10%", right: "5%", opacity: 0.16, anim: "anim-spin-gear", color: "#90abff" },
    { icon: "bi-screwdriver", size: 44, bottom: "32%", left: "6%", opacity: 0.18, anim: "anim-drift", color: "#b7e2fb" },
    { icon: "bi-tools", size: 52, top: "42%", left: "48%", opacity: 0.14, anim: "anim-float-2", color: "#7c8efe" },
    { icon: "bi-disc-fill", size: 62, bottom: "28%", right: "10%", opacity: 0.16, anim: "anim-float-1", color: "#a7c9ff" },
    { icon: "bi-speedometer2", size: 48, top: "68%", left: "26%", opacity: 0.15, anim: "anim-drift", color: "#c6f6ff" },
    { icon: "bi-hammer", size: 42, top: "22%", left: "33%", opacity: 0.13, anim: "anim-float-2", color: "#ffffff" },
    { icon: "bi-battery-charging", size: 50, top: "62%", right: "30%", opacity: 0.15, anim: "anim-float-1", color: "#5b5ffd" },
  ];

  return (
    <div
      className="w-100 rounded-4 overflow-hidden shadow-sm mb-4 position-relative"
      style={{
        background: "linear-gradient(135deg, #1e204c 0%, #2f3388 50%, #4f46e5 100%)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        color: "#ffffff",
      }}
    >
      {/* 1. ไอคอนเครื่องมือช่างลอยไปลอยมาในพื้นหลัง (Floating Tool Icons Background) */}
      {floatingIcons.map((item, idx) => (
        <div
          key={idx}
          className={`floating-tool ${item.anim}`}
          style={{
            top: item.top,
            bottom: item.bottom,
            left: item.left,
            right: item.right,
            width: `${item.size}px`,
            height: `${item.size}px`,
            fontSize: `${item.size * 0.58}px`,
            color: item.color,
            opacity: item.opacity,
            background: "rgba(255, 255, 255, 0.04)",
            border: `1px solid ${item.color}33`,
          }}
        >
          <i className={`bi ${item.icon}`}></i>
        </div>
      ))}

      <div className="p-4 p-md-5 position-relative" style={{ zIndex: 2 }}>
        <div className="row g-4">
          {/* ข้อมูลระบบและปุ่มลัดงานบริการ */}
          <div className="col-12 col-xl-10">
            <div
              className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3"
              style={{
                backgroundColor: "rgba(251, 191, 36, 0.15)",
                border: "1px solid rgba(251, 191, 36, 0.4)",
                color: "#fde047",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              <i className="bi bi-shield-check text-warning"></i>
              <span>ระบบบริหารจัดการศูนย์บริการและอู่ซ่อมรถยนต์มาตรฐาน</span>
            </div>

            <h1 className="fw-black text-white display-5 mb-3" style={{ letterSpacing: "-0.5px", lineHeight: 1.25 }}>
              Car Garage Repair &amp; Service Management System
            </h1>

            <p className="text-white text-opacity-90 lead mb-4 pe-lg-4" style={{ fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "860px" }}>
              ควบคุมงานซ่อมบำรุงรถยนต์ ตรวจเช็กระยะตามรอบ เบิกจ่ายอะไหล่แท้ตัดสต็อกแบบเรียลไทม์ คำนวณราคาประเมินค่าแรงมาตรฐาน และออกใบเสร็จรับเงินอย่างเป็นระบบครบวงจร
            </p>

            {/* ปุ่มปฏิบัติการหลัก (Action Buttons) */}
            <div className="d-flex flex-wrap gap-2 gap-sm-3 pt-1">
              <button
                type="button"
                className="btn btn-warning text-dark fw-bold px-4 py-2.5 rounded-pill shadow-sm d-flex align-items-center gap-2"
                onClick={onEstimate}
                style={{ fontSize: "0.95rem" }}
              >
                <i className="bi bi-calculator-fill fs-5"></i>
                <span>ประเมินราคาซ่อม &amp; ค่าแรง</span>
              </button>

              <button
                type="button"
                className="btn btn-light text-sp-blue fw-bold px-4 py-2.5 rounded-pill shadow-sm d-flex align-items-center gap-2"
                onClick={onOpenJob}
                style={{ fontSize: "0.95rem" }}
              >
                <i className="bi bi-tools fs-5"></i>
                <span>เปิดใบสั่งซ่อมบำรุง</span>
              </button>

              <button
                type="button"
                className="btn btn-outline-light fw-bold px-4 py-2.5 rounded-pill d-flex align-items-center gap-2"
                onClick={onShopNow}
                style={{ fontSize: "0.95rem" }}
              >
                <i className="bi bi-box-seam fs-5"></i>
                <span>คลังเบิกจ่ายอะไหล่</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. แถบเลื่อนไอคอนเครื่องมือช่างและอุปกรณ์ประจำอู่ (Sliding Mechanic Tools Marquee Ticker) */}
        <div className="mt-4 pt-3 border-top border-white border-opacity-20 position-relative">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center gap-2">
              <span
                className="badge rounded-pill fw-bold px-2.5 py-1 small d-flex align-items-center gap-1 text-dark"
                style={{ background: "var(--theme-accent-gradient)" }}
              >
                <i className="bi bi-wrench-adjustable-circle-fill text-dark"></i> เครื่องมือช่าง &amp; อุปกรณ์ประจำศูนย์
              </span>
              <span className="text-white text-opacity-75 small d-none d-sm-inline">
                เครื่องมือมาตรฐานช่างยนต์ตรวจเช็กและซ่อมบำรุงครบวงจร
              </span>
            </div>
            <span className="text-white text-opacity-50 small d-none d-md-flex align-items-center gap-1" style={{ fontSize: "0.75rem" }}>
              <i className="bi bi-cursor-fill text-warning"></i> ชี้เมาส์เพื่อหยุดเลื่อนชั่วคราว
            </span>
          </div>

          <div className="tools-ticker-wrap">
            <div className="tools-ticker-track">
              {[...mechanicTools, ...mechanicTools].map((tool, idx) => (
                <div key={idx} className="tools-ticker-card" title={`${tool.name} (${tool.desc})`}>
                  <div className="tool-icon-box">
                    <i className={`bi ${tool.icon}`}></i>
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-1">
                      <span className="text-white fw-bold">{tool.name}</span>
                      <span
                        className="badge bg-white bg-opacity-20 text-white rounded-pill ms-1"
                        style={{ fontSize: "0.65rem", padding: "0.2rem 0.45rem" }}
                      >
                        {tool.cat}
                      </span>
                    </div>
                    <div className="text-white text-opacity-60" style={{ fontSize: "0.72rem" }}>
                      {tool.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

