import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {delay, from, map, Observable} from "rxjs";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl = environment.API_URL!;
  private apiKey = environment.API_KEY!;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
  }

  private getUrl(path: string): string {
    return `${this.apiUrl}?${path}&apikey=${this.apiKey}`;
  }

  private async getFavoritesFromLocalStorage(): Promise<Movies.Movie[]> {
    const delay = new Promise(resolve => setTimeout(resolve, 0));

    try {
      await delay;

      const favorites = this.localStorageService.getItem('favorites');

      if (favorites) {
        return JSON.parse(favorites);
      }

      throw new Error('No favorites found');
    } catch (e) {
      localStorage.setItem('favorites', JSON.stringify([]));
      return [];
    }
  }

  searchMoviesByTitle(title: Movies.Movie["Title"], currentPage: number): Observable<{ movies: Movies.Movie[], totalPages: number, currentPage: number, searchTerm: string }> {
    return this.http.get<Movies.GetUrlResponse>(this.getUrl(`s=${title}&page=${currentPage}`))
      .pipe(
        delay(2000),
        map(response => {
          if (response.Search && response.totalResults) {
            return {
              movies: response.Search,
              totalPages: Math.ceil(parseFloat((+response.totalResults / 10).toFixed(1))),
              currentPage: currentPage + 1,
              searchTerm: title
            }
          }

          throw new Error((response as Movies.GetUrlResponseError).Error)
        }),
      );
  }

  getFavorites(): Observable<Movies.Movie[]> {
    return from(this.getFavoritesFromLocalStorage());
  }

  addToFavorites(movie: Movies.Movie): Observable<Movies.Movie[]> {
    return from(this.getFavoritesFromLocalStorage())
      .pipe(
        map(favorites => {
          const movieAlreadyAdded = favorites.find(favorite => favorite.imdbID === movie.imdbID);
          const favoritesUpdated = [...favorites, movie];

          if (!movieAlreadyAdded) {
            this.localStorageService.setItem('favorites', JSON.stringify(favoritesUpdated));
          }

          return favoritesUpdated;
        }),
      );
  }

  removeFromFavorites(movie: Movies.Movie): Observable<Movies.Movie[]> {
    return from(this.getFavoritesFromLocalStorage())
      .pipe(
        map(favorites => {
          const updatedFavorites = favorites.filter(favorite => favorite.imdbID !== movie.imdbID);

          this.localStorageService.setItem('favorites', JSON.stringify(updatedFavorites));

          return updatedFavorites;
        }),
      );
  }

  getMovieDetailsById(id: string): Observable<Movies.Movie> {
    return this.http.get<any>(this.getUrl(`i=${id}`))
  }
}
