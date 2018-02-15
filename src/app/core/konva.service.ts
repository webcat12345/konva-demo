import { Injectable } from '@angular/core';
import * as Konva from 'konva';

export const ELEMENT_WIDTH = 30;
export const ELEMENT_HEIGHT = 30;

@Injectable()
export class KonvaService {

  stage: any;
  selectedItems = [];

  get selectedIds() {
    return this.selectedItems;
  }

  constructor() { }

  createStage(container: string, width: number, height: number) {
    return new Konva.Stage({
      container: container,
      width: width,
      height: height
    });
  }

  addNewComponent(imageObj, x, y, w, h) {
    const idString = new Date().getMilliseconds().toString();
    return new Konva.Image({
      x: x,
      y: y,
      width: w,
      height: h,
      image: imageObj,
      draggable: true,
      id: idString
    });
  }

  selectElement(el, selectFlag: boolean) {
    if (selectFlag) {
      el.attrs.stroke = 'blue';
      el.attrs.strokeWidth = 2;
    } else {
      el.attrs.stroke = 'white';
      el.attrs.strokeWidth = 0;
    }
  }

  layerClickedEvent(event, stage) {
    const index = this.selectedItems.findIndex(x => x === event.target.attrs.id);
    if (index > -1) {
      this.selectElement(event.target, false);
      this.selectedItems.splice(index, 1);
    } else {
      this.selectElement(event.target, true);
      this.selectedItems.push(event.target.attrs.id);
      if (this.selectedItems.length > 2) { // selected items should be only 2
        this.selectElement(stage.findOne(`#${this.selectedItems[0]}`), false);
        this.selectedItems.splice(0, 1);
      }
    }
  }

  unSelectAll(stage) {
    this.selectedItems.forEach(x => {
      const el = stage.findOne(`#${x}`);
      this.selectElement(el, false);
    });
    this.selectedItems = [];
  }

  calculateLinkLine(x1, y1, x2, y2) {
    let linePoints = [];

    const cx1 = x1 + ELEMENT_WIDTH / 2;
    const cy1 = y1 + ELEMENT_HEIGHT / 2;
    const cx2 = x2 + ELEMENT_WIDTH / 2;
    const cy2 = y2 + ELEMENT_HEIGHT / 2;

    linePoints = [cx1, cy1, cx2, cy2];

    // if (x1 < x2) {
    //   if (y1 < y2) {
    //     linePoints = [x1 + ELEMENT_WIDTH + 3, y1 + ELEMENT_HEIGHT / 2, x2 + ELEMENT_WIDTH / 2, y1 + ELEMENT_HEIGHT / 2, x2 + ELEMENT_WIDTH / 2, y2 - 3];
    //   } else if (y1 > y2) {
    //     linePoints = [x1 + ELEMENT_WIDTH + 3, y1 + ELEMENT_HEIGHT / 2, x2 + ELEMENT_WIDTH / 2, y1 + ELEMENT_HEIGHT / 2, x2 + ELEMENT_WIDTH / 2, y2 + ELEMENT_HEIGHT + 3];
    //   } else {
    //     linePoints = [x1 + ELEMENT_WIDTH + 3, y1 + ELEMENT_HEIGHT / 2, x2 - 3, y1 + ELEMENT_HEIGHT / 2];
    //   }
    // } else if (x1 > x2) {
    //   if (y1 < y2) {
    //     linePoints = [x1 - 3, y1 + ELEMENT_HEIGHT / 2, x2 + ELEMENT_WIDTH / 2, y1 + ELEMENT_HEIGHT / 2, x2 + ELEMENT_WIDTH / 2, y2 - 3];
    //   } else if (y1 > y2) {
    //     linePoints = [x1 - 3, y1 + ELEMENT_HEIGHT / 2, x2 + ELEMENT_WIDTH / 2, y1 + ELEMENT_HEIGHT / 2, x2 + ELEMENT_WIDTH / 2, y2 + ELEMENT_HEIGHT + 3];
    //   } else {
    //     linePoints = [x1 - 3, y1 + ELEMENT_HEIGHT / 2, x2 + 3, y1 + ELEMENT_HEIGHT / 2];
    //   }
    // } else if (x1 === x2) {
    //
    // }
    return linePoints;
  }

  drawLinkLine(e1, e2) {
    return new Konva.Line({
      points: this.calculateLinkLine(e1.attrs.x, e1.attrs.y, e2.attrs.x, e2.attrs.y),
      stroke: 'blue',
      strokeWidth: 1,
      lineCap: 'round',
      lineJoin: 'round',
      id: e1.attrs.id + '-' + e2.attrs.id
    });
  }
}
