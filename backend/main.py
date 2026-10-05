"""
FastAPI Entry Point for Car Garage & Repair Service System
Demonstrates RESTful API integration with Python OOP / OOAD domain layer.
"""

import uuid
from typing import List, Dict, Any
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from backend.database import db
from backend.models import (
    Customer,
    Vehicle,
    Part,
    RepairJob,
    MaintenanceJob,
    Invoice,
)
from backend.schemas import (
    CustomerCreate,
    VehicleCreate,
    PartCreate,
    PartRestock,
    RepairJobCreate,
    MaintenanceJobCreate,
)

app = FastAPI(
    title="Car Garage & Repair Service System API",
    description="University OOAD Project API implementing Encapsulation, Inheritance, Polymorphism, and Composition.",
    version="1.0.0",
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "system": "Car Garage & Repair Service System",
        "status": "online",
        "docs_url": "/docs",
        "api_prefix": "/api",
    }


@app.get("/api/health")
def health_check():
    return {"status": "ok", "oop_principles": ["Encapsulation", "Inheritance", "Polymorphism", "Composition"]}


# ==========================================
# 1. Customer Endpoints
# ==========================================
@app.get("/api/customers", response_model=List[Dict[str, Any]], tags=["Customers"])
def get_customers():
    """Retrieve all registered customers."""
    return [cust.to_dict() for cust in db.list_customers()]


@app.post("/api/customers", status_code=status.HTTP_201_CREATED, tags=["Customers"])
def create_customer(payload: CustomerCreate):
    """
    Register a new customer using the Customer OOP model.
    Auto-generates customer_id (e.g. CUST-004) if omitted.
    """
    if payload.customer_id and payload.customer_id.strip():
        cust_id = payload.customer_id.strip().upper()
    else:
        # Auto-generate sequential ID
        next_num = len(db.customers) + 1
        cust_id = f"CUST-{next_num:03d}"
        while db.get_customer(cust_id):
            next_num += 1
            cust_id = f"CUST-{next_num:03d}"

    if db.get_customer(cust_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Customer with ID '{cust_id}' already exists.",
        )
    try:
        # Instantiating domain model (Encapsulation validates fields)
        customer = Customer(
            customer_id=cust_id,
            name=payload.name,
            phone=payload.phone,
        )
        db.add_customer(customer)
        return {"message": "Customer registered successfully", "customer": customer.to_dict()}
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


# ==========================================
# 2. Vehicle Endpoints (Association)
# ==========================================
@app.get("/api/vehicles", response_model=List[Dict[str, Any]], tags=["Vehicles"])
def get_vehicles():
    """Retrieve all vehicles with their associated customer owners."""
    return [v.to_dict() for v in db.list_vehicles()]


@app.post("/api/vehicles", status_code=status.HTTP_201_CREATED, tags=["Vehicles"])
def create_vehicle(payload: VehicleCreate):
    """
    Register a vehicle and establish an Association with an existing Customer.
    """
    if db.get_vehicle(payload.license_plate):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Vehicle '{payload.license_plate}' is already registered.",
        )
    customer = db.get_customer(payload.customer_id)
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Customer with ID '{payload.customer_id}' not found.",
        )
    try:
        # Association: Vehicle has an owner (Customer)
        vehicle = Vehicle(
            license_plate=payload.license_plate,
            brand=payload.brand,
            model=payload.model,
            owner=customer,
        )
        db.add_vehicle(vehicle)
        return {"message": "Vehicle registered successfully", "vehicle": vehicle.to_dict()}
    except (ValueError, TypeError) as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


# ==========================================
# 3. Parts Inventory Endpoints (Encapsulation)
# ==========================================
@app.get("/api/parts", response_model=List[Dict[str, Any]], tags=["Parts Inventory"])
def get_parts():
    """Retrieve all parts and real-time stock levels."""
    return [part.to_dict() for part in db.list_parts()]


