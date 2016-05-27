import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import { Hero } from './hero';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';

@Injectable()
export class HeroService {
  private heroesUrl = 'app/heroes';  // URL to web api

  private post(hero: Hero): Observable<Hero> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    // before we post to convert the hero object to a string
    return this.http.post(this.heroesUrl, JSON.stringify(hero), {headers})
      .map((res: Response) => res.json().data);
  }

  private put(hero: Hero): Observable<Hero> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http.put(url, JSON.stringify(hero), {headers})
      .mapTo(hero);
  }

  constructor(private http: Http) { }

  save(hero: Hero): Observable<Hero> {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }

  delete(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this.http.delete(url, {headers});
  }

  getHeroes (): Observable<Array<Hero>> {
    return this.http.get(this.heroesUrl)
      .map((res: Response) => res.json().data);
  }

  getHero (id: number): Observable<Hero> {
    return this.getHeroes()
      .map((heroes: Array<Hero>) =>
        heroes.filter((hero: Hero) => hero.id === id)[0]
      );
  }
}
