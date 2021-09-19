import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('scrollPosition', [
      state('on', style({
        backgroundColor: '#becee5'
      })),
      state('off', style({
        background: 'transparent'
      })),
      transition('on => off', animate('500ms ease-out')),
      transition('off => on', animate('500ms ease-in'))
    ])
  ]
})
export class HeaderComponent implements OnInit {

  @Input() isPhoneScreen: boolean;
  @Input() scrollPosition: number;

  showBurger: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.showBurger = !this.showBurger;
  }

}
