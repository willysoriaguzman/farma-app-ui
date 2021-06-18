import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stockOnlyPipe' })
@Injectable()
export class StockOnlyPipe implements PipeTransform {
    transform(wordString: string): number {
        // console.log('wordString', wordString);
        // console.log('searchText', searchText);
        
        if (!wordString) { return 0; }
        //to remove highlighted tags before any processing
        // if (!searchText) { return wordString; }
        // console.log('INFO: split:',wordString.toString().split(' (')[0]);
        // const reg = /( uds /mg;
        //     var match ;
            
        // const re = new RegExp(searchText, 'gi');
        
        const value = wordString.toString().split(' (')[0];
        return parseInt(value, 10);
    }
}

