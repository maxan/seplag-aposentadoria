import { Servidor } from './servidor-publico';

export interface Beneficio {
    id?: number;
    tipoBeneficio?: string;
    servidor?: Servidor;
    dataConcessao?: Date;
}
