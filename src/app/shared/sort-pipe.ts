import { Pipe, PipeTransform } from '@angular/core';

@Pipe({  name: 'SortPipe' })
export class SortingPipe implements PipeTransform {
    constructor(){};
    transform(records: Array<any>, args?: any): any {
        return records.sort(function(a, b) {
            var posObj = args.pobObj;
            var aVal;
            var bVal;
            aVal = posObj[a[args.posABR]];
            bVal = posObj[b[args.posABR]];

            if(a[args.posABR] === b[args.posABR]){
                if(a[args.depth] === b[args.depth]){
                    aVal = bVal;
                }
                else if(a[args.depth] < b[args.depth]){
                    aVal = -1;
                    bVal = 1;
                }
                else if(a[args.depth] > b[args.depth]){
                    aVal = 1;
                    bVal = -1;
                }
            }
           
            if (aVal < bVal) {
                return -1;
            } else if ( aVal > bVal) {
                return 1;
            } else {
                return 0;
            }
        });
    }
}
