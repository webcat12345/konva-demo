import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PalletteComponent } from './pallette.component';

describe('PalletteComponent', () => {
  let component: PalletteComponent;
  let fixture: ComponentFixture<PalletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
