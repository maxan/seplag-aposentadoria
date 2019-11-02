import { DocumentoBeneficio } from './documento-beneficio';

export interface ItemTreeDocumentoBeneficio extends DocumentoBeneficio {
    key: string;
    name: string;
    children?: ItemTreeDocumentoBeneficio[];
}
