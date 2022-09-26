import {Directive, ElementRef, HostBinding, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[bgPopup]'
})
export class PopupDirective implements OnInit {

  @HostBinding('class.active') isActive = false;

  constructor(private elemRef: ElementRef<HTMLElement>) {
  }

  @HostListener('document:click', ['$event']) mouseclick($event) {
    this.isActive = this.elemRef.nativeElement.contains($event.target) ? !this.isActive : false;
  }

  ngOnInit() {
  }

}
