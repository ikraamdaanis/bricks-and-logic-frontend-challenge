import { Character } from "features/characters/types";

export const mockCharacter: Character = {
  episode: [
    {
      air_date: "December 16, 2013",
      characters: [
        {
          id: "1"
        },
        {
          id: "2"
        }
      ],
      created: "2017-11-10T12:56:34.022Z",
      episode: "S01E03",
      id: "3",
      name: "Anatomy"
    }
  ],
  gender: "Male",
  id: "12",
  location: {
    id: "5",
    name: "Anatomy Park"
  },
  name: "Alexander",
  image: "https://rickandmortyapi.com/api/character/avatar/12.jpeg",
  origin: {
    id: "1",
    name: "Earth (C-137)"
  },
  species: "Human",
  status: "Dead",
  type: ""
};
