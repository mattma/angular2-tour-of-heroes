import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { HeroDetailComponent } from './hero-detail.component';
import { Hero } from './models/hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'hero-app',
  directives: [HeroDetailComponent],
  template: `
    <h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor="let hero of heroes | async" (click)="onSelect(hero)"
        [class.selected]="hero === selectHero">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
  
    <div *ngIf="selectHero">
      <h2>{{selectHero.name | uppercase}} is my hero</h2>
      <button (click)="goToDetail(selectHero)">View Details</button>
    </div>
  `,
  styleUrls: ['hero.component.css']
})
export class HeroAppComponent implements OnInit {
  public heroes: Promise<Array<Hero>>;
  selectHero: Hero;
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  constructor (private heroService: HeroService, private router: Router) {
  }

  ngOnInit (): void {
    this.getHeroes();
  }

  getHeroes (): void {
    this.heroes = this.heroService.getHeroes();
  }

  onSelect (hero: Hero): void {
    this.selectHero = hero;
  }

  goToDetail(hero: Hero): void {
    const link = ['HeroDetail', {id: hero.id}];
    this.router.navigate(link);
  }
}
