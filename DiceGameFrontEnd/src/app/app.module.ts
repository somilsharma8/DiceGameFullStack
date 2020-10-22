import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamePageComponent } from './game-page/game-page.component';
import { PlayerInfoComponent } from './player-info/player-info.component';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GamePageComponent,
    PlayerInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ],
  //exports: [GamePageComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
