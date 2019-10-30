import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ListaServidoresComponent } from './lista-servidores/lista-servidores.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DocumentNumberPipe } from './shared/pipes/document-number.pipe';
import { EdicaoBeneficioAposentadoriaComponent } from './edicao-beneficio-aposentadoria/edicao-beneficio-aposentadoria.component';

@NgModule({
    declarations: [
        AppComponent,
        ListaServidoresComponent,
        DocumentNumberPipe,
        EdicaoBeneficioAposentadoriaComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot([
            {
                path: '',
                component: ListaServidoresComponent
            },
            {
                path: 'beneficio/aposentadoria/:matricula',
                component: EdicaoBeneficioAposentadoriaComponent
            }
        ]),
        NgbModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
