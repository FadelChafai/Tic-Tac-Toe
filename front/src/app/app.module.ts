import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {GameComponent} from './game/game.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {MoveService} from './game/move.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'game', component: GameComponent },
      { path: '**', redirectTo: 'game', pathMatch : 'full' }
    ])
  ],
  providers: [
    MoveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
