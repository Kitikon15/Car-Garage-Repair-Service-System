"use client";

export default function StatsCards({ stats }) {
  return (
    <div className="row g-3 mb-4">
      {/* การ์ดที่ 1: รายการอะไหล่ในคลัง */}
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="card h-100 p-3 bg-white">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <div className="text-muted small text-uppercase fw-semibold">อะไหล่ในคลังทั้งหมด</div>
              <div className="fs-3 fw-bold mt-1">{stats?.total_parts ?? 0} <span className="fs-6 fw-normal text-muted">รายการ</span></div>
              <div className="mt-1">
                {stats?.low_stock_count > 0 ? (
                  <span className="badge bg-danger-subtle text-danger border border-danger-subtle">
                    <i className="bi bi-exclamation-triangle-fill me-1"></i>
                    เตือนสต็อกต่ำ {stats.low_stock_count} รายการ
                  </span>
                ) : (
                  <span className="badge bg-success-subtle text-success border border-success-subtle">
                    <i className="bi bi-check-circle-fill me-1"></i> สต็อกพร้อมใช้งาน
                  </span>
                )}
              </div>
            </div>
            <div className="stat-icon bg-primary-subtle text-primary">
              <i className="bi bi-box-seam"></i>
            </div>
          </div>
        </div>
      </div>

      {/* การ์ดที่ 2: งานบริการและงานซ่อม */}
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="card h-100 p-3 bg-white">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <div className="text-muted small text-uppercase fw-semibold">ใบสั่งซ่อม / บริการ</div>
              <div className="fs-3 fw-bold mt-1">{stats?.total_jobs ?? 0} <span className="fs-6 fw-normal text-muted">งาน</span></div>
              <div className="text-muted small mt-1">
                งานซ่อมทั่วไป &amp; งานเช็กระยะ
              </div>
            </div>
            <div className="stat-icon bg-warning-subtle text-warning">
              <i className="bi bi-wrench-adjustable-circle"></i>
            </div>
          </div>
        </div>
      </div>

      {/* การ์ดที่ 3: รถยนต์และลูกค้า */}
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="card h-100 p-3 bg-white">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <div className="text-muted small text-uppercase fw-semibold">รถในระบบและลูกค้า</div>
              <div className="fs-3 fw-bold mt-1">{stats?.total_vehicles ?? 0} <span className="fs-6 fw-normal text-muted">คัน</span></div>
              <div className="text-muted small mt-1">
                ลูกค้าลงทะเบียน {stats?.total_customers ?? 0} คน
              </div>
            </div>
            <div className="stat-icon bg-info-subtle text-info">
              <i className="bi bi-car-front-fill"></i>
            </div>
          </div>
        </div>
      </div>

      {/* การ์ดที่ 4: ยอดเงินในใบแจ้งหนี้ */}
      <div className="col-12 col-sm-6 col-xl-3">
        <div className="card h-100 p-3 bg-white">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <div className="text-muted small text-uppercase fw-semibold">ยอดรวมใบแจ้งหนี้</div>
              <div className="fs-3 fw-bold text-success mt-1">
                ฿{(stats?.total_revenue ?? 0).toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-muted small mt-1">
                ชำระแล้ว: ฿{(stats?.paid_revenue ?? 0).toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="stat-icon bg-success-subtle text-success">
              <i className="bi bi-cash-coin"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
