import { Component, OnInit } from '@angular/core';
import { SERVIDORES } from '../shared/data/servidores';
import { ServidorService } from '../shared/services/servidor.service';

@Component({
    selector: 'app-lista-servidores',
    templateUrl: './lista-servidores.component.html',
    styleUrls: ['./lista-servidores.component.scss']
})
export class ListaServidoresComponent implements OnInit {
    listaServidores: Servidor[] = [];

    constructor(private servidorService: ServidorService) {}

    ngOnInit() {
        this.servidorService.listarTodos().subscribe(resposta => {
            if (resposta.sucesso) {
                this.listaServidores = resposta.retorno as Servidor[];
            }
        });
    }
}
