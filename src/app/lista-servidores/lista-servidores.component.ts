import { Component, OnInit } from '@angular/core';

const SERVIDORES: Servidor[] = [
    {
        nome: 'José da Siva',
        cpf: '92792208023',
        matricula: 'CB10102'
    },
    {
        nome: 'Marcos Pinheiro',
        cpf: '71132403057',
        matricula: 'CB10103'
    },
    {
        nome: 'Marta Soares',
        cpf: '50995969086',
        matricula: 'CB10107'
    },
    {
        nome: 'Jennifen Gomes',
        cpf: '84785399058',
        matricula: 'CB10199'
    }
];

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
