import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'translate'})
export class MockTranslatePipe implements PipeTransform {
  transform(input: string): string {
    return input;
  }
}
