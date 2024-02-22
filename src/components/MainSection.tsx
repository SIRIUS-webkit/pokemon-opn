"use client";

import React, { useState, useEffect } from "react";
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
  quantity?: number;
}

interface MainSectionProps {
  pokemonLists: Pokemon[];
}

const MainSection: React.FC<MainSectionProps> = ({ pokemonLists }) => {
  const [cartItems, setCartItems] = useState<Pokemon[]>([]);

  useEffect(() => {
    const cartLocalData: any = localStorage.getItem("cart");
    if (cartLocalData) {
      setCartItems(JSON.parse(cartLocalData));
    }
  }, []);

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

  return (
    <div>
      <div className="max-w-[1200px] mx-auto flex justify-between items-center mt-5">
        <h5 className="text-white">Choose Card</h5>
      </div>
      <div className="max-w-[1200px] mx-auto mt-5">
        <div className="grid grid-cols-12 gap-8 items-stretch">
          {pokemonLists.map((pokemon) => (
            <div key={pokemon.id} className="col-span-2 relative h-[300px]">
              <Image
                src={pokemon.images.small}
                alt={pokemon.name}
                width={102}
                height={142}
                className="absolute bottom-[80px] z-10 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2"
              />

              <div className="bg-secondary text-white px-5 pb-5 pt-14 rounded-[20px] relative mt-[120px]">
                <p className="p3 text-center">{pokemon.name}</p>
                <div className="flex space-x-2 justify-center items-center mt-8">
                  <p className="text-lightwhite p3 text-center">
                    $ {pokemon.cardmarket?.prices?.averageSellPrice}
                  </p>
                  <p className="w-1 h-1 rounded-full bg-lightwhite" />
                  <p className="text-lightwhite p3 text-center">
                    {pokemon.set?.total} Cards
                  </p>
                </div>
                <Button
                  className="w-full mt-2"
                  onClick={() => addItem(pokemon)}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainSection;
