import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import {Observable} from 'rxjs/Observable';
import { HeroService } from '../shared/hero.service';
import { Hero } from '../shared/hero';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  template: `
    <h3>Top Heroes</h3>
    <div class="grid grid-pad">
      <div *ngFor="let hero of heroes | async" (click)="gotoDetail(hero)" class="col-1-4">
        <div class="module hero">
          <h4>{{hero.name}}</h4>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Observable<Array<Hero>>;

  constructor (private heroService: HeroService, private router: Router) {
  }

  ngOnInit () {
    this.getHeroes();
  }

  getHeroes (): void {
    // cherry-pick four heroes (2nd, 3rd, 4th, and 5th) with slice
    this.heroes = this.heroService.getHeroes()
      .map((heroes: Array<Hero>) => heroes.slice(1, 5));
  }

  gotoDetail (hero: Hero): void {
    // 'HeroDetail' is defined on RouteConfig
    const link = ['HeroDetail', { id: hero.id }];
    // set a route link parameters array
    // pass the array to the router's navigate method.
    this.router.navigate(link);
  }
}
