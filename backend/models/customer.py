"""
Customer Model
Demonstrates: Encapsulation (validation, property getters/setters, private state)
"""

from typing import Dict, Any


class Customer:
    """
    Represents a garage customer.
    
    OOP Principle - Encapsulation:
    - Attributes (_customer_id, _name, _phone) are private/protected.
    - Public getters and setters with validation protect data integrity.
    """

    def __init__(self, customer_id: str, name: str, phone: str):
        self.customer_id = customer_id
        self.name = name
        self.phone = phone

    # --- Property: customer_id ---
    @property
    def customer_id(self) -> str:
        return self._customer_id

    @customer_id.setter
    def customer_id(self, value: str) -> None:
        if not value or not str(value).strip():
            raise ValueError("Customer ID cannot be empty.")
        self._customer_id = str(value).strip()

    # --- Property: name ---
    @property
    def name(self) -> str:
        return self._name

    @name.setter
    def name(self, value: str) -> None:
        if not value or not str(value).strip():
            raise ValueError("Customer name cannot be empty.")
        self._name = str(value).strip()

    # --- Property: phone ---
    @property
    def phone(self) -> str:
        return self._phone

    @phone.setter
    def phone(self, value: str) -> None:
        clean_phone = str(value).strip()
        if not clean_phone:
            raise ValueError("Phone number cannot be empty.")
        self._phone = clean_phone

    def to_dict(self) -> Dict[str, Any]:
        """Serialize customer object to dictionary."""
        return {
            "customer_id": self._customer_id,
            "name": self._name,
            "phone": self._phone,
        }

    def __repr__(self) -> str:
        return f"<Customer id='{self._customer_id}' name='{self._name}'>"
