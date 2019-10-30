import { Component, OnInit } from '@angular/core';
import { SERVIDORES } from '../shared/data/servidores';

@Component({
    selector: 'app-lista-servidores',
    templateUrl: './lista-servidores.component.html',
    styleUrls: ['./lista-servidores.component.scss']
})
export class ListaServidoresComponent implements OnInit {
    listaServidores = SERVIDORES;

    constructor() {}

    ngOnInit() {}
}
