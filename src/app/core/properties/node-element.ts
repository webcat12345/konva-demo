export class NodeElement {
  id: string;
  name: string; // type
  object?: any; // canvas object

  constructor() {
    this.id = '';
    this.name = '';
    this.object = {};
  }
}
