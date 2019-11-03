import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IRespostaPadrao } from '../objects/resposta-padrao';
import { Observable } from 'rxjs';

@Injectable()
export class DocumentoBeneficioService {
    private resourcePath = '/v1/documentos-beneficio';

    constructor(private client: HttpClient) {}

    public obterDocumentosPorBeneficio(beneficioId: number): Observable<IRespostaPadrao> {
        return this.client.get<IRespostaPadrao>(
            `${environment.webApiHost}${this.resourcePath}/${beneficioId}/beneficio`
        );
    }

    public obterDocumento(documentoId: number): Observable<any> {
        return this.client.get(`${environment.webApiHost}${this.resourcePath}/${documentoId}`, {
            responseType: 'blob'
        });
    }
}
