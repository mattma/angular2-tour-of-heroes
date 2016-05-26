import { Component, OnInit } from '@angular/core';
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
    </div>
  `,
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor (private heroService: HeroService,
               private routeParams: RouteParams) {
  }

  ngOnInit () {
    const id = +this.routeParams.get('id');
    this.heroService.getHero(id)
      .then((hero: Hero)=> this.hero = hero);
  }

  goBack() {
    window.history.back();
  }
}
