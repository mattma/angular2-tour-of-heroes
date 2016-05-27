import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
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
    <button (click)="addHero()">Add New Hero</button>
    <div *ngIf="addingHero">
      <app-hero-detail (close)="close($event)"></app-hero-detail>
    </div>
    <ul class="heroes">
      <li *ngFor="let hero of heroes | async" (click)="onSelect(hero)"
        [class.selected]="hero === selectHero">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
        <button class="delete-button" (click)="delete(hero, $event)">Delete</button>
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
  addingHero: boolean = false;
  error: any;

  constructor (private heroService: HeroService, private router: Router) {
  }

  ngOnInit (): void {
    this.getHeroes();
  }

  addHero () {
    this.addingHero = true;
    this.selectHero = null;
  }

  close (savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) {
      this.getHeroes();
    }
  }

  delete (hero: Hero, event: any) {
    event.stopPropagation();

    this.heroService.delete(hero)
      .then((res: Response) => {
        this.heroes = this.heroes
          .then(_heroes => _heroes.filter((_hero: Hero) => _hero !== hero));

        console.log('this.heroes: ', this.heroes);
        if (this.selectHero === hero) {
          this.selectHero = null;
        }
      })
      .catch((err: Error) => this.error = err);
  }

  getHeroes (): void {
    this.heroes = this.heroService.getHeroes();
  }

  onSelect (hero: Hero): void {
    this.selectHero = hero;
    this.addingHero = false;
  }

  goToDetail (hero: Hero): void {
    const link = ['HeroDetail', { id: hero.id }];
    this.router.navigate(link);
  }
}
