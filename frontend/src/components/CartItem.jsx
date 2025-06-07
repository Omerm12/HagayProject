"use client";

import React, { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";


const CartItem = ({ item, quantity, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="border-b py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
        <div>
          <h4 className="text-lg font-bold text-right">{item.title}</h4>
          <p className="text-sm text-gray-600">{item.unit || "יחידה"}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onDecrease}><Minus /></button>
        <span>{quantity}</span>
        <button onClick={onIncrease}><Plus /></button>
        <span className="font-bold">₪{(item.price_per_unit * quantity).toFixed(2)}</span>
        <button onClick={onRemove} className="text-red-600 ml-2"><Trash2 /></button>
      </div>
    </div>
  );
};
export default CartItem;


