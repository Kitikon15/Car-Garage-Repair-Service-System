"""
Service Job Model Hierarchy
Demonstrates:
- Abstraction: ServiceJob is an Abstract Base Class (ABC) with abstract calculate_cost()
- Inheritance: RepairJob and MaintenanceJob inherit from ServiceJob
- Polymorphism: Different cost calculation algorithms per job type
- Composition: ServiceJob manages a collection of JobPartItem objects (part + qty used)
"""

from abc import ABC, abstractmethod
from datetime import datetime
from typing import List, Dict, Any, Optional
from .vehicle import Vehicle
from .part import Part


class JobPartItem:
    """
    Represents an itemized part used in a service job.
    Demonstrates Composition component: owned by ServiceJob.
    """

    def __init__(self, part: Part, quantity: int):
        if quantity <= 0:
            raise ValueError("Part quantity must be greater than 0.")
        self.part = part
        self.part_id = part.part_id
        self.part_name = part.part_name
        self.unit_price = part.price
        self.quantity = quantity

    def get_subtotal(self) -> float:
        """Calculates line total for this part."""
        return round(self.unit_price * self.quantity, 2)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "part_id": self.part_id,
            "part_name": self.part_name,
            "unit_price": self.unit_price,
            "quantity": self.quantity,
            "subtotal": self.get_subtotal(),
        }


class ServiceJob(ABC):
    """
    Abstract Superclass representing a garage work order.
    
    OOP Principles:
    - Abstraction: Cannot be instantiated directly; defines contract calculate_cost().
    - Composition: Maintains self._parts_used (Composition list of JobPartItem).
    - Encapsulation: Validates labor costs and manages job lifecycle.
    """

    def __init__(
        self,
        job_id: str,
        vehicle: Vehicle,
        labor_cost: float = 0.0,
        description: str = "",
    ):
        self.job_id = job_id
        self.vehicle = vehicle
        self.labor_cost = labor_cost
        self.description = description
        self._parts_used: List[JobPartItem] = []  # Composition
        self.status: str = "IN_PROGRESS"  # IN_PROGRESS, COMPLETED, CANCELLED
        self.created_at: datetime = datetime.now()

    # --- Property: job_id ---
    @property
    def job_id(self) -> str:
        return self._job_id

    @job_id.setter
    def job_id(self, value: str) -> None:
        if not value or not str(value).strip():
            raise ValueError("Job ID cannot be empty.")
        self._job_id = str(value).strip()

    # --- Property: vehicle ---
    @property
    def vehicle(self) -> Vehicle:
        return self._vehicle

    @vehicle.setter
    def vehicle(self, value: Vehicle) -> None:
        if not isinstance(value, Vehicle):
            raise TypeError("vehicle must be an instance of Vehicle.")
        self._vehicle = value

    # --- Property: labor_cost ---
    @property
    def labor_cost(self) -> float:
        return self._labor_cost

    @labor_cost.setter
    def labor_cost(self, value: float) -> None:
        val = float(value)
        if val < 0:
            raise ValueError("Labor cost cannot be negative.")
        self._labor_cost = round(val, 2)

    # --- Composition Management Methods ---
    @property
    def parts_used(self) -> List[JobPartItem]:
        """Read-only view of parts used."""
        return list(self._parts_used)

    def add_part(self, part: Part, quantity: int) -> JobPartItem:
        """
        Composition behavior:
        Job incorporates the part into its parts_used list and triggers
        encapsulated stock deduction on the Part instance.
        """
        part.deduct_stock(quantity)  # Raises ValueError if insufficient stock
        item = JobPartItem(part=part, quantity=quantity)
        self._parts_used.append(item)
        return item

    def get_parts_total(self) -> float:
        """Calculates total expense of all parts used in this job."""
        return round(sum(item.get_subtotal() for item in self._parts_used), 2)

    # --- Polymorphic Method Contract ---
    @abstractmethod
    def calculate_cost(self) -> float:
        """
        Polymorphic method: must be implemented by concrete subclasses
        (RepairJob, MaintenanceJob) to apply specific pricing rules.
        """
        pass

    @abstractmethod
    def get_job_type(self) -> str:
        """Returns the type string for UI/reporting."""
        pass

    def get_cost_breakdown(self) -> Dict[str, Any]:
        """Provides full financial breakdown for the job."""
        return {
            "labor_cost": self._labor_cost,
            "parts_total": self.get_parts_total(),
            "total_cost": self.calculate_cost(),
        }

    def to_dict(self) -> Dict[str, Any]:
        """Serializes base job attributes."""
        return {
            "job_id": self._job_id,
            "job_type": self.get_job_type(),
            "vehicle": self._vehicle.to_dict(),
            "labor_cost": self._labor_cost,
            "description": self.description,
            "parts_used": [item.to_dict() for item in self._parts_used],
            "parts_total": self.get_parts_total(),
            "total_cost": self.calculate_cost(),
            "status": self.status,
            "created_at": self.created_at.isoformat(),
        }


