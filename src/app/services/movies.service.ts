import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, delay, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {
  }

  private getUrl(path: string): string {
    return `${this.apiUrl}?${path}&apikey=${this.apiKey}`;
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

  getMovieDetailsById(id: string): Observable<Movies.Movie> {
    return this.http.get<any>(this.getUrl(`i=${id}`))
  }
}
