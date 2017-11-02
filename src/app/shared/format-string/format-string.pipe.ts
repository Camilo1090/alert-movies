import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatString'
})
export class FormatStringPipe implements PipeTransform {

  transform(value: string, from: string): string {
    if (from === 'markdown') {
      value = value.replace(/(\*\*|__)(.*?)(\*\*|__)/gi, '<strong>$2</strong>');
      value = value.replace(/[*_](.*?)[*_]/gi, '<em>$1</em>');
    }
    return value;
  }

}
