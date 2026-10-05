"use client";

export default function InvoiceModal({ invoice, onClose, onMarkPaid, apiUrl }) {
  if (!invoice) return null;

  const handlePay = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/invoices/${invoice.invoice_id}/pay`, {
        method: "PUT",
      });
      if (res.ok) {
        if (onMarkPaid) onMarkPaid(invoice.invoice_id);
      }
    } catch (err) {
      alert("การอัปเดตสถานะชำระเงินผิดพลาด");
    }
  };

  const isRepair = invoice.job?.job_type === "REPAIR";
  const breakdown = invoice.financial_breakdown || {};

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1060 }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-0 shadow">
          {/* ส่วนหัว Modal */}
          <div className="modal-header bg-dark text-white">
            <div>
              <h5 className="modal-title fw-bold d-flex align-items-center gap-2">
                <i className="bi bi-receipt text-primary"></i>
                ใบแจ้งหนี้ค่าบริการและอะไหล่: {invoice.invoice_id}
              </h5>
              <small className="text-secondary">
                วันที่ออกเอกสาร: {invoice.issue_date} • รหัสใบงาน: {invoice.job?.job_id}
              </small>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          {/* เนื้อหาใบแจ้งหนี้ */}
          <div className="modal-body p-4 bg-light">
            <div className="invoice-box p-4 shadow-sm">
              {/* แถวข้อมูลลูกค้าและยานพาหนะ */}
              <div className="row mb-4 pb-3 border-bottom">
                <div className="col-sm-6">
                  <h6 className="text-uppercase text-muted small fw-bold">ข้อมูลลูกค้า (เจ้าของรถ)</h6>
                  <h5 className="fw-bold mb-1">{invoice.customer?.name || "ลูกค้าทั่วไป"}</h5>
                  <div className="text-muted small">
                    <i className="bi bi-telephone me-1"></i>
                    เบอร์โทรศัพท์: {invoice.customer?.phone || "-"}
                  </div>
                  <div className="text-muted small">
                    <i className="bi bi-person-badge me-1"></i>
                    รหัสลูกค้า: {invoice.customer?.customer_id}
                  </div>
                </div>

                <div className="col-sm-6 text-sm-end mt-3 mt-sm-0">
                  <h6 className="text-uppercase text-muted small fw-bold">ข้อมูลรถยนต์</h6>
                  <h5 className="fw-bold text-primary mb-1">
                    ทะเบียน {invoice.vehicle?.license_plate}
                  </h5>
                  <div className="text-muted small">
                    {invoice.vehicle?.brand} {invoice.vehicle?.model}
                  </div>
                  <div className="mt-1">
                    <span className={`badge ${isRepair ? "bg-danger" : "bg-success"}`}>
                      {isRepair ? "งานซ่อมทั่วไป (Repair)" : "งานบำรุงรักษา (Maintenance)"}
                    </span>{" "}
                    <span
                      className={`badge ${
                        invoice.payment_status === "PAID" ? "bg-success" : "bg-warning text-dark"
                      }`}
                    >
                      {invoice.payment_status === "PAID" ? "ชำระเงินเรียบร้อย" : "รอชำระเงิน"}
                    </span>
                  </div>
                </div>
              </div>

              {/* รายละเอียดงาน */}
              <div className="mb-4">
                <h6 className="text-uppercase text-muted small fw-bold">รายละเอียดงานบริการ</h6>
                <p className="mb-0 text-dark fw-medium">
                  {invoice.job?.description || "บริการบำรุงรักษาตามรอบระยะเวลา"}
                </p>
              </div>

              {/* ตารางอะไหล่ที่เปลี่ยน */}
              <h6 className="text-uppercase text-muted small fw-bold mb-2">รายการอะไหล่และอุปกรณ์ที่ใช้</h6>
              <div className="table-responsive mb-4">
                <table className="table table-bordered table-sm align-middle bg-white mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>รายการอะไหล่</th>
                      <th className="text-center" style={{ width: "90px" }}>จำนวน</th>
                      <th className="text-end" style={{ width: "130px" }}>ราคาต่อหน่วย</th>
                      <th className="text-end" style={{ width: "130px" }}>รวมเป็นเงิน</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.itemized_parts?.length > 0 ? (
                      invoice.itemized_parts.map((p, idx) => (
                        <tr key={idx}>
                          <td>
                            <div className="fw-medium">{p.part_name}</div>
                            <small className="text-muted font-monospace">{p.part_id}</small>
                          </td>
                          <td className="text-center">{p.quantity}</td>
                          <td className="text-end">฿{p.unit_price?.toLocaleString("th-TH", { minimumFractionDigits: 2 })}</td>
                          <td className="text-end fw-semibold">฿{p.subtotal?.toLocaleString("th-TH", { minimumFractionDigits: 2 })}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center text-muted py-2 small">
                          ไม่มีการเปลี่ยนอะไหล่ (เฉพาะค่าแรงบริการ)
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* สรุปแจกแจงยอดเงิน (Polymorphism Breakdown) */}
              <div className="row justify-content-end">
                <div className="col-md-7 col-lg-6">
                  <div className="bg-white p-3 rounded border">
                    <div className="d-flex justify-content-between small text-muted mb-1">
                      <span>ค่าแรงช่าง:</span>
                      <span>฿{(breakdown.labor_cost ?? 0).toLocaleString("th-TH", { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="d-flex justify-content-between small text-muted mb-1">
                      <span>ค่าอะไหล่รวม:</span>
                      <span>฿{(breakdown.parts_total ?? 0).toLocaleString("th-TH", { minimumFractionDigits: 2 })}</span>
                    </div>

                    {isRepair && (
                      <div className="d-flex justify-content-between small text-danger fw-medium mb-1">
                        <span>ค่าความเสี่ยง/ความรุนแรง ({breakdown.severity}):</span>
                        <span>+฿{(breakdown.severity_fee ?? 0).toLocaleString("th-TH", { minimumFractionDigits: 2 })}</span>
                      </div>
                    )}

                    {!isRepair && (
                      <div className="d-flex justify-content-between small text-success fw-medium mb-1">
                        <span>
                          ส่วนลดแพ็กเกจ ({breakdown.package_name} - {((breakdown.discount_rate || 0) * 100).toFixed(0)}%):
                        </span>
                        <span>-฿{(breakdown.discount_amount ?? 0).toLocaleString("th-TH", { minimumFractionDigits: 2 })}</span>
                      </div>
                    )}

                    <hr className="my-2" />
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">ยอดสุทธิที่ต้องชำระ:</span>
                      <span className="fs-4 fw-bold text-primary">
                        ฿{invoice.total_amount?.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ส่วนท้าย Modal */}
          <div className="modal-footer bg-white">
            <button
              type="button"
              className="btn btn-outline-secondary d-flex align-items-center gap-1"
              onClick={() => window.print()}
            >
              <i className="bi bi-printer"></i>
              <span>พิมพ์ใบแจ้งหนี้</span>
            </button>

            {invoice.payment_status !== "PAID" && (
              <button
                type="button"
                className="btn btn-success d-flex align-items-center gap-1"
                onClick={handlePay}
              >
                <i className="bi bi-check2-circle"></i>
                <span>บันทึกว่าชำระแล้ว</span>
              </button>
            )}

            <button type="button" className="btn btn-dark" onClick={onClose}>
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
