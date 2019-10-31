import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IRespostaPadrao } from '../objects/resposta-padrao';
import { Observable } from 'rxjs';

@Injectable()
export class BeneficioService {
    private resourcePath = '/v1/beneficios';

    constructor(private client: HttpClient) {}

    public listarServidoresComBeneficio(): Observable<IRespostaPadrao> {
        return this.client.get<IRespostaPadrao>(
            `${environment.webApiHost}${this.resourcePath}/servidores`
        );
    }
}
