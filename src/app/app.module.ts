import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListagemComponent } from './listagem/listagem.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material';

@NgModule({
    declarations: [AppComponent, ListagemComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([{ path: '', component: ListagemComponent }]),
        MatTableModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
