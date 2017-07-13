import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { MasonryModule } from 'angular2-masonry';

import { DataService } from './data.service';

import { AppComponent } from './app.component';
import { ArtworksComponent } from './artworks/artworks.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtworksComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MasonryModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
