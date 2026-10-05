"use client";

export default function InvoiceList({ invoices, onSelectInvoice }) {
  return (
    <div className="card h-100">
      <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title mb-0 fw-bold d-flex align-items-center gap-2">
            <i className="bi bi-file-earmark-text text-primary"></i>
            <span>ประวัติใบแจ้งหนี้ / ใบเสร็จรับเงิน (Invoices)</span>
          </h5>
          <small className="text-muted">
            การคำนวณแบบ Polymorphic: เมธอด <code>Invoice.generate_invoice()</code> เรียก <code>calculate_cost()</code>
          </small>
        </div>
        <span className="badge bg-primary rounded-pill">
          ทั้งหมด {invoices?.length || 0} ใบ
        </span>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col" className="ps-3">เลขที่ใบแจ้งหนี้</th>
              <th scope="col">ลูกค้า / ทะเบียนรถ</th>
              <th scope="col">ประเภทงาน</th>
              <th scope="col" className="text-end">ยอดรวมสุทธิ</th>
              <th scope="col" className="text-center">สถานะ</th>
              <th scope="col" className="text-end pe-3">ดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            {invoices?.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  ยังไม่มีประวัติใบแจ้งหนี้ในระบบ
                </td>
              </tr>
            ) : (
              invoices?.map((inv) => {
                const isPaid = inv.payment_status === "PAID";
                const isRepair = inv.job?.job_type === "REPAIR";

                return (
                  <tr key={inv.invoice_id}>
                    <td className="ps-3 font-monospace fw-semibold small text-primary">
                      {inv.invoice_id}
                    </td>
                    <td>
                      <div className="fw-medium">{inv.customer?.name || "ลูกค้าทั่วไป"}</div>
                      <div className="text-muted small font-monospace">
                        ทะเบียน {inv.vehicle?.license_plate} ({inv.vehicle?.brand})
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${isRepair ? "bg-danger-subtle text-danger border border-danger-subtle" : "bg-success-subtle text-success border border-success-subtle"}`}>
                        {isRepair ? "งานซ่อมทั่วไป" : "งานบำรุงรักษา"}
                      </span>
                    </td>
                    <td className="text-end fw-bold text-dark">
                      ฿{inv.total_amount?.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="text-center">
                      <span className={`badge ${isPaid ? "bg-success" : "bg-warning text-dark"}`}>
                        {isPaid ? "ชำระเงินแล้ว" : "รอชำระเงิน"}
                      </span>
                    </td>
                    <td className="text-end pe-3">
                      <button
                        className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1"
                        onClick={() => onSelectInvoice(inv)}
                      >
                        <i className="bi bi-eye"></i>
                        <span>ดูใบเสร็จ</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
