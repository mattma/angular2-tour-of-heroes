import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Hero } from './models/hero';

@Component({
  moduleId: module.id,
  selector: 'app-hero-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    </div>
  `,
  styles: []
})
export class HeroDetailComponent {
  @Input() hero: Hero;
}
