import { Beneficio } from './beneficio';

export interface TramitacaoMovimento {
    id?: number;
    beneficio?: Beneficio;
    setorOrigem?: string;
    setorDestino?: string;
    dataMovimentacao?: Date;
}
