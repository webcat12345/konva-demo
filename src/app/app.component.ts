import { Component, AfterViewInit } from '@angular/core';
import { KonvaService } from './core/konva.service';
import * as Konva from 'konva';
import { ELEMENT_HEIGHT, ELEMENT_WIDTH } from './core/konva.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  stage: any;
  mainLayer: any;
  lineLayer: any;

  lineArray = [];

  constructor(
    public konvaService: KonvaService
  ) {}

  ngAfterViewInit() {
    this.stage = this.konvaService.createStage('konvaboard', window.innerWidth, window.innerHeight);
    this.mainLayer = new Konva.Layer();
    this.lineLayer = new Konva.Layer();
    this.stage.add(this.lineLayer);
    this.stage.add(this.mainLayer);
  }

  add(x = 0, y = 0, w = ELEMENT_WIDTH, h = ELEMENT_HEIGHT) {
    const imageObj = new Image();
    imageObj.onload = (() => {
      const el = this.konvaService.addNewComponent(imageObj, x, y, w, h);
      this.mainLayer.add(el);
      el.on('click', (event => {
        this.componentClick(event);
      }));
      el.on('dragstart', (event => {
        this.componentDragStart(event);
      }));
      el.on('dragmove', (event => {
        this.componentDragMove(event);
      }));
      el.on('dragend', (event => {
        this.componentDragEnd(event);
      }));
      this.mainLayer.draw();
    });
    imageObj.src = '/assets/3281-200.png';
  }

  join() {
    const el_1 = this.stage.findOne(`#${this.konvaService.selectedItems[0]}`);
    const el_2 = this.stage.findOne(`#${this.konvaService.selectedItems[1]}`);
    this.lineLayer.add(this.konvaService.drawLinkLine(el_1, el_2));
    this.konvaService.unSelectAll(this.stage);
    this.lineLayer.draw();
    this.mainLayer.draw();
  }

  componentClick(event) {
    this.konvaService.layerClickedEvent(event, this.stage);
    this.mainLayer.draw();
  }

  componentDragStart(event) {
  }

  componentDragMove(event) {
    this.stage.find('Line').forEach(line => {
      const splitter = line.attrs.id.search('-');
      const e1 = this.stage.findOne(`#${line.attrs.id.substring(0, splitter)}`);
      const e2 = this.stage.findOne(`#${line.attrs.id.substring(splitter + 1, line.attrs.id.length)}`);
      if (event.target.attrs.id === e1.attrs.id) {
        line.attrs.points = this.konvaService.calculateLinkLine(event.target.attrs.x, event.target.attrs.y, e2.attrs.x, e2.attrs.y);
        this.stage.draw();
      } else if (event.target.attrs.id === e2.attrs.id) {
        line.attrs.points = this.konvaService.calculateLinkLine(e1.attrs.x, e1.attrs.y, event.target.attrs.x, event.target.attrs.y);
        this.stage.draw();
      }
    })
  }

  componentDragEnd(event) {
  }
}
