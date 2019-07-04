import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appSearch]'
})
export class SearchDirective {

  constructor() {
  }

  @HostListener('input', ['$event']) check(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Zа-яА-Я]+/g, '' );
    console.log(input.value);
}

}
