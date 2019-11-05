import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IRespostaPadrao } from '../objects/resposta-padrao';
import { Observable } from 'rxjs';
import { SetorTramitacao } from '../objects/setor-tramitacao';

@Injectable()
export class BeneficioService {
    private resourcePath = '/v1/beneficios';

    constructor(private client: HttpClient) {}

    public listarServidoresComBeneficio(): Observable<IRespostaPadrao> {
        return this.client.get<IRespostaPadrao>(
            `${environment.webApiHost}${this.resourcePath}/servidores`
        );
    }

    public obterInformacoesBeneficioPorMatriculaServidor(
        matriculaServidor: string
    ): Observable<IRespostaPadrao> {
        return this.client.get<IRespostaPadrao>(
            `${environment.webApiHost}${this.resourcePath}/servidores/${matriculaServidor}`
        );
    }

    public obterTramitacoesPorBeneficio(beneficioId: number): Observable<IRespostaPadrao> {
        return this.client.get<IRespostaPadrao>(
            `${environment.webApiHost}${this.resourcePath}/${beneficioId}/tramitacoes`
        );
    }

    public tramitarProcessoBeneficio(
        beneficioId: number,
        setorDestino: SetorTramitacao
    ): Observable<IRespostaPadrao> {
        return this.client.put<IRespostaPadrao>(
            `${environment.webApiHost}${this.resourcePath}/${beneficioId}/tramitacao/${setorDestino}`,
            {}
        );
    }
}
