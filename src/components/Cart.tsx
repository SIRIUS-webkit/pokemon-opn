"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";

interface Pokemon {
  id: string;
  name: string;
  cardmarket: {
    prices: {
      averageSellPrice: number;
    };
    updatedAt: string;
    url: string;
  };
  set: {
    total: number;
  };
  images: {
    large: string;
    small: string;
  };
  quantity?: number | undefined;
}

function Cart() {
  const [cartItems, setCartItems] = useState<Pokemon[]>([]);
  console.log(cartItems[0]);
  // get local storage data
  useEffect(() => {
    const cartLocalData: any = localStorage.getItem("cart");
    if (cartLocalData) {
      setCartItems(JSON.parse(cartLocalData));
    }
  }, []);

  function getItemPrice(price: number, qty: number) {
    return (price * qty).toFixed(2);
  }

  function getTotal() {
    return cartItems.reduce((total, item) => {
      // Assuming price is a property of Pokemon and quantity is a property of the cart item
      const itemTotalPrice =
        item.cardmarket.prices.averageSellPrice * (item.quantity || 0);
      return total + itemTotalPrice;
    }, 0);
  }

  function addItem(data: Pokemon) {
    // check existing product
    const ProductExitst = cartItems.find((item) => item.id === data.id);
    let checkItems = [];

    // if have, update only quantity
    if (ProductExitst) {
      setCartItems(
        cartItems.map((item) =>
          item.id === data.id
            ? {
                ...ProductExitst,
                quantity: (item.quantity || 0) + 1,
              }
            : item
        )
      );
      checkItems = cartItems.map((item) =>
        item.id === data.id
          ? {
              ...ProductExitst,
              quantity: (item.quantity || 0) + 1,
            }
          : item
      );
    } else {
      setCartItems([...cartItems, { ...data, quantity: 1 }]);
      checkItems = [...cartItems, { ...data, quantity: 1 }];
    }

    // set to localstorage
    localStorage.setItem("cart", JSON.stringify(checkItems));
  }

  // remove item from card
  function removeItem(data: Pokemon) {
    // check existing product
    const ProductExitst: any = cartItems.find((item) => item.id === data.id);
    let checkItems = [];

    if (ProductExitst.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== data.id));
      checkItems = cartItems.filter((item) => item.id !== data.id);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === data.id
            ? {
                ...ProductExitst,
                quantity: ProductExitst.quantity - 1,
              }
            : item
        )
      );
      checkItems = cartItems.map((item) =>
        item.id === data.id
          ? {
              ...ProductExitst,
              quantity: ProductExitst.quantity - 1,
            }
          : item
      );
    }
    localStorage.setItem("cart", JSON.stringify(checkItems));
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="w-12 h-12 rounded-[8px] bg-negative cursor-pointer"></div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-12 text-white border-b-[0.5px] border-lightwhite pb-2">
          <p className="p3 col-span-3">Item</p>
          <p className="p3 col-span-6">Qty</p>
          <p className="p3 col-span-3 flex justify-end">Price</p>
        </div>
        {cartItems.map((pokemon) => (
          <div key={pokemon.id}>
            <div className="grid grid-cols-12 text-white py-5">
              <div className="col-span-3">
                <Image
                  src={pokemon.images.small}
                  alt={pokemon.name}
                  width={44}
                  height={60}
                />
              </div>
              <div className="col-span-6">
                <p className="p3">{pokemon.name}</p>
                <p className="p3">
                  $ {pokemon.cardmarket?.prices?.averageSellPrice}
                </p>
              </div>
              <div className="col-span-3 flex justify-end">
                <p className="p3">
                  ${" "}
                  {getItemPrice(
                    pokemon.cardmarket?.prices?.averageSellPrice,
                    pokemon.quantity
                  )}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-12 text-white">
              <div className="col-span-3">
                <Button
                  className="bg-btnhover"
                  onClick={() => removeItem(pokemon)}
                >
                  -
                </Button>
              </div>
              <div className="col-span-6">
                <Button className="bg-btnhover w-full">
                  {pokemon.quantity}
                </Button>
              </div>
              <div className="col-span-3 flex justify-end">
                <Button
                  className="bg-btnhover"
                  onClick={() => addItem(pokemon)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        ))}
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
}

export default Cart;
