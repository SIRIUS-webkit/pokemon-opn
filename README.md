# Project Description

The project provides a showcase for Pokemon cards, including prices and available stock. The project was created with [Next JS](https://nextjs.org/). [Shadcn UI](https://ui.shadcn.com/) and [Tailwind CSS](https://tailwindcss.com/) are used for layout, responsive, and user interface design. The useContext method of react was utilized for state management.

For Pokemon data, the domain https://api.pokemontcg.io/v2/cards was utilized to obtain all Pokémon cards. There are only 20 cards each page, with pagination.

The Pokémon sets can be obtained via https://api.pokemontcg.io/v2/sets. There are many sets found, but only eight are displayed for the set dropdown.

The Pokémon rarity can be obtained via https://api.pokemontcg.io/v2/rarities. All of the data are displyed for the rarity dropdown.

The Pokémon types can be obtained via https://api.pokemontcg.io/v2/types. All of the data are displyed for the type dropdown.

There is also a serach input box to filter Pokemon cards.

After installing Shadcn Ui, there is a default UI with CSS. The specified color codes overwrite the existing CSS.

The project was hosted on vercel: [pokemon-opn](https://pokemon-opn.vercel.app/)

## Tech Stacks

| Tech      | Use               |
| --------- | ----------------- |
| Framework | Next Js with TS   |
| UI        | Shadcn & Tailwind |
| Testing   | Jet               |

Input, Sheet, Toast, Button, Scroll-Area, Select, and Skeleton are all used for UI. Shadcn is simple to maintain and replace the CSS.

For testing, there is only one file for test EmptyList Component file.

## Installation

After clone the repo, run the following command.

```bash
npm install

npm run dev
```

After that, the dev server was started at localhost:3000.

To check the testing file, run this code

```bash
npm test
```
