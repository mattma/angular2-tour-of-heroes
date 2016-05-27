import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HeroService } from './shared/hero.service';
import { HeroComponent } from './+hero';
import { DashboardComponent } from './+dashboard';
import { HeroDetailComponent } from './+hero-detail';

@Component({
  moduleId: module.id,
  selector: 'app',
  providers: [HeroService, ROUTER_PROVIDERS],
  directives: [...ROUTER_DIRECTIVES],
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
      <a [routerLink]="['Heroes']">Heroes</a>    
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
@RouteConfig([
  { path: '/dashboard', name: 'Dashboard', component: DashboardComponent, useAsDefault: true },
  { path: '/heroes', name: 'Heroes', component: HeroComponent },
  { path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent }
])
export class AppComponent {
  title: string = 'Tour of Heroes';
}
