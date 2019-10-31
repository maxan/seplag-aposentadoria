import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { BeneficioService } from '../shared/services/beneficio.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

const TREE_DATA: TreeItem[] = [
    {
        name: 'Fruit',
        children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }]
    },
    {
        name: 'Vegetables',
        children: [
            {
                name: 'Green',
                children: [{ name: 'Broccoli' }, { name: 'Brussel sprouts' }]
            },
            {
                name: 'Orange',
                children: [{ name: 'Pumpkins' }, { name: 'Carrots' }]
            }
        ]
    }
];

@Component({
    selector: 'app-edicao-beneficio-aposentadoria',
    templateUrl: './edicao-beneficio-aposentadoria.component.html',
    styleUrls: ['./edicao-beneficio-aposentadoria.component.scss']
})
export class EdicaoBeneficioAposentadoriaComponent implements OnInit {
    beneficio: Beneficio;
    treeControl = new NestedTreeControl<TreeItem>(node => node.children);
    dataSource = new MatTreeNestedDataSource<TreeItem>();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private beneficioService: BeneficioService
    ) {
        this.dataSource.data = TREE_DATA;
    }

    ngOnInit() {
        this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) => {
                    return this.beneficioService.obterInformacoesBeneficioPorMatriculaServidor(
                        params.get('matricula')
                    );
                }),
                map(resposta => {
                    if (resposta.sucesso) {
                        return resposta.retorno as Beneficio;
                    }
                })
            )
            .subscribe(value => {
                this.beneficio = value;
            });
    }

    hasChild = (_: number, node: TreeItem) => !!node.children && node.children.length > 0;

    carregarDocumento(node) {
        console.log('SELECIONOU DOCUMENTO');
        console.log(node);
    }
}
