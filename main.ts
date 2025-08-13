import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { provideIonicAngular } from '@ionic/angular/standalone';


import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

import { addOutline, heart, heartOutline, ellipsisVertical, backspaceOutline, chevronDownOutline, chevronUpOutline, qrCode, wallet, logOutOutline, contrast, timerOutline  } from 'ionicons/icons';
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});

import { addIcons } from 'ionicons';
import { provideAnimations } from '@angular/platform-browser/animations';
addIcons({
  addOutline,
  heart,
  heartOutline,
  ellipsisVertical,
  backspaceOutline,
  chevronDownOutline, 
  chevronUpOutline,
  qrCode,
  wallet,
 logOutOutline,
 contrast,
 timerOutline
}); 

