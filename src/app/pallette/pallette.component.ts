import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ELEMENT_TYPES } from '../shared/resources/elementTypes';

@Component({
  selector: 'app-pallette',
  templateUrl: './pallette.component.html',
  styleUrls: ['./pallette.component.scss']
})
export class PalletteComponent implements OnInit {

  @Output() add: EventEmitter<any> = new EventEmitter<any>();

  types = ELEMENT_TYPES;

  constructor() { }

  ngOnInit() {
  }

}
