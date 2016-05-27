import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Hero } from './models/hero';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
  private heroesUrl = 'app/heroes';  // URL to web api

  constructor(private http: Http) { }

  private handleError(err: any) {
    console.error('An error has occured: ', err);
    return Promise.reject(err.message || err)
  }

  save(hero: Hero): Promise<Hero> {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }

  post(hero: Hero): Promise<Hero> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    // before we post to convert the hero object to a string
    return this.http.post(this.heroesUrl, JSON.stringify(hero), {headers})
      .toPromise()
      .then((res: Response) => res.json().data)
      .catch(this.handleError);
  }

  private put(hero: Hero): Promise<Hero> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http.put(url, JSON.stringify(hero), {headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  delete(hero: Hero) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http.delete(url, {headers})
      .toPromise()
      .catch(this.handleError);
  }

  getHeroes (): Promise<Array<Hero>> {
    // return Promise.resolve(HEROES);
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then((res: Response) => res.json().data)
      .catch(this.handleError);
  }

  getHero (id: number) {
    return this.getHeroes()
      .then(heroes => heroes.filter(hero => hero.id === id)[0]);
  }
}
