"""
Invoice Model
Demonstrates:
- Association / Aggregation: An Invoice is associated with a ServiceJob
- Polymorphic Invocation: calculate_cost() is called transparently on ServiceJob
- Encapsulation: Protects invoice status, generation timestamps, and financial totals
"""

from datetime import datetime
from typing import Dict, Any, Optional
from .service_job import ServiceJob


class Invoice:
    """
    Represents an itemized billing invoice for a completed or active ServiceJob.
    """

    def __init__(self, invoice_id: str, service_job: ServiceJob):
        self.invoice_id = invoice_id
        self.service_job = service_job
        self.issue_date: datetime = datetime.now()
        self.payment_status: str = "UNPAID"  # UNPAID, PAID, VOID
        # Polymorphic calculation: Invoice invokes calculate_cost() regardless of whether
        # service_job is RepairJob or MaintenanceJob!
        self._total_amount: float = self.service_job.calculate_cost()

    # --- Property: invoice_id ---
    @property
    def invoice_id(self) -> str:
        return self._invoice_id

    @invoice_id.setter
    def invoice_id(self, value: str) -> None:
        if not value or not str(value).strip():
            raise ValueError("Invoice ID cannot be empty.")
        self._invoice_id = str(value).strip()

    # --- Property: service_job ---
    @property
    def service_job(self) -> ServiceJob:
        return self._service_job

    @service_job.setter
    def service_job(self, value: ServiceJob) -> None:
        if not isinstance(value, ServiceJob):
            raise TypeError("service_job must be an instance of ServiceJob.")
        self._service_job = value

    # --- Property: total_amount ---
    @property
    def total_amount(self) -> float:
        return self._total_amount

    def mark_as_paid(self) -> None:
        """Update payment status."""
        self.payment_status = "PAID"

    def generate_invoice(self) -> Dict[str, Any]:
        """
        Generates comprehensive printable invoice document.
        Invokes polymorphic methods on ServiceJob to extract type-specific cost breakdowns.
        """
        # Re-evaluate total cost polymorphically
        self._total_amount = self.service_job.calculate_cost()
        
        customer = self.service_job.vehicle.owner
        breakdown = self.service_job.get_cost_breakdown()

        return {
            "invoice_id": self._invoice_id,
            "issue_date": self.issue_date.strftime("%Y-%m-%d %H:%M:%S"),
            "payment_status": self.payment_status,
            "customer": customer.to_dict() if customer else None,
            "vehicle": {
                "license_plate": self.service_job.vehicle.license_plate,
                "brand": self.service_job.vehicle.brand,
                "model": self.service_job.vehicle.model,
                "description": self.service_job.vehicle.get_full_description(),
            },
            "job": {
                "job_id": self.service_job.job_id,
                "job_type": self.service_job.get_job_type(),
                "description": self.service_job.description,
                "status": self.service_job.status,
            },
            "itemized_parts": [item.to_dict() for item in self.service_job.parts_used],
            "financial_breakdown": breakdown,
            "total_amount": self._total_amount,
        }

    def to_dict(self) -> Dict[str, Any]:
        return self.generate_invoice()

    def __repr__(self) -> str:
        return f"<Invoice id='{self._invoice_id}' total={self._total_amount} status='{self.payment_status}'>"
