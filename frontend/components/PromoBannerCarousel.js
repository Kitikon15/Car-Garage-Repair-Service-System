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
  return (
    <div
      className="w-100 rounded-4 overflow-hidden shadow-sm mb-4 position-relative"
      style={{
        background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 40%, #0f172a 100%)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        color: "#ffffff",
      }}
    >
      <div className="p-4 p-md-5">
        <div className="row align-items-center g-4">
          {/* ฝั่งซ้าย: ข้อมูลระบบและปุ่มลัดงานบริการ */}
          <div className="col-12 col-lg-7">
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

            <h1 className="fw-black text-white display-6 mb-3" style={{ letterSpacing: "-0.5px", lineHeight: 1.25 }}>
              Car Garage Repair &amp; Service Management System
            </h1>

            <p className="text-white text-opacity-90 lead mb-4 pe-lg-3" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
              ควบคุมงานซ่อมบำรุงรถยนต์ ตรวจเช็กระยะตามรอบ เบิกจ่ายอะไหล่แท้ตัดสต็อกแบบเรียลไทม์ คำนวณราคาประเมินค่าแรงมาตรฐาน และออกใบเสร็จรับเงินอย่างเป็นระบบครบวงจร
            </p>

            {/* ปุ่มปฏิบัติการหลัก (Action Buttons) */}
            <div className="d-flex flex-wrap gap-2 gap-sm-3 pt-1">
              <button
                type="button"
                className="btn btn-warning text-dark fw-bold px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2"
                onClick={onEstimate}
                style={{ fontSize: "0.95rem" }}
              >
                <i className="bi bi-calculator-fill fs-5"></i>
                <span>ประเมินราคาซ่อม &amp; ค่าแรง</span>
              </button>

              <button
                type="button"
                className="btn btn-light text-danger fw-bold px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2"
                onClick={onOpenJob}
                style={{ fontSize: "0.95rem" }}
              >
                <i className="bi bi-tools fs-5"></i>
                <span>เปิดใบสั่งซ่อมบำรุง</span>
              </button>

              <button
                type="button"
                className="btn btn-outline-light fw-bold px-4 py-2 rounded-pill d-flex align-items-center gap-2"
                onClick={onShopNow}
                style={{ fontSize: "0.95rem" }}
              >
                <i className="bi bi-box-seam fs-5"></i>
                <span>คลังเบิกจ่ายอะไหล่</span>
              </button>
            </div>
          </div>

          {/* ฝั่งขวา: การ์ดแดชบอร์ดสถานะอู่แบบสด (Live Garage Operations Card) */}
          <div className="col-12 col-lg-5">
            <div
              className="p-4 rounded-4"
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="d-flex align-items-center justify-content-between pb-3 border-bottom border-white border-opacity-20 mb-3">
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-success rounded-circle p-1" style={{ width: "10px", height: "10px" }}> </span>
                  <span className="fw-bold text-white fs-6">สถานะศูนย์บริการ (Garage Live Hub)</span>
                </div>
                <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 px-2 py-1">
                  READY / ONLINE
                </span>
              </div>

              {/* สถิติ 3 คอลัมน์ */}
              <div className="row g-2 mb-3">
                <div className="col-4">
                  <div className="p-2 rounded-3 text-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}>
                    <div className="text-warning fw-black fs-4">{vehiclesCount}</div>
                    <div className="text-white text-opacity-75" style={{ fontSize: "0.72rem" }}>รถยนต์ในระบบ</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-2 rounded-3 text-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}>
                    <div className="text-warning fw-black fs-4">{partsCount}</div>
                    <div className="text-white text-opacity-75" style={{ fontSize: "0.72rem" }}>อะไหล่พร้อมเบิก</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="p-2 rounded-3 text-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}>
                    <div className="text-warning fw-black fs-4">{invoicesCount}</div>
                    <div className="text-white text-opacity-75" style={{ fontSize: "0.72rem" }}>ใบเสร็จรับเงิน</div>
                  </div>
                </div>
              </div>

              {/* รายการระบบบริการด่วน */}
              <div className="d-flex flex-column gap-2 small">
                <div
                  className="d-flex align-items-center justify-content-between p-2 rounded-2 cursor-pointer"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.06)", cursor: "pointer" }}
                  onClick={onOpenJob}
                >
                  <span className="d-flex align-items-center gap-2 text-white">
                    <i className="bi bi-wrench text-warning"></i> งานซ่อมบำรุงและเปลี่ยนอะไหล่
                  </span>
                  <span className="badge bg-danger bg-opacity-50 text-white">Repair Job</span>
                </div>
                <div
                  className="d-flex align-items-center justify-content-between p-2 rounded-2 cursor-pointer"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.06)", cursor: "pointer" }}
                  onClick={onEstimate}
                >
                  <span className="d-flex align-items-center gap-2 text-white">
                    <i className="bi bi-shield-check text-success"></i> เช็กระยะตามรอบ (10,000 กม.)
                  </span>
                  <span className="badge bg-success bg-opacity-50 text-white">Maintenance</span>
                </div>
                <div
                  className="d-flex align-items-center justify-content-between p-2 rounded-2 cursor-pointer"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.06)", cursor: "pointer" }}
                  onClick={onShopNow}
                >
                  <span className="d-flex align-items-center gap-2 text-white">
                    <i className="bi bi-box-seam text-info"></i> ตรวจสอบสต็อก &amp; เบิกจ่ายตรงรุ่น
                  </span>
                  <span className="badge bg-info bg-opacity-50 text-white">Real-time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