@app.post("/api/parts", status_code=status.HTTP_201_CREATED, tags=["Parts Inventory"])
def create_part(payload: PartCreate):
    """Add a new part to garage inventory."""
    if db.get_part(payload.part_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Part with SKU '{payload.part_id}' already exists.",
        )
    try:
        part = Part(
            part_id=payload.part_id,
            part_name=payload.part_name,
            price=payload.price,
            stock_qty=payload.stock_qty,
        )
        db.add_part(part)
        return {"message": "Part added successfully", "part": part.to_dict()}
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@app.put("/api/parts/{part_id}/restock", tags=["Parts Inventory"])
def restock_part(part_id: str, payload: PartRestock):
    """Restock a part using encapsulated business logic."""
    part = db.get_part(part_id)
    if not part:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Part '{part_id}' not found.")
    try:
        remaining = part.add_stock(payload.quantity)
        return {
            "message": f"Restocked {payload.quantity} units.",
            "part_id": part_id,
            "new_stock": remaining,
        }
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


# ==========================================
# 4. Service Jobs (Polymorphism & Composition)
# ==========================================
@app.get("/api/jobs", response_model=List[Dict[str, Any]], tags=["Service Jobs"])
def get_jobs():
    """List all service jobs (Repairs and Maintenances)."""
    return [job.to_dict() for job in db.list_jobs()]


@app.get("/api/jobs/{job_id}", tags=["Service Jobs"])
def get_job_by_id(job_id: str):
    """Retrieve detailed information and cost breakdown for a specific job."""
    job = db.get_job(job_id)
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Job '{job_id}' not found.")
    return {
        "job": job.to_dict(),
        "cost_breakdown": job.get_cost_breakdown(),
    }


@app.post("/api/jobs/repair", status_code=status.HTTP_201_CREATED, tags=["Service Jobs"])
def create_repair_job(payload: RepairJobCreate):
    """
    Create a RepairJob (Inherits from ServiceJob).
    Demonstrates:
    - Composition: Attaches Part items to the job.
    - Encapsulation: Deducts stock on each Part.
    - Polymorphism: calculate_cost() adds severity surcharge.
    """
    vehicle = db.get_vehicle(payload.license_plate)
    if not vehicle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Vehicle '{payload.license_plate}' not found.",
        )

    job_id = payload.job_id or f"JOB-{uuid.uuid4().hex[:6].upper()}"
    if db.get_job(job_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Job ID '{job_id}' already exists.",
        )

    try:
        # 1. Instantiate RepairJob (Subclass of ServiceJob)
        job = RepairJob(
            job_id=job_id,
            vehicle=vehicle,
            labor_cost=payload.labor_cost,
            description=payload.description,
            severity=payload.severity,
        )

        # 2. Composition: Attach parts and execute automatic stock deduction
        for part_req in payload.parts:
            part = db.get_part(part_req.part_id)
            if not part:
                raise ValueError(f"Part SKU '{part_req.part_id}' not found.")
            job.add_part(part=part, quantity=part_req.quantity)

        db.add_job(job)

        invoice_data = None
        if payload.auto_generate_invoice:
            inv_id = f"INV-{uuid.uuid4().hex[:6].upper()}"
            invoice = Invoice(invoice_id=inv_id, service_job=job)
            db.add_invoice(invoice)
            invoice_data = invoice.generate_invoice()

        return {
            "message": "Repair job created successfully",
            "job": job.to_dict(),
            "calculated_cost": job.calculate_cost(),
            "invoice": invoice_data,
        }
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@app.post("/api/jobs/maintenance", status_code=status.HTTP_201_CREATED, tags=["Service Jobs"])
def create_maintenance_job(payload: MaintenanceJobCreate):
    """
    Create a MaintenanceJob (Inherits from ServiceJob).
    Demonstrates:
    - Composition: Attaches Part items to the job.
    - Encapsulation: Deducts stock on each Part.
    - Polymorphism: calculate_cost() applies package discount percentage.
    """
    vehicle = db.get_vehicle(payload.license_plate)
    if not vehicle:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Vehicle '{payload.license_plate}' not found.",
        )

    job_id = payload.job_id or f"JOB-{uuid.uuid4().hex[:6].upper()}"
    if db.get_job(job_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Job ID '{job_id}' already exists.",
        )

    try:
        # 1. Instantiate MaintenanceJob (Subclass of ServiceJob)
        job = MaintenanceJob(
            job_id=job_id,
            vehicle=vehicle,
            labor_cost=payload.labor_cost,
            description=payload.description,
            package_name=payload.package_name,
        )

        # 2. Composition: Attach parts and execute automatic stock deduction
        for part_req in payload.parts:
            part = db.get_part(part_req.part_id)
            if not part:
                raise ValueError(f"Part SKU '{part_req.part_id}' not found.")
            job.add_part(part=part, quantity=part_req.quantity)

        db.add_job(job)

        invoice_data = None
        if payload.auto_generate_invoice:
            inv_id = f"INV-{uuid.uuid4().hex[:6].upper()}"
            invoice = Invoice(invoice_id=inv_id, service_job=job)
            db.add_invoice(invoice)
            invoice_data = invoice.generate_invoice()

        return {
            "message": "Maintenance job created successfully",
            "job": job.to_dict(),
            "calculated_cost": job.calculate_cost(),
            "invoice": invoice_data,
        }
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


