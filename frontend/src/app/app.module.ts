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
import { ServidorService } from './shared/services/servidor.service';
import { HttpClientModule } from '@angular/common/http';
import { BeneficioService } from './shared/services/beneficio.service';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from 'ng2-file-upload';
import { DocumentoBeneficioService } from './shared/services/documento-beneficio.service';

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
        HttpClientModule,
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
        NgbModule,
        MatIconModule,
        MatButtonModule,
        MatTreeModule,
        FileUploadModule
    ],
    providers: [ServidorService, BeneficioService, DocumentoBeneficioService],
    bootstrap: [AppComponent]
})
export class AppModule {}
