import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { HeroAppComponent } from '../app/hero.component';

beforeEachProviders(() => [HeroAppComponent]);

describe('App: Hero', () => {
  it('should create the app',
      inject([HeroAppComponent], (app: HeroAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'hero works!\'',
      inject([HeroAppComponent], (app: HeroAppComponent) => {
    expect(app).to.be.true;
  }));
});