# ==========================================
# 5. Invoices Endpoints
# ==========================================
@app.get("/api/invoices", response_model=List[Dict[str, Any]], tags=["Invoices"])
def get_invoices():
    """List all generated invoices with financial totals."""
    return [inv.generate_invoice() for inv in db.list_invoices()]


@app.get("/api/invoices/{invoice_id}", tags=["Invoices"])
def get_invoice_by_id(invoice_id: str):
    """Retrieve full itemized invoice details."""
    invoice = db.get_invoice(invoice_id)
    if not invoice:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Invoice '{invoice_id}' not found.",
        )
    return invoice.generate_invoice()


@app.post("/api/invoices/generate/{job_id}", status_code=status.HTTP_201_CREATED, tags=["Invoices"])
def generate_invoice_for_job(job_id: str):
    """
    Generates a formal invoice for an existing service job.
    Polymorphically evaluates calculate_cost().
    """
    job = db.get_job(job_id)
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Service job '{job_id}' not found.",
        )
    inv_id = f"INV-{uuid.uuid4().hex[:6].upper()}"
    invoice = Invoice(invoice_id=inv_id, service_job=job)
    db.add_invoice(invoice)
    return {
        "message": "Invoice generated successfully",
        "invoice": invoice.generate_invoice(),
    }


@app.put("/api/invoices/{invoice_id}/pay", tags=["Invoices"])
def pay_invoice(invoice_id: str):
    """Mark an invoice as PAID."""
    invoice = db.get_invoice(invoice_id)
    if not invoice:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Invoice '{invoice_id}' not found.")
    invoice.mark_as_paid()
    return {"message": f"Invoice '{invoice_id}' marked as PAID.", "invoice": invoice.to_dict()}


# ==========================================
# 6. Dashboard Statistics
# ==========================================
@app.get("/api/stats", tags=["Dashboard"])
def get_dashboard_stats():
    """Calculates high-level garage statistics for the frontend dashboard."""
    parts = db.list_parts()
    jobs = db.list_jobs()
    invoices = db.list_invoices()

    total_revenue = sum(inv.total_amount for inv in invoices)
    paid_revenue = sum(inv.total_amount for inv in invoices if inv.payment_status == "PAID")
    low_stock_count = sum(1 for p in parts if p.is_low_stock())

    return {
        "total_customers": len(db.list_customers()),
        "total_vehicles": len(db.list_vehicles()),
        "total_parts": len(parts),
        "low_stock_count": low_stock_count,
        "total_jobs": len(jobs),
        "total_invoices": len(invoices),
        "total_revenue": round(total_revenue, 2),
        "paid_revenue": round(paid_revenue, 2),
    }
