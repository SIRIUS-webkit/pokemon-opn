"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface ContextProviderProps {
  children: ReactNode;
}

interface ThemeContextValues {
  cartItems: any[]; // Adjust the type according to your cart item structure
  setCartItems: Dispatch<SetStateAction<any[]>>;
  filterConfig: {
    set: string;
    pokemon_type: string;
    rarity: string;
    search: string;
  };
  setFilterConfig: Dispatch<
    SetStateAction<{
      set: string;
      pokemon_type: string;
      rarity: string;
      search: string;
    }>
  >;
  pokemonLists: any[]; // Adjust the type according to your Pokemon list structure
  setPokemonLists: Dispatch<SetStateAction<any[]>>;
  filterPokemonLists: any[]; // Adjust the type according to your filtered Pokemon list structure
  setFilterPokemonLists: Dispatch<SetStateAction<any[]>>;
}

const ThemeContext = createContext<ThemeContextValues>(
  {} as ThemeContextValues
);

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [filterConfig, setFilterConfig] = useState({
    set: "",
    pokemon_type: "",
    rarity: "",
    search: "",
  });
  const [pokemonLists, setPokemonLists] = useState<any[]>([]);
  const [filterPokemonLists, setFilterPokemonLists] = useState<any[]>([]);

  return (
    <ThemeContext.Provider
      value={{
        cartItems,
        setCartItems,
        filterConfig,
        setFilterConfig,
        pokemonLists,
        setPokemonLists,
        filterPokemonLists,
        setFilterPokemonLists,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
