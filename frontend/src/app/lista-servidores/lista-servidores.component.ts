import { Component, OnInit } from '@angular/core';
import { SERVIDORES } from '../shared/data/servidores';
import { ServidorService } from '../shared/services/servidor.service';
import { BeneficioService } from '../shared/services/beneficio.service';

@Component({
    selector: 'app-lista-servidores',
    templateUrl: './lista-servidores.component.html',
    styleUrls: ['./lista-servidores.component.scss']
})
export class ListaServidoresComponent implements OnInit {
    listaServidores: Servidor[] = [];

    constructor(private beneficioService: BeneficioService) {}

    ngOnInit() {
        this.beneficioService.listarServidoresComBeneficio().subscribe(resposta => {
            if (resposta.sucesso) {
                this.listaServidores = resposta.retorno as Servidor[];
            }
        });
    }
}
