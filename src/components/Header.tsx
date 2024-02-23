"use client";

import React from "react";
import { Input } from "./ui/input";
import Cart from "./Cart";
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
    <div className="max-w-[1200px] mx-auto flex justify-between items-center py-5 border-b-[1px] border-lightwhite">
      <h1 className="text-white">Pokemon market</h1>
      <div className="flex space-x-5 items-center">
        <Input
          type="text"
          placeholder="Search by Name"
          className="bg-transparent text-white"
          onChange={handleSearch}
        />
        <Cart />
      </div>
    </div>
  );
}

export default Header;
