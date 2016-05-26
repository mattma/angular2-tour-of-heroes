import { Component } from '@angular/core';
import { Hero } from './models/hero';

const HEROES: Array<Hero> = [
  { "id": 11, "name": "Mr. Nice" },
  { "id": 12, "name": "Narco" },
  { "id": 13, "name": "Bombasto" },
  { "id": 14, "name": "Celeritas" },
  { "id": 15, "name": "Magneta" },
  { "id": 16, "name": "RubberMan" },
  { "id": 17, "name": "Dynama" },
  { "id": 18, "name": "Dr IQ" },
  { "id": 19, "name": "Magma" },
  { "id": 20, "name": "Tornado" }
];

@Component({
  moduleId: module.id,
  selector: 'hero-app',
  template: `
    <h1>
      {{title}}
    </h1>
    <div *ngIf="selectHero">    
      <h2>
        {{selectHero.name}} details!
      </h2>
      <div>
        <label>id:</label>{{selectHero.id}}
      </div>
      <div>
        <label>name:</label>
        <input type="text" placeholder="name" [(ngModel)]="selectHero.name">
      </div>
    </div>
    
    <h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor="let hero of heroes" (click)="onSelect(hero)"
        [class.selected]="hero === selectHero">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
  `,
  styleUrls: ['hero.component.css']
})
export class HeroAppComponent {
  title = 'Tour of Heroes';
  public heroes = HEROES;
  selectHero: Hero;
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  onSelect (hero) {
    this.selectHero = hero;
  }
}
