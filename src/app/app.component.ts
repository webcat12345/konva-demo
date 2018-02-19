import { Component, AfterViewInit } from '@angular/core';
import { KonvaService } from './core/konva.service';
import * as Konva from 'konva';
import { POINTER } from './core/konva.service';
import { ELEMENT_HEIGHT, ELEMENT_WIDTH } from './core/konva.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  stage: any;
  backgroundLayer: any;
  mainLayer: any;
  lineLayer: any;
  pointer = POINTER.single;

  clickListenerZone: any;

  tGroupAttrs: any;

  constructor(
    public konvaService: KonvaService
  ) {}

  ngAfterViewInit() {
    this.stage = this.konvaService.createStage('konvaboard', window.innerWidth, window.innerHeight);
    this.mainLayer = new Konva.Layer();
    this.lineLayer = new Konva.Layer();
    this.backgroundLayer = new Konva.Layer();

    this.stage.add(this.backgroundLayer); // hack background click event
    this.stage.add(this.lineLayer);       // linked lines
    this.stage.add(this.mainLayer);       // component layer


    this.clickListenerZone = new Konva.Rect({
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 0
    });

    this.clickListenerZone.on('click', (event) => {
      this.konvaService.unSelectAll(this.stage);
      this.mainLayer.draw();
    });

    // add the click lis  tener zone to the layer
    this.backgroundLayer.add(this.clickListenerZone);
    this.backgroundLayer.draw();
  }

  add(type, x = 0, y = 0, w = ELEMENT_WIDTH, h = ELEMENT_HEIGHT) {
    const imageObj = new Image();
    imageObj.onload = (() => {
      const el = this.konvaService.addNewComponent(imageObj, x, y, w, h);
      this.mainLayer.add(el);
      el.on('click', (event => this.componentClick(event, type)));
      el.on('dragstart', (event => this.componentDragStart(event)));
      el.on('dragmove', (event => this.componentDragMove(event)));
      el.on('dragend', (event => this.componentDragEnd(event)));
      this.mainLayer.draw();
    });
    imageObj.src = `/assets/svg/${type.file}`;
  }

  join() {
    if (this.konvaService.selectedItems.length < 2) {
      return;
    }
    const el_1 = this.stage.findOne(`#${this.konvaService.selectedItems[0]}`);
    const el_2 = this.stage.findOne(`#${this.konvaService.selectedItems[1]}`);
    this.lineLayer.add(this.konvaService.drawLinkLine(el_1, el_2));
    this.konvaService.unSelectAll(this.stage);
    this.lineLayer.draw();
    this.mainLayer.draw();
  }

  group() {
    const res = this.konvaService.addNewGroup();
    res.rect.on('mousemove', (event) => this.groupMouseCursorHandle(event, 'mousemove'));
    res.rect.on('mouseout', (event) => this.groupMouseCursorHandle(event, 'mouseout'));
    res.group.on('dragstart', (event) => this.groupMouseCursorHandle(event, 'dragstart'));
    res.group.on('dragmove', (event) => this.componentDragMove(event));
    res.group.on('click', (event) => this.componentClick(event, {name: 'group'}));
    this.mainLayer.add(res.group);
    this.mainLayer.draw();
  }

  componentClick(event, type) {
    this.konvaService.layerClickedEvent(this.pointer, event, this.stage, type);
    this.mainLayer.draw();
  }

  componentDragStart(event) {
  }

  componentDragMove(event) {
    this.stage.find('Arrow').forEach(line => {
      let x1, x2, y1, y2, h1, h2, w1, w2 = 0;
      const splitter = line.attrs.id.search('-');
      const e1 = this.stage.findOne(`#${line.attrs.id.substring(0, splitter)}`);
      const e2 = this.stage.findOne(`#${line.attrs.id.substring(splitter + 1, line.attrs.id.length)}`);
      if (event.target.attrs.id === e1.attrs.id) {
        x1 = event.target.attrs.x;
        y1 = event.target.attrs.y;
        w1 = event.target.attrs.width;
        h1 = event.target.attrs.height;
        x2 = e2.className === 'Rect' ? e2.parent.attrs.x : e2.attrs.x;
        y2 = e2.className === 'Rect' ? e2.parent.attrs.y : e2.attrs.y;
        w2 = e2.attrs.width;
        h2 = e2.attrs.height;
        line.attrs.points = this.konvaService.calculateLinkLine(x1, y1, x2, y2, w1, h1, w2, h2);
        this.stage.draw();
      } else if (event.target.attrs.id + 'rect' === e1.attrs.id) {
        x1 = event.target.attrs.x;
        y1 = event.target.attrs.y;
        w1 = e1.className === 'Rect' ? e1.attrs.width : ELEMENT_WIDTH;
        h1 = e1.className === 'Rect' ? e1.attrs.height : ELEMENT_HEIGHT;
        x2 = e2.className === 'Rect' ? e2.parent.attrs.x : e2.attrs.x;
        y2 = e2.className === 'Rect' ? e2.parent.attrs.y : e2.attrs.y;
        w2 = e2.attrs.width;
        h2 = e2.attrs.height;
        line.attrs.points = this.konvaService.calculateLinkLine(x1, y1, x2, y2, w1, h1, w2, h2);
        this.stage.draw();
      } else if (event.target.attrs.id === e2.attrs.id) {
        x2 = event.target.attrs.x;
        y2 = event.target.attrs.y;
        w2 = event.target.attrs.width;
        h2 = event.target.attrs.height;
        x1 = e1.className === 'Rect' ? e1.parent.attrs.x : e1.attrs.x;
        y1 = e1.className === 'Rect' ? e1.parent.attrs.y : e1.attrs.y;
        w1 = e1.attrs.width;
        h1 = e1.attrs.height;
        line.attrs.points = this.konvaService.calculateLinkLine(x1, y1, x2, y2, w1, h1, w2, h2);
        this.stage.draw();
      } else if (event.target.attrs.id + 'rect' === e2.attrs.id) {
        x2 = event.target.attrs.x;
        y2 = event.target.attrs.y;
        w2 = e2.attrs.width;
        h2 = e2.attrs.height;
        x1 = e1.className === 'Rect' ? e1.parent.attrs.x : e1.attrs.x;
        y1 = e1.className === 'Rect' ? e1.parent.attrs.y : e1.attrs.y;
        w1 = e1.attrs.width;
        h1 = e1.attrs.height;
        line.attrs.points = this.konvaService.calculateLinkLine(x1, y1, x2, y2, w1, h1, w2, h2);
        this.stage.draw();
      }
    })
  }

  componentDragEnd(event) {
  }

  groupMouseCursorHandle(event, method) {
    if (method === 'mouseout') {
      this.stage.container().style.cursor = 'default';
    } else if (method === 'mousemove') {
      if ((event.target.parent.attrs.x + event.target.attrs.width - 2) <= event.evt.offsetX && event.evt.offsetX <= (event.target.parent.attrs.x + event.target.attrs.width + 2)) {
        this.stage.container().style.cursor = 'pointer';
      } else {
        this.stage.container().style.cursor = 'default';
      }
    } else if (method === 'dragstart') {
      this.tGroupAttrs = {...event.target.attrs};
      // if ((event.target.parent.attrs.x + event.target.attrs.width - 2) <= event.evt.offsetX && event.evt.offsetX <= (event.target.parent.attrs.x + event.target.attrs.width + 2)) {
      //   this.stage.container().style.cursor = 'pointer';
      //   this.fGroupDragging = true;
      //   this.selectedGroup = event.target;
      // }
    } else if (method === 'dragmove') {
      // const el = event.target;
      // el.draggable(false);
      // console.log(event.evt.offsetX - this.selectedGroup.parent.x - this.selectedGroup.attrs.width);
    }
  }
}
