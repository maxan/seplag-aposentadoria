import { TipoDocumentoBeneficio } from './tipo-documento-beneficio';
import { Beneficio } from './beneficio';

export interface DocumentoBeneficio {
    id?: number;
    tipoDocumentoBeneficio?: TipoDocumentoBeneficio;
    dataCadastro?: Date;
    tipoConteudo?: string;
    nomeOriginalArquivo?: string;
    beneficio?: Beneficio;
}
