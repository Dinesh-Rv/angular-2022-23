import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appStrikeout]',
})
export class StrikeoutDirective implements OnChanges {
  @Input() appStrikeout!: boolean;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.appStrikeout) {
      this.elementRef.nativeElement.style.textDecoration = 'line-through';
    } else {
      this.elementRef.nativeElement.style.textDecoration = '';
    }
  }
}
