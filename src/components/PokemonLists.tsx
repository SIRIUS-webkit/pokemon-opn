import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useThemeContext } from "@/app/context/ContextProvider";
import { cn } from "@/lib/utils";
import EmptyList from "./EmptyList";
import { useToast } from "@/components/ui/use-toast";

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
  rarity: string;
  set: {
    total: number;
    name: string;
  };
  types: [];
  images: {
    large: string;
    small: string;
  };
  quantity?: number;
}

const PokemonLists = ({ pageData }: { pageData: any }) => {
  const { cartItems, setCartItems } = useThemeContext();
  const { toast } = useToast();

  function addItem(data: Pokemon) {
    // show notification
    toast({
      title: "Item was added to the cart.",
      description:
        "If there is an existing item, the quantity will be increased.",
    });

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

  if (pageData.length === 0) {
    return <EmptyList />;
  }

  return (
    <div className="grid grid-cols-12 gap-y-9 gap-x-0 sm:gap-8 mb-8">
      {pageData.map((pokemon: any) => (
        <div
          key={pokemon.id}
          className="col-span-12 lg:col-span-2 md:col-span-4 sm:col-span-6 relative h-[300px]"
        >
          <Image
            src={pokemon.images.small}
            alt={pokemon.name}
            width={102}
            height={142}
            className="absolute bottom-[80px] z-10 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2"
          />

          <div className="bg-secondary text-white px-5 pb-5 pt-14 rounded-[20px] relative mt-[110px]">
            <p className="p3 text-center h-9">{pokemon.name}</p>
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
              className={cn(
                pokemon.set?.total === 0 && "bg-[#312f3c]",
                "w-full mt-2"
              )}
              disabled={pokemon.set?.total === 0}
              onClick={() => addItem(pokemon)}
            >
              <img src="/shopping-bag.png" alt="bag" className="w-4 h-4 mr-2" />
              Add to cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonLists;
