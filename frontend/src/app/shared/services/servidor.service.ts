import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IRespostaPadrao } from '../objects/resposta-padrao';
import { environment } from 'src/environments/environment';

@Injectable()
export class ServidorService {
    private resourcePath = '/v1/servidores';

    constructor(private client: HttpClient) {}

    public listarTodos(): Observable<IRespostaPadrao> {
        return this.client.get<IRespostaPadrao>(`${environment.webApiHost}${this.resourcePath}`);
    }
}
