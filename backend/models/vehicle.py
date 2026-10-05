"""
Vehicle Model
Demonstrates: Association (Vehicle HAS-A Customer owner) & Encapsulation
"""

from typing import Dict, Any, Optional
from .customer import Customer


class Vehicle:
    """
    Represents a vehicle brought into the garage.
    
    OOP Principle - Association:
    - A Vehicle is associated with a Customer (its owner).
    - Loose coupling: Customer exists independently of Vehicle.
    """

    def __init__(self, license_plate: str, brand: str, model: str, owner: Customer):
        self.license_plate = license_plate
        self.brand = brand
        self.model = model
        self.owner = owner

    # --- Property: license_plate ---
    @property
    def license_plate(self) -> str:
        return self._license_plate

    @license_plate.setter
    def license_plate(self, value: str) -> None:
        if not value or not str(value).strip():
            raise ValueError("License plate cannot be empty.")
        self._license_plate = str(value).strip().upper()

    # --- Property: brand ---
    @property
    def brand(self) -> str:
        return self._brand

    @brand.setter
    def brand(self, value: str) -> None:
        if not value or not str(value).strip():
            raise ValueError("Brand cannot be empty.")
        self._brand = str(value).strip()

    # --- Property: model ---
    @property
    def model(self) -> str:
        return self._model

    @model.setter
    def model(self, value: str) -> None:
        if not value or not str(value).strip():
            raise ValueError("Model cannot be empty.")
        self._model = str(value).strip()

    # --- Property: owner (Association) ---
    @property
    def owner(self) -> Customer:
        return self._owner

    @owner.setter
    def owner(self, value: Customer) -> None:
        if not isinstance(value, Customer):
            raise TypeError("Vehicle owner must be an instance of Customer.")
        self._owner = value

    def get_full_description(self) -> str:
        """Returns readable vehicle info."""
        return f"{self._brand} {self._model} ({self._license_plate})"

    def to_dict(self) -> Dict[str, Any]:
        """Serialize vehicle object to dictionary."""
        return {
            "license_plate": self._license_plate,
            "brand": self._brand,
            "model": self._model,
            "owner": self._owner.to_dict() if self._owner else None,
        }

    def __repr__(self) -> str:
        return f"<Vehicle plate='{self._license_plate}' model='{self._brand} {self._model}'>"
