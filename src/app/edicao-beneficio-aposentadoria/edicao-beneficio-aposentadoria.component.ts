import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SERVIDORES } from '../shared/data/servidores';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-edicao-beneficio-aposentadoria',
    templateUrl: './edicao-beneficio-aposentadoria.component.html',
    styleUrls: ['./edicao-beneficio-aposentadoria.component.scss']
})
export class EdicaoBeneficioAposentadoriaComponent implements OnInit {
    servidor$: Observable<Servidor | Servidor[]>;
    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.servidor$ = this.route.paramMap.pipe(
            map((params: ParamMap) => {
                // TODO: Havendo um backend, substituir por chamada de service apropriado.
                return SERVIDORES.filter(
                    item => item.matricula.toLowerCase() === params.get('matricula').toLowerCase()
                );
            }),
            take(1)
        );
    }
}
