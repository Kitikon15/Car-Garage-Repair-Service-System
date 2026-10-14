"use client";

import { useLanguage } from "../context/LanguageContext";

export default function InvoiceModal({ invoice, onClose, onMarkPaid, apiUrl }) {
  if (!invoice) return null;

  const { lang } = useLanguage ? useLanguage() : { lang: "th" };
  const isTh = lang !== "en";

  const handlePay = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/invoices/${invoice.invoice_id}/pay`, {
        method: "PUT",
      });
      if (res.ok) {
        if (onMarkPaid) onMarkPaid(invoice.invoice_id);
      }
    } catch (err) {
      alert(isTh ? "การอัปเดตสถานะชำระเงินผิดพลาด" : "Payment status update failed");
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
                {isTh ? `ใบแจ้งหนี้ค่าบริการและอะไหล่: ${invoice.invoice_id}` : `Service & Parts Invoice: ${invoice.invoice_id}`}
              </h5>
              <small className="text-secondary">
                {isTh ? `วันที่ออกเอกสาร: ${invoice.issue_date} • รหัสใบงาน: ${invoice.job?.job_id}` : `Issue Date: ${invoice.issue_date} • Job ID: ${invoice.job?.job_id}`}
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
                  <h6 className="text-uppercase text-muted small fw-bold">{isTh ? "ข้อมูลลูกค้า (เจ้าของรถ)" : "Customer Information"}</h6>
                  <h5 className="fw-bold mb-1">{invoice.customer?.name || (isTh ? "ลูกค้าทั่วไป" : "Walk-in Customer")}</h5>
                  <div className="text-muted small">
                    <i className="bi bi-telephone me-1"></i>
                    {isTh ? "เบอร์โทรศัพท์:" : "Phone:"} {invoice.customer?.phone || "-"}
                  </div>
                  <div className="text-muted small">
                    <i className="bi bi-person-badge me-1"></i>
                    {isTh ? "รหัสลูกค้า:" : "Customer ID:"} {invoice.customer?.customer_id}
                  </div>
                </div>

                <div className="col-sm-6 text-sm-end mt-3 mt-sm-0">
                  <h6 className="text-uppercase text-muted small fw-bold">{isTh ? "ข้อมูลรถยนต์" : "Vehicle Details"}</h6>
                  <h5 className="fw-bold text-primary mb-1">
                    {isTh ? `ทะเบียน ${invoice.vehicle?.license_plate}` : `Plate: ${invoice.vehicle?.license_plate}`}
                  </h5>
                  <div className="text-muted small">
                    {invoice.vehicle?.brand} {invoice.vehicle?.model}
                  </div>
                  <div className="mt-1">
                    <span className={`badge ${isRepair ? "bg-danger" : "bg-success"}`}>
                      {isRepair ? (isTh ? "งานซ่อมทั่วไป (Repair)" : "General Repair") : (isTh ? "งานบำรุงรักษา (Maintenance)" : "Scheduled Maintenance")}
                    </span>{" "}
                    <span
                      className={`badge ${
                        invoice.payment_status === "PAID" ? "bg-success" : "bg-warning text-dark"
                      }`}
                    >
                      {invoice.payment_status === "PAID" ? (isTh ? "ชำระเงินเรียบร้อย" : "Paid") : (isTh ? "รอชำระเงิน" : "Pending Payment")}
                    </span>
                  </div>
                </div>
              </div>

              {/* รายละเอียดงาน */}
              <div className="mb-4">
                <h6 className="text-uppercase text-muted small fw-bold">{isTh ? "รายละเอียดงานบริการ" : "Service Details"}</h6>
                <p className="mb-0 text-dark fw-medium">
                  {invoice.job?.description || (isTh ? "บริการบำรุงรักษาตามรอบระยะเวลา" : "Scheduled periodic maintenance service")}
                </p>
              </div>

              {/* ตารางอะไหล่ที่เปลี่ยน */}
              <h6 className="text-uppercase text-muted small fw-bold mb-2">{isTh ? "รายการอะไหล่และอุปกรณ์ที่ใช้" : "Itemized Parts & Supplies"}</h6>
              <div className="table-responsive mb-4">
                <table className="table table-bordered table-sm align-middle bg-white mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>{isTh ? "รายการอะไหล่" : "Part Description"}</th>
                      <th className="text-center" style={{ width: "90px" }}>{isTh ? "จำนวน" : "Qty"}</th>
                      <th className="text-end" style={{ width: "130px" }}>{isTh ? "ราคาต่อหน่วย" : "Unit Price"}</th>
                      <th className="text-end" style={{ width: "130px" }}>{isTh ? "รวมเป็นเงิน" : "Subtotal"}</th>
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
                          {isTh ? "ไม่มีการเปลี่ยนอะไหล่ (เฉพาะค่าแรงบริการ)" : "No replacement parts required (Service labor only)"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* สรุปแจกแจงยอดเงินและค่าบริการ */}
              <div className="row justify-content-end">
                <div className="col-md-7 col-lg-6">
                  <div className="bg-white p-3 rounded border">
                    <div className="d-flex justify-content-between small text-muted mb-1">
                      <span>{isTh ? "ค่าแรงช่าง:" : "Technician Labor:"}</span>
                      <span>฿{(breakdown.labor_cost ?? 0).toLocaleString("th-TH", { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="d-flex justify-content-between small text-muted mb-1">
                      <span>{isTh ? "ค่าอะไหล่รวม:" : "Total Parts:"}</span>
                      <span>฿{(breakdown.parts_total ?? 0).toLocaleString("th-TH", { minimumFractionDigits: 2 })}</span>
                    </div>

                    {isRepair && (
                      <div className="d-flex justify-content-between small text-danger fw-medium mb-1">
                        <span>{isTh ? `ค่าความเสี่ยง/ความรุนแรง (${breakdown.severity}):` : `Severity Surcharge (${breakdown.severity}):`}</span>
                        <span>+฿{(breakdown.severity_fee ?? 0).toLocaleString("th-TH", { minimumFractionDigits: 2 })}</span>
                      </div>
                    )}

                    {!isRepair && (
                      <div className="d-flex justify-content-between small text-success fw-medium mb-1">
                        <span>
                          {isTh
                            ? `ส่วนลดแพ็กเกจ (${breakdown.package_name} - ${((breakdown.discount_rate || 0) * 100).toFixed(0)}%):`
                            : `Package Discount (${breakdown.package_name} - ${((breakdown.discount_rate || 0) * 100).toFixed(0)}%):`}
                        </span>
                        <span>-฿{(breakdown.discount_amount ?? 0).toLocaleString("th-TH", { minimumFractionDigits: 2 })}</span>
                      </div>
                    )}

                    <hr className="my-2" />
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">{isTh ? "ยอดสุทธิที่ต้องชำระ:" : "Total Amount Due:"}</span>
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
              <span>{isTh ? "พิมพ์ใบแจ้งหนี้" : "Print Invoice"}</span>
            </button>

            {invoice.payment_status !== "PAID" && (
              <button
                type="button"
                className="btn btn-success d-flex align-items-center gap-1"
                onClick={handlePay}
              >
                <i className="bi bi-check2-circle"></i>
                <span>{isTh ? "บันทึกว่าชำระแล้ว" : "Mark as Paid"}</span>
              </button>
            )}

            <button type="button" className="btn btn-dark" onClick={onClose}>
              {isTh ? "ปิดหน้าต่าง" : "Close"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
