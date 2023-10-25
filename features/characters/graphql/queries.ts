import { gql } from "graphql-request";

/** Type `CharacterResponse` */
export const characterQuery = gql`
  query getCharacter($characterId: ID!) {
    character(id: $characterId) {
      episode {
        air_date
        characters {
          id
        }
        created
        episode
        id
        name
      }
      gender
      id
      location {
        id
        name
      }
      name
      image
      origin {
        id
        name
      }
      species
      status
      type
    }
  }
`;

/** Type `CharactersResponse` */
export const charactersQuery = gql`
  query getCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        gender
        id
        location {
          id
          name
        }
        name
        image
        origin {
          id
          name
        }
        species
        status
        type
      }
    }
  }
`;
