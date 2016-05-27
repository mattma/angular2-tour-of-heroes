import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HeroService } from './hero.service';
import { HeroAppComponent } from './hero.component';
import { DashboardComponent } from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';

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
  { path: '/heroes', name: 'Heroes', component: HeroAppComponent },
  { path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent }
])
export class AppComponent {
  title: string = 'Tour of Heroes';
}
