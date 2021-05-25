import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spacesToHyphens'
})
export class SpacesToHyphensPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\s+/g, '-').toLowerCase();
  }
}
