import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { StoreModule } from '@ngrx/store';
import {canvasReducer} from "./store/canvas.reducer";
import {NeuralNetworkService} from "./services/neural-network/neural-network.service";
import {ReactiveFormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({canvas: canvasReducer}, {}),
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  providers: [NeuralNetworkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
