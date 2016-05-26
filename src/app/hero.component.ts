import { Component, OnInit } from '@angular/core';
import { HeroDetailComponent } from './hero-detail.component';
import { Hero } from './models/hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'hero-app',
  directives: [HeroDetailComponent],
  providers: [HeroService],
  template: `
    <h1>
      {{title}}
    </h1>
    <h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor="let hero of heroes | async" (click)="onSelect(hero)"
        [class.selected]="hero === selectHero">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <app-hero-detail [hero]="selectHero"></app-hero-detail>
  `,
  styleUrls: ['hero.component.css']
})
export class HeroAppComponent implements OnInit {
  title: string = 'Tour of Heroes';
  public heroes: Promise<Array<Hero>>;
  selectHero: Hero;
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }

  onSelect (hero): void {
    this.selectHero = hero;
  }
}
