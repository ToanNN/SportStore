import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { StoreFirstGuard } from './routeGuards/storeFirst.guard';
import { CartDetailComponent } from './store/cartDetail.component';
import { CheckoutComponent } from './store/checkout.component';
import { StoreComponent } from './store/store.component';
import { StoreModule } from './store/store.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule,
    RouterModule.forRoot([
      { path: 'store', component: StoreComponent },
      {
        path: 'cart',
        component: CartDetailComponent,
        canActivate: [StoreFirstGuard],
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [StoreFirstGuard],
      },
      //Dynamically load routes of the Admin module
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canActivate: [StoreFirstGuard],
      },
      { path: '**', redirectTo: '/store' },
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [StoreFirstGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
