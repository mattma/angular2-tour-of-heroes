import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS, XHRBackend } from '@angular/http';
import { enableProdMode, provide } from '@angular/core';
import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { InMemoryDataService } from './app/in-memory-data.service';
import { AppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  ...HTTP_PROVIDERS,
  // replacing the default `XHRBackend`, the service that talks to the remote server,
  // with the in-memory web api service
  provide(XHRBackend, { useClass: InMemoryBackendService }), // in-mem server
  provide(SEED_DATA, { useClass: InMemoryDataService })     // in-mem server data
]);

