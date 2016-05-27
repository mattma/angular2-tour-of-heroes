import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { HeroService } from './hero.service';
import { Hero } from './models/hero';

@Component({
  moduleId: module.id,
  selector: 'app-hero-detail',
  template: `
    <div *ngIf="hero">    
      <h2>
        {{hero.name}} details!
      </h2>
      <div>
        <label>id:</label>{{hero.id}}
      </div>
      <div>
        <label>name:</label>
        <input type="text" placeholder="name" [(ngModel)]="hero.name">
      </div>
      <button (click)="goBack()">Back</button>
      <button (click)="save()">Save</button>
    </div>
  `,
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  error: any;
  navigated = false; // true if navigated here
  @Output() close = new EventEmitter();

  constructor (private heroService: HeroService,
               private routeParams: RouteParams) {
  }

  private save() {
    this.heroService.save(this.hero)
      .then((hero: Hero) => {
        this.hero = hero;
        this.goBack(hero);
      })
      .catch((err: Error) => this.error = err);
  }

  ngOnInit () {
    let id = this.routeParams.get('id');

    if (id !== null) {
      this.navigated = true;
      this.heroService.getHero(+id)
        .then((hero: Hero) => this.hero = hero);
    } else {
      this.navigated = false;
      this.hero = new Hero();
    }
  }

  goBack(savedHero: Hero = null) {
    this.close.emit(savedHero);

    if (this.navigated) {
      window.history.back();
    }
  }
}
