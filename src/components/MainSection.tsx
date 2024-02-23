"use client";

import React, { useState, useEffect } from "react";
import { useThemeContext } from "@/app/context/ContextProvider";
import SelectDrop from "./SelectDrop";
import Pagination from "./Pagination";
import PokemonLists from "./PokemonLists";
import SkeletonLoading from "./SkeletonLoading";

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

  const [loading, setLoading] = useState<boolean>(true);

  // update filter pokemon list from api data
  useEffect(() => {
    setLoading(true);
    setFilterPokemonLists(lists);
    setLoading(false);
  }, []);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 20;

  const offset = currentPage * itemsPerPage;
  const currentPageData = filterPokemonLists.slice(
    offset,
    offset + itemsPerPage
  );

  // update pokemon list from api data
  useEffect(() => {
    setPokemonLists(lists);
  }, [lists]);

  // rechange drop format from each api data
  function dropFormat(lists: []) {
    const reformatDrop = lists.map((item) => ({
      id: item,
      name: item,
    }));
    return reformatDrop;
  }

  // filter the list from drop down value
  function filterList(value: string, category: string) {
    // reset current page
    setCurrentPage(0);

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
      <div className="max-w-[1200px] mx-4 lg:mx-auto flex flex-col md:flex-row justify-between md:items-center mt-5">
        <h5 className="text-white mb-3">Choose Card</h5>
        <div className="flex md:flex-row flex-col md:space-x-5 space-x-0 space-y-4 md:space-y-0">
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
      <div className="max-w-[1200px] mx-4 md:mx-auto mt-5">
        {loading ? (
          <SkeletonLoading />
        ) : (
          <PokemonLists pageData={currentPageData} />
        )}
        <div className="mt-24 mb-10">
          <Pagination
            lists={filterPokemonLists as []}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default MainSection;
