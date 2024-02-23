import MainSection from "@/components/MainSection";

// get pokemon data
async function getData() {
  const res = await fetch("https://api.pokemontcg.io/v2/cards");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

// get pokemon sets
async function getSets() {
  const res = await fetch("https://api.pokemontcg.io/v2/sets");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

// get pokemon rarity
async function getRarities() {
  const res = await fetch("https://api.pokemontcg.io/v2/rarities");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

// get pokemon types
async function getTypes() {
  const res = await fetch("https://api.pokemontcg.io/v2/types");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const data = await getData();
  const pokemonSets = await getSets();
  const pokemonRarities = await getRarities();
  const pokemonTypes = await getTypes();

  return (
    <main>
      <MainSection
        lists={data.data}
        pokemonSets={pokemonSets.data}
        pokemonRarities={pokemonRarities.data}
        pokemonTypes={pokemonTypes.data}
      />
    </main>
  );
}
