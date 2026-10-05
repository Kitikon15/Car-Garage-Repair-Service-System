"""
Domain Models Package for Car Garage & Repair Service System
Exports all OOP domain models.
"""

from .customer import Customer
from .vehicle import Vehicle
from .part import Part
from .service_job import ServiceJob, RepairJob, MaintenanceJob, JobPartItem
from .invoice import Invoice

__all__ = [
    "Customer",
    "Vehicle",
    "Part",
    "ServiceJob",
    "RepairJob",
    "MaintenanceJob",
    "JobPartItem",
    "Invoice",
]
