"use client";

import React from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import Cart from "../Cart";
import { useThemeContext } from "@/app/context/ContextProvider";

function Header() {
  const { pokemonLists, setFilterPokemonLists } = useThemeContext();

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.toLowerCase(); // Convert input value to lowercase
    if (value) {
      const filterTemp = pokemonLists.filter((item) =>
        item.name.toLowerCase().includes(value)
      );
      setFilterPokemonLists(filterTemp);
    } else {
      setFilterPokemonLists(pokemonLists);
    }
  }

  return (
    <>
      <div className="max-w-[1200px] mx-4 lg:mx-auto flex justify-between items-center py-5 border-b-0 md:border-b-[1px] border-lightwhite">
        <h1 className="text-white text-[20px] sm:text-[40px] font-bold">
          Pokemon market
        </h1>
        <div className="flex space-x-5 items-center relative">
          <Image
            src="/search.png"
            width={20}
            height={20}
            alt="search"
            className="absolute left-7 hidden md:block"
          />
          <Input
            type="text"
            placeholder="Search by Name"
            className="bg-transparent text-white hidden md:block"
            onChange={handleSearch}
          />
          <Cart />
        </div>
      </div>
      <div className="max-w-[1200px] mx-4 block md:hidden relative mt-4">
        <Image
          src="/search.png"
          width={20}
          height={20}
          alt="search"
          className="absolute left-3 top-[10px]"
        />
        <Input
          type="text"
          placeholder="Search by Name"
          className="bg-transparent text-white"
          onChange={handleSearch}
        />
      </div>
    </>
  );
}

export default Header;
