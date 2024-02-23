"use client";

import React, { FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useThemeContext } from "@/app/context/ContextProvider";
import CartItems from "./CartItems";

const Cart: FC = () => {
  const { cartItems, setCartItems } = useThemeContext();

  function getTotal() {
    return cartItems.reduce((total, item) => {
      // Assuming price is a property of Pokemon and quantity is a property of the cart item
      const itemTotalPrice =
        item.cardmarket.prices.averageSellPrice * (item.quantity || 0);
      return total + itemTotalPrice;
    }, 0);
  }

  function resetCart() {
    setCartItems([]);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="w-16 h-12 rounded-[8px] bg-negative shadow-custom cursor-pointer"></div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-white">Cart</SheetTitle>
          <div>
            <button
              onClick={resetCart}
              type="button"
              className="text-lightwhite underline p3"
            >
              Clear all
            </button>
          </div>
        </SheetHeader>
        <div className="grid grid-cols-12 text-white border-b-[0.5px] border-lightwhite pb-2 mt-6">
          <p className="p3 col-span-3">Item</p>
          <p className="p3 col-span-6">Qty</p>
          <p className="p3 col-span-3 flex justify-end">Price</p>
        </div>
        <CartItems />
        <div className="fixed bottom-0">
          <div className="h-[100px] bg-primary text-white">
            <div className="pt-5 flex items-center space-x-[190px]">
              <p className="p3">Total card amount</p>
              <p className="p3">{cartItems.length}</p>
            </div>
            <div className="pt-5 flex justify-between">
              <p className="p3">Total price</p>
              <p className="p3">$ {getTotal().toFixed(2)}</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
