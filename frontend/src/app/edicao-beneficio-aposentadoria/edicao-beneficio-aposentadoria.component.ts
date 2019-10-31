import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { BeneficioService } from '../shared/services/beneficio.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeItem } from '../shared/objects/tree-item';
import { Beneficio } from '../shared/objects/beneficio';
import { TramitacaoMovimento } from '../shared/objects/tramitacao-movimento';

const TREE_DATA: TreeItem[] = [
    {
        name: 'Identificação',
        children: [
            { id: 101, name: 'Doc 235' },
            { id: 102, name: 'Doc 5356' },
            { id: 103, name: 'Doc 236643' }
        ]
    },
    {
        name: 'Vida Funcional',
        children: [
            { id: 1011, name: 'Doc 1394' },
            {
                id: 1221,
                name: 'Doc 9387439'
            }
        ]
    },
    {
        name: 'Contagem de Tempo',
        children: [
            {
                id: 7921,
                name: 'Doc 439587'
            },
            {
                id: 92921,
                name: 'Doc 9485736'
            }
        ]
    },
    {
        name: 'Remuneração/Proventos',
        children: [
            {
                id: 7921,
                name: 'Doc 439587'
            },
            {
                id: 92921,
                name: 'Doc 9485736'
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
    tramitesMovimentos: TramitacaoMovimento[];
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
                switchMap(resposta => {
                    if (resposta.sucesso) {
                        const beneficioEncontrado: Beneficio = resposta.retorno as Beneficio;
                        return this.beneficioService
                            .obterTramitacoesPorBeneficio(beneficioEncontrado.id)
                            .pipe(
                                map(respostaTramites => {
                                    if (respostaTramites.sucesso) {
                                        return [
                                            beneficioEncontrado,
                                            respostaTramites.retorno as TramitacaoMovimento[]
                                        ] as [Beneficio, TramitacaoMovimento[]];
                                    }
                                    return ([beneficioEncontrado, [] as TramitacaoMovimento[]] as [
                                        Beneficio,
                                        TramitacaoMovimento
                                    ]) as [Beneficio, TramitacaoMovimento[]];
                                })
                            );
                    }
                    throw new Error(
                        'Ocorreu algum problema no carregamento das informações do benefício.'
                    );
                })
            )
            .subscribe(value => {
                this.beneficio = value[0];
                this.tramitesMovimentos = value[1];
            });
    }

    hasChild = (_: number, node: TreeItem) => !!node.children && node.children.length > 0;

    carregarDocumento(node) {
        console.log('SELECIONOU DOCUMENTO');
        console.log(node);
    }
}
