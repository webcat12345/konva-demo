import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { KonvaService } from '../core/konva.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  showPropertySubscription: Subscription = new Subscription();

  selectedObject: any = null;

  constructor(
    private konvaService: KonvaService
  ) { }

  ngOnInit() {
    this.showPropertySubscription = this.konvaService.showProperty.subscribe(data => {
      this.selectedObject = {};
      this.selectedObject.id = data.id;
      this.selectedObject.type = data.type.name;
    });
  }

  ngOnDestroy() {
    this.showPropertySubscription.unsubscribe();
  }

}
