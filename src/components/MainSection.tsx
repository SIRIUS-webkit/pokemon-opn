"use client";

import React, { useState, useEffect } from "react";
import { useThemeContext } from "@/app/context/ContextProvider";
import SelectDrop from "./SelectDrop";
import Pagination from "./Pagination";
import PokemonLists from "./PokemonLists";

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

interface MainSectionProps {
  lists: Pokemon[];
  pokemonSets: [];
  pokemonRarities: [];
  pokemonTypes: [];
}

const MainSection: React.FC<MainSectionProps> = ({
  lists,
  pokemonSets,
  pokemonRarities,
  pokemonTypes,
}) => {
  const {
    filterConfig,
    setFilterConfig,
    pokemonLists,
    setPokemonLists,
    filterPokemonLists,
    setFilterPokemonLists,
  } = useThemeContext();

  useEffect(() => {
    setFilterPokemonLists(lists);
  }, []);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 20;

  const offset = currentPage * itemsPerPage;
  const currentPageData = filterPokemonLists.slice(
    offset,
    offset + itemsPerPage
  );

  useEffect(() => {
    setPokemonLists(lists);
  }, [lists]);

  function dropFormat(lists: []) {
    const reformatDrop = lists.map((item) => ({
      id: item,
      name: item,
    }));
    return reformatDrop;
  }

  function filterList(value: string, category: string) {
    // Update filterConfig with the selected category and value
    setFilterConfig((prevFilterConfig) => ({
      ...prevFilterConfig,
      [category]: value,
    }));

    // Apply filters based on selected values in each category
    let filterTemp: Pokemon[] = pokemonLists;

    if (category === "set") {
      filterTemp = filterTemp.filter((item) => item.set.name === value);

      if (filterConfig["rarity"]) {
        filterTemp = filterTemp.filter(
          (item) => item.rarity === filterConfig["rarity"]
        );
      }
      if (filterConfig["pokemon_type"]) {
        filterTemp = filterTemp.filter((item) =>
          (item.types as string[]).includes(filterConfig["pokemon_type"])
        );
      }
    }

    if (category === "rarity") {
      filterTemp = filterTemp.filter((item) => item.rarity === value);

      if (filterConfig["set"]) {
        filterTemp = filterTemp.filter(
          (item) => item.set.name === filterConfig["set"]
        );
      }
      if (filterConfig["pokemon_type"]) {
        filterTemp = filterTemp.filter((item) =>
          (item.types as string[]).includes(filterConfig["pokemon_type"])
        );
      }
    }

    if (category === "pokemon_type") {
      filterTemp = filterTemp.filter((item) =>
        (item.types as string[]).includes(value)
      );

      if (filterConfig["set"]) {
        filterTemp = filterTemp.filter(
          (item) => item.set.name === filterConfig["set"]
        );
      }
      if (filterConfig["rarity"]) {
        filterTemp = filterTemp.filter(
          (item) => item.rarity === filterConfig["rarity"]
        );
      }
    }

    setFilterPokemonLists(filterTemp);
  }

  return (
    <div>
      <div className="max-w-[1200px] mx-auto flex justify-between items-center mt-5">
        <h5 className="text-white">Choose Card</h5>
        <div className="flex space-x-5">
          <SelectDrop
            lists={pokemonSets.slice(0, 8) as []}
            label="Set"
            category="set"
            handleChange={filterList as () => {}}
          />
          <SelectDrop
            lists={dropFormat(pokemonRarities) as []}
            label="Rarity"
            category="rarity"
            handleChange={filterList as () => {}}
          />
          <SelectDrop
            lists={dropFormat(pokemonTypes) as []}
            label="Type"
            category="pokemon_type"
            handleChange={filterList as () => {}}
          />
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-5">
        <PokemonLists pageData={currentPageData} />
        <div className="mt-24 mb-10">
          <Pagination
            lists={filterPokemonLists as []}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default MainSection;
