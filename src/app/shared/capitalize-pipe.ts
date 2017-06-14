// Source: http://karlclement.com/blog/dev/angular2/2016/04/10/capitalize-pipe-angular2/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {

    transform(value: any) {
        if (value && (typeof value === 'string')) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
    }

}
