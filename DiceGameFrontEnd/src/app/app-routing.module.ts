import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { GamePageComponent } from './game-page/game-page.component';
import { PlayerInfoComponent } from './player-info/player-info.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'gamePage', component: GamePageComponent },
  { path: 'home', component: PlayerInfoComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{
    provide: LocationStrategy, useClass: HashLocationStrategy
  }]
})
export class AppRoutingModule { }
