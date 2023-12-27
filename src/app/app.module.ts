import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';


import { HttpClientModule } from '@angular/common/http';

import {StorageService} from './services/storage.service';

import {RequestService} from './services/request.service';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule, NgChartsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },StorageService,RequestService],
  bootstrap: [AppComponent],
})
export class AppModule {}
