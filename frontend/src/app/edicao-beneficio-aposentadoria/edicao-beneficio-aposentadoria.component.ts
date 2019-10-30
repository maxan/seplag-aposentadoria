import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SERVIDORES } from '../shared/data/servidores';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-edicao-beneficio-aposentadoria',
    templateUrl: './edicao-beneficio-aposentadoria.component.html',
    styleUrls: ['./edicao-beneficio-aposentadoria.component.scss']
})
export class EdicaoBeneficioAposentadoriaComponent implements OnInit {
    servidor: Servidor;
    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.route.paramMap
            .pipe(
                map((params: ParamMap) => {
                    // TODO: Havendo um backend, substituir por chamada de service apropriado (esperando retornar apenas um objeto).
                    return SERVIDORES.filter(
                        item =>
                            item.matricula.toLowerCase() === params.get('matricula').toLowerCase()
                    );
                })
            )
            .subscribe(value => {
                if (value && value.length !== 0) {
                    this.servidor = value[0];
                }
            });
    }
}
