import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'documentNumber'
})
export class DocumentNumberPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (value) {
            const cpfRegex = /(^\d{3})(\d{3})(\d{3})(\d{2})/gi;
            const cnpjRegex = /(^\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/gi;
            value = value.trim();
            if (value.length <= 11) {
                value = value.padStart(11, '0');
                return value.replace(cpfRegex, '$1.$2.$3-$4');
            }
            value = value.padStart(14, '0');
            return value.replace(cnpjRegex, '$1.$2.$3/$4-$5');
        }
        return value;
    }
}
