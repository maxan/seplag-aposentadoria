import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { BeneficioService } from '../shared/services/beneficio.service';

@Component({
    selector: 'app-edicao-beneficio-aposentadoria',
    templateUrl: './edicao-beneficio-aposentadoria.component.html',
    styleUrls: ['./edicao-beneficio-aposentadoria.component.scss']
})
export class EdicaoBeneficioAposentadoriaComponent implements OnInit {
    beneficio: Beneficio;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private beneficioService: BeneficioService
    ) {}

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
}