class RepairJob(ServiceJob):
    """
    Represents an ad-hoc fix or emergency mechanical repair.
    
    OOP Principles:
    - Inheritance: Inherits attributes and methods from ServiceJob.
    - Polymorphism: Overrides calculate_cost() to incorporate severity surcharge.
    """

    SEVERITY_SURCHARGES = {
        "MINOR": 300.0,
        "MODERATE": 800.0,
        "MAJOR": 1800.0,
        "CRITICAL": 3500.0,
    }

    def __init__(
        self,
        job_id: str,
        vehicle: Vehicle,
        labor_cost: float = 0.0,
        description: str = "",
        severity: str = "MODERATE",
    ):
        super().__init__(job_id, vehicle, labor_cost, description)
        self.severity = severity

    @property
    def severity(self) -> str:
        return self._severity

    @severity.setter
    def severity(self, value: str) -> None:
        sev = str(value).upper().strip()
        if sev not in self.SEVERITY_SURCHARGES:
            valid_keys = ", ".join(self.SEVERITY_SURCHARGES.keys())
            raise ValueError(f"Invalid severity '{value}'. Choose from: {valid_keys}")
        self._severity = sev

    @property
    def severity_fee(self) -> float:
        """Returns the severity surcharge fee."""
        return self.SEVERITY_SURCHARGES.get(self._severity, 0.0)

    # --- Polymorphic Implementation ---
    def calculate_cost(self) -> float:
        """
        Polymorphism in action:
        RepairJob cost = Labor Cost + Parts Total + Severity Diagnostics/Risk Fee
        """
        parts_total = self.get_parts_total()
        total = self.labor_cost + parts_total + self.severity_fee
        return round(total, 2)

    def get_job_type(self) -> str:
        return "REPAIR"

    def get_cost_breakdown(self) -> Dict[str, Any]:
        breakdown = super().get_cost_breakdown()
        breakdown.update({
            "severity": self._severity,
            "severity_fee": self.severity_fee,
        })
        return breakdown

    def to_dict(self) -> Dict[str, Any]:
        data = super().to_dict()
        data["severity"] = self._severity
        data["severity_fee"] = self.severity_fee
        return data


class MaintenanceJob(ServiceJob):
    """
    Represents scheduled preventative maintenance or tune-up package.
    
    OOP Principles:
    - Inheritance: Inherits attributes and methods from ServiceJob.
    - Polymorphism: Overrides calculate_cost() to apply package bundle discounts.
    """

    PACKAGE_DISCOUNTS = {
        "BASIC_INSPECTION": 0.05,    # 5% bundle discount
        "PERIODIC_10K": 0.10,        # 10% bundle discount
        "COMPREHENSIVE_SERVICE": 0.15 # 15% bundle discount
    }

    def __init__(
        self,
        job_id: str,
        vehicle: Vehicle,
        labor_cost: float = 0.0,
        description: str = "",
        package_name: str = "BASIC_INSPECTION",
    ):
        super().__init__(job_id, vehicle, labor_cost, description)
        self.package_name = package_name

    @property
    def package_name(self) -> str:
        return self._package_name

    @package_name.setter
    def package_name(self, value: str) -> None:
        pkg = str(value).upper().strip()
        if pkg not in self.PACKAGE_DISCOUNTS:
            valid_keys = ", ".join(self.PACKAGE_DISCOUNTS.keys())
            raise ValueError(f"Invalid package '{value}'. Choose from: {valid_keys}")
        self._package_name = pkg

    @property
    def discount_rate(self) -> float:
        """Percentage discount for package."""
        return self.PACKAGE_DISCOUNTS.get(self._package_name, 0.0)

    # --- Polymorphic Implementation ---
    def calculate_cost(self) -> float:
        """
        Polymorphism in action:
        MaintenanceJob cost = (Labor Cost + Parts Total) - Package Discount
        """
        subtotal = self.labor_cost + self.get_parts_total()
        discount_amount = subtotal * self.discount_rate
        total = subtotal - discount_amount
        return round(total, 2)

    def get_job_type(self) -> str:
        return "MAINTENANCE"

    def get_cost_breakdown(self) -> Dict[str, Any]:
        subtotal = round(self.labor_cost + self.get_parts_total(), 2)
        discount_amount = round(subtotal * self.discount_rate, 2)
        return {
            "labor_cost": self.labor_cost,
            "parts_total": self.get_parts_total(),
            "package_name": self._package_name,
            "discount_rate": self.discount_rate,
            "discount_amount": discount_amount,
            "total_cost": self.calculate_cost(),
        }

    def to_dict(self) -> Dict[str, Any]:
        data = super().to_dict()
        subtotal = round(self.labor_cost + self.get_parts_total(), 2)
        discount_amount = round(subtotal * self.discount_rate, 2)
        data.update({
            "package_name": self._package_name,
            "discount_rate": self.discount_rate,
            "discount_amount": discount_amount,
            "subtotal_before_discount": subtotal,
        })
        return data
