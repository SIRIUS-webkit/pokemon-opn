import { useThemeContext } from "@/app/context/ContextProvider";
import Image from "next/image";
import React, { FC } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

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

const CartItems: FC = () => {
  const { cartItems, setCartItems } = useThemeContext();

  function getItemPrice(price: number, qty: number) {
    return (price * qty).toFixed(2);
  }

  function addItem(data: Pokemon) {
    // check existing product
    const ProductExitst = cartItems.find((item) => item.id === data.id);

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
    } else {
      setCartItems([...cartItems, { ...data, quantity: 1 }]);
    }
  }

  // remove item from card
  function removeItem(data: Pokemon) {
    // check existing product
    const ProductExitst: any = cartItems.find((item) => item.id === data.id);

    if (ProductExitst.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== data.id));
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
    }
  }

  return (
    <ScrollArea className="h-[350px] w-full ">
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
              <Button className="bg-btnhover w-full">{pokemon.quantity}</Button>
            </div>
            <div className="col-span-3 flex justify-end">
              <Button className="bg-btnhover" onClick={() => addItem(pokemon)}>
                +
              </Button>
            </div>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};

export default CartItems;
