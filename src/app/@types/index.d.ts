namespace Movies {
  export interface GetUrlResponse {
    Search?: (Movie)[] | null;
  }

  export interface GetUrlResponseError {
    Error: string;
    Response: string;
  }

  export interface Movie {
    Title: string;
    Year: string;
    Rated?: string;
    Released?: string;
    Runtime?: string;
    Genre?: string;
    Director?: string;
    Writer?: string;
    Actors?: string;
    Plot?: string;
    Language?: string;
    Country?: string;
    Awards?: string;
    Poster: string;
    Ratings?: (Ratings)[] | null;
    Metascore?: string;
    imdbRating?: string;
    imdbVotes?: string;
    imdbID: string;
    Type: string;
    DVD?: string;
    BoxOffice?: string;
    Production?: string;
    Website?: string;
  }

  export interface Ratings {
    Source: string;
    Value: string;
  }
}

namespace User {
  export interface Properties {
    name: string;
  }
}
