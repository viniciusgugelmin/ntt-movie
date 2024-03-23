import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, delay, from, map, Observable} from "rxjs";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
  }

  private getUrl(path: string): string {
    return `${this.apiUrl}?${path}&apikey=${this.apiKey}`;
  }

  private async getFavoritesFromLocalStorage(): Promise<Movies.Movie['imdbID'][]> {
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

  searchMoviesByTitle(title: Movies.Movie["Title"]): Observable<Movies.Movie[]> {
    return this.http.get<Movies.GetUrlResponse>(this.getUrl(`s=${title}`))
      .pipe(
        delay(2000),
        map(response => {
          if (response.Search) {
            return response.Search;
          }

          throw new Error((response as Movies.GetUrlResponseError).Error)
        }),
      );
  }

  getFavorites(): Observable<Movies.Movie['imdbID'][]> {
    return from(this.getFavoritesFromLocalStorage());
  }

  addToFavorites(imdbID: Movies.Movie['imdbID']): Observable<Movies.Movie['imdbID']> {
    return from(this.getFavoritesFromLocalStorage())
      .pipe(
        map(favorites => {
          if (!favorites.includes(imdbID)) {
            this.localStorageService.setItem('favorites', JSON.stringify([...favorites, imdbID]));
          }

          return imdbID;
        }),
      );
  }

  removeFromFavorites(imdbID: Movies.Movie['imdbID']): Observable<Movies.Movie['imdbID']> {
    return from(this.getFavoritesFromLocalStorage())
      .pipe(
        map(favorites => {
          this.localStorageService.setItem('favorites', JSON.stringify(favorites.filter(favorite => favorite !== imdbID)));

          return imdbID;
        }),
      );
  }

  getMovieDetailsById(id: string): Observable<Movies.Movie> {
    return this.http.get<any>(this.getUrl(`i=${id}`))
  }
}
