import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, App } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProductosServiceProvider } from '../providers/productos-service/productos-service';
import { ApiqrProvider } from '../providers/apiqr/apiqr';


import { XHRBackend, RequestOptions, Http, HttpModule } from '@angular/http';
import { CommonProvider } from '../providers/common/Common';
import { InterceptorHttp } from '../providers/http-service/interceptor-service';

export function httpFactory(app: App, backend: XHRBackend, defaultOptions: RequestOptions, commonProvider:CommonProvider) {
  return new InterceptorHttp(app, backend, defaultOptions, commonProvider);
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    HttpModule,
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductosServiceProvider,
    ApiqrProvider,
    CommonProvider,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [App, XHRBackend, RequestOptions, CommonProvider]
    }
  ]
})



export class AppModule {}
