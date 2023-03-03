import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
} from '@angular/core';

@Directive({
  selector: '[appStrikeout]',
})
export class StrikeoutDirective implements OnChanges {
  @Input() appStrikeout!: boolean;
  constructor(private elementRef: ElementRef) {}

  ngOnChanges() {
    if (this.appStrikeout) {
      this.elementRef.nativeElement.style.textDecoration = 'line-through';
    } else {
      this.elementRef.nativeElement.style.textDecoration = '';
    }
  }
}
