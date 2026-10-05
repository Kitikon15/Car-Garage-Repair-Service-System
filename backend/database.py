"""
In-Memory Storage Handler / Database for Car Garage System
Provides repository operations and initial seed data for demonstration.
"""

from typing import Dict, List, Optional
from backend.models import (
    Customer,
    Vehicle,
    Part,
    ServiceJob,
    RepairJob,
    MaintenanceJob,
    Invoice,
)


class GarageDatabase:
    """
    In-memory data store managing collections of garage domain entities.
    Implements Repository pattern with seed data for instant evaluation.
    """

    def __init__(self):
        self.customers: Dict[str, Customer] = {}
        self.vehicles: Dict[str, Vehicle] = {}
        self.parts: Dict[str, Part] = {}
        self.service_jobs: Dict[str, ServiceJob] = {}
        self.invoices: Dict[str, Invoice] = {}
        self._seed_initial_data()

    def _seed_initial_data(self) -> None:
        """Populates store with realistic garage test data."""
        # 1. Seed Customers
        c1 = Customer("CUST-001", "Alex Morgan", "+1-555-0101")
        c2 = Customer("CUST-002", "Samantha Hayes", "+1-555-0202")
        c3 = Customer("CUST-003", "David Kim", "+1-555-0303")
        for c in [c1, c2, c3]:
            self.customers[c.customer_id] = c

        # 2. Seed Vehicles (Associated with Customers)
        v1 = Vehicle("ABC-1234", "Toyota", "Camry 2021", c1)
        v2 = Vehicle("XYZ-7890", "Honda", "Civic 2022", c2)
        v3 = Vehicle("GAR-5544", "Ford", "F-150 2020", c3)
        for v in [v1, v2, v3]:
            self.vehicles[v.license_plate] = v

        # 3. Seed Parts (อะไหล่แท้และอะไหล่เทียบมาตรฐานสากล สไตล์ ServiceGarage)
        part_data = [
            ("PART-001", "ผ้าเบรกหน้า BREMBO Premium Ceramic (คู่) - Toyota Camry / Altis", 1850.00, 18),
            ("PART-002", "น้ำมันเครื่องสังเคราะห์แท้ SHELL HELIX ULTRA 5W-30 (6L+1L)", 2150.00, 24),
            ("PART-003", "ไส้กรองน้ำมันเครื่องแท้ห้าง TOYOTA GENUINE (90915-YZZE2)", 480.00, 30),
            ("PART-004", "หัวเทียนเลเซอร์อิริเดียม NGK LASER IRIDIUM (ชุด 4 หัว)", 1800.00, 10),
            ("PART-005", "กรองอากาศแอร์ห้องโดยสาร DENSO PM2.5 Cool Gear", 750.00, 15),
            ("PART-006", "แบตเตอรี่รถยนต์แห้ง GS BATTERY AGM 12V 75Ah", 4800.00, 3),  # แจ้งเตือนสต็อกต่ำ!
            ("PART-007", "สายพานหน้าเครื่องแท้ศูนย์ BANDO 6PK-1220", 1250.00, 7),
            ("PART-008", "น้ำยาหล่อเย็นหม้อน้ำ VALVOLINE Super Coolant 1L สีเขียว", 850.00, 14),
            ("PART-009", "จานเบรกหน้าคู่ระบายความร้อน TRW XPS Brake Rotors (คู่)", 3600.00, 8),
            ("PART-010", "โช้คอัพแก๊สคู่หน้า MONROE OE Spectrum สเปกศูนย์ (คู่)", 5800.00, 5),
            ("PART-011", "น้ำมันเกียร์ออโต้ HONDA แท้ห้าง ATF DW-1 ขนาด 3L", 1350.00, 12),
            ("PART-012", "จารบีทนความร้อนสูง TRANE SUPER HT ขนาด 5KG", 980.00, 20),
        ]
        for pid, name, price, qty in part_data:
            self.parts[pid] = Part(pid, name, price, qty)

        # 4. Seed an initial Repair Job and Invoice
        job1 = RepairJob(
            job_id="JOB-1001",
            vehicle=v1,
            labor_cost=850.00,
            description="ตรวจสอบระบบเบรกเสียงดังและเปลี่ยนชุดผ้าเบรกหน้า",
            severity="MODERATE",
        )
        # Add part (automatically deducts stock via composition behavior)
        job1.add_part(self.parts["PART-001"], 1)
        self.service_jobs[job1.job_id] = job1

        inv1 = Invoice("INV-2001", job1)
        inv1.mark_as_paid()
        self.invoices[inv1.invoice_id] = inv1

        # 5. Seed an initial Maintenance Job and Invoice
        job2 = MaintenanceJob(
            job_id="JOB-1002",
            vehicle=v2,
            labor_cost=650.00,
            description="แพ็กเกจตรวจเช็กและบำรุงรักษาตามระยะ 10,000 กม.",
            package_name="PERIODIC_10K",
        )
        job2.add_part(self.parts["PART-002"], 1)
        job2.add_part(self.parts["PART-003"], 1)
        self.service_jobs[job2.job_id] = job2

        inv2 = Invoice("INV-2002", job2)
        self.invoices[inv2.invoice_id] = inv2

    # --- Customer Operations ---
    def get_customer(self, customer_id: str) -> Optional[Customer]:
        return self.customers.get(customer_id)

    def add_customer(self, customer: Customer) -> Customer:
        if customer.customer_id in self.customers:
            raise ValueError(f"Customer ID '{customer.customer_id}' already exists.")
        self.customers[customer.customer_id] = customer
        return customer

    def list_customers(self) -> List[Customer]:
        return list(self.customers.values())

    # --- Vehicle Operations ---
    def get_vehicle(self, license_plate: str) -> Optional[Vehicle]:
        return self.vehicles.get(license_plate.upper().strip())

    def add_vehicle(self, vehicle: Vehicle) -> Vehicle:
        plate = vehicle.license_plate
        if plate in self.vehicles:
            raise ValueError(f"Vehicle with license plate '{plate}' already exists.")
        self.vehicles[plate] = vehicle
        return vehicle

    def list_vehicles(self) -> List[Vehicle]:
        return list(self.vehicles.values())

    # --- Part Operations ---
    def get_part(self, part_id: str) -> Optional[Part]:
        return self.parts.get(part_id)

    def add_part(self, part: Part) -> Part:
        if part.part_id in self.parts:
            raise ValueError(f"Part ID '{part.part_id}' already exists.")
        self.parts[part.part_id] = part
        return part

    def list_parts(self) -> List[Part]:
        return list(self.parts.values())

    # --- Job Operations ---
    def get_job(self, job_id: str) -> Optional[ServiceJob]:
        return self.service_jobs.get(job_id)

    def add_job(self, job: ServiceJob) -> ServiceJob:
        if job.job_id in self.service_jobs:
            raise ValueError(f"Job ID '{job.job_id}' already exists.")
        self.service_jobs[job.job_id] = job
        return job

    def list_jobs(self) -> List[ServiceJob]:
        return list(self.service_jobs.values())

    # --- Invoice Operations ---
    def get_invoice(self, invoice_id: str) -> Optional[Invoice]:
        return self.invoices.get(invoice_id)

    def add_invoice(self, invoice: Invoice) -> Invoice:
        if invoice.invoice_id in self.invoices:
            raise ValueError(f"Invoice ID '{invoice.invoice_id}' already exists.")
        self.invoices[invoice.invoice_id] = invoice
        return invoice

    def list_invoices(self) -> List[Invoice]:
        return list(self.invoices.values())


# Global singleton database instance
db = GarageDatabase()
