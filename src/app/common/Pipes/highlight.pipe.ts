import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'highlightPipe' })
@Injectable()
export class HighlightPipe implements PipeTransform {
    transform(wordString: any, searchText: string): string {
        // console.log('lists', wordString);
        // console.log('searchText', searchText);
        
        if (!wordString) { return ''; }
        //to remove highlighted tags before any processing
        
        if (!searchText) { return wordString; }
        
        const re = new RegExp(searchText, 'gi');
        const value = wordString = wordString.replace(re, "<span class='highlight-search'>" + searchText.toUpperCase() + "</span>");
        return value;
    }
}

