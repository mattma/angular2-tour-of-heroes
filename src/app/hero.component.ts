import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router-deprecated';
import { Observable } from 'rxjs/Observable';
import { HeroDetailComponent } from './hero-detail.component';
import { Hero } from './models/hero';
import { HeroService } from './hero.service';
import 'rxjs/add/operator/map';

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
  heroes: Observable<Array<Hero>>;
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
      .subscribe(() => {
        this.heroes = this.heroes.map((heroes: Array<Hero>) =>
          heroes.filter((h: Hero) => h !== hero));
        if (this.selectHero === hero) {
          this.selectHero = null;
        }
      });
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
