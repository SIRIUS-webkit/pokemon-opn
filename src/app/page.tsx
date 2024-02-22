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

export default async function Home() {
  const data = await getData();

  return (
    <main>
      <MainSection pokemonLists={data.data} />
    </main>
  );
}
