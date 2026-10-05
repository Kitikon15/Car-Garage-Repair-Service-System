"""
Part Model
Demonstrates: Encapsulation (Stock state control, guarded mutations via deduct_stock)
"""

from typing import Dict, Any


class Part:
    """
    Represents an auto part/component stocked in the garage inventory.
    
    OOP Principle - Encapsulation:
    - Internal state (_stock_qty, _price) is protected from arbitrary external corruption.
    - Stock deduction is guarded by domain rules in `deduct_stock(qty)`.
    """

    def __init__(self, part_id: str, part_name: str, price: float, stock_qty: int):
        self.part_id = part_id
        self.part_name = part_name
        self.price = price
        self.stock_qty = stock_qty

    # --- Property: part_id ---
    @property
    def part_id(self) -> str:
        return self._part_id

    @part_id.setter
    def part_id(self, value: str) -> None:
        if not value or not str(value).strip():
            raise ValueError("Part ID cannot be empty.")
        self._part_id = str(value).strip()

    # --- Property: part_name ---
    @property
    def part_name(self) -> str:
        return self._part_name

    @part_name.setter
    def part_name(self, value: str) -> None:
        if not value or not str(value).strip():
            raise ValueError("Part name cannot be empty.")
        self._part_name = str(value).strip()

    # --- Property: price ---
    @property
    def price(self) -> float:
        return self._price

    @price.setter
    def price(self, value: float) -> None:
        val = float(value)
        if val < 0:
            raise ValueError("Part price cannot be negative.")
        self._price = round(val, 2)

    # --- Property: stock_qty ---
    @property
    def stock_qty(self) -> int:
        return self._stock_qty

    @stock_qty.setter
    def stock_qty(self, value: int) -> None:
        val = int(value)
        if val < 0:
            raise ValueError("Stock quantity cannot be negative.")
        self._stock_qty = val

    # --- Encapsulated Business Methods ---
    def deduct_stock(self, qty: int) -> int:
        """
        Deducts a specified quantity from the inventory stock.
        
        Guards:
        - Quantity must be positive integer.
        - Cannot deduct more than available in stock.
        
        Returns:
            The remaining stock quantity.
        """
        qty = int(qty)
        if qty <= 0:
            raise ValueError(f"Deduction quantity must be positive. Received: {qty}")
        if qty > self._stock_qty:
            raise ValueError(
                f"Insufficient stock for '{self._part_name}' (ID: {self._part_id}). "
                f"Available: {self._stock_qty}, Requested: {qty}"
            )
        self._stock_qty -= qty
        return self._stock_qty

    def add_stock(self, qty: int) -> int:
        """Restocks the part by a given quantity."""
        qty = int(qty)
        if qty <= 0:
            raise ValueError(f"Restock quantity must be positive. Received: {qty}")
        self._stock_qty += qty
        return self._stock_qty

    def is_low_stock(self, threshold: int = 5) -> bool:
        """Checks if inventory has fallen below safety threshold."""
        return self._stock_qty <= threshold

    # --- Property: image_url ---
    @property
    def image_url(self) -> str:
        return getattr(self, "_image_url", f"/images/parts/{self._part_id}.jpg")

    @image_url.setter
    def image_url(self, value: str) -> None:
        self._image_url = str(value)

    def to_dict(self) -> Dict[str, Any]:
        """Serialize part object to dictionary."""
        return {
            "part_id": self._part_id,
            "part_name": self._part_name,
            "price": self._price,
            "stock_qty": self._stock_qty,
            "is_low_stock": self.is_low_stock(),
            "image_url": self.image_url,
        }

    def __repr__(self) -> str:
        return f"<Part id='{self._part_id}' name='{self._part_name}' price={self._price} qty={self._stock_qty}>"
