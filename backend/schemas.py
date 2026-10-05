"""
Pydantic Request & Response Schemas for FastAPI API Validation
"""

from typing import List, Optional
from pydantic import BaseModel, Field


# --- Customer Schemas ---
class CustomerCreate(BaseModel):
    customer_id: Optional[str] = Field(None, example="CUST-004", description="Unique ID for customer (auto-generated if omitted)")
    name: str = Field(..., example="Elena Rostova", description="Customer full name")
    phone: str = Field(..., example="+1-555-0404", description="Phone number")


# --- Vehicle Schemas ---
class VehicleCreate(BaseModel):
    license_plate: str = Field(..., example="DEF-4567", description="Vehicle license plate")
    brand: str = Field(..., example="Subaru", description="Brand/Manufacturer")
    model: str = Field(..., example="Outback 2023", description="Model and year")
    customer_id: str = Field(..., example="CUST-001", description="Customer owner ID")


# --- Part Schemas ---
class PartCreate(BaseModel):
    part_id: str = Field(..., example="PART-009", description="Part SKU/ID")
    part_name: str = Field(..., example="Wiper Blades (Pair)", description="Name of part")
    price: float = Field(..., ge=0, example=28.50, description="Unit price")
    stock_qty: int = Field(..., ge=0, example=20, description="Initial inventory count")
    image_url: Optional[str] = Field(None, example="/images/parts/PART-009.jpg", description="URL/path to product image")


class PartRestock(BaseModel):
    quantity: int = Field(..., gt=0, example=10, description="Units to add to inventory")


# --- Service Job Schemas ---
class JobPartInput(BaseModel):
    part_id: str = Field(..., example="PART-001")
    quantity: int = Field(..., gt=0, example=1)


class RepairJobCreate(BaseModel):
    job_id: Optional[str] = Field(None, example="JOB-1003")
    license_plate: str = Field(..., example="ABC-1234")
    labor_cost: float = Field(..., ge=0, example=150.00)
    description: str = Field(..., example="Front rotor and brake pad replacement")
    severity: str = Field("MODERATE", example="MODERATE", description="MINOR | MODERATE | MAJOR | CRITICAL")
    parts: List[JobPartInput] = Field(default_factory=list)
    auto_generate_invoice: bool = Field(True, description="Whether to immediately create an invoice")


class MaintenanceJobCreate(BaseModel):
    job_id: Optional[str] = Field(None, example="JOB-1004")
    license_plate: str = Field(..., example="XYZ-7890")
    labor_cost: float = Field(..., ge=0, example=95.00)
    description: str = Field(..., example="Periodic 10k scheduled inspection")
    package_name: str = Field("PERIODIC_10K", example="PERIODIC_10K", description="BASIC_INSPECTION | PERIODIC_10K | COMPREHENSIVE_SERVICE")
    parts: List[JobPartInput] = Field(default_factory=list)
    auto_generate_invoice: bool = Field(True, description="Whether to immediately create an invoice")
