import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionVariablesComponent } from './seleccion-variables.component';

describe('SeleccionVariablesComponent', () => {
  let component: SeleccionVariablesComponent;
  let fixture: ComponentFixture<SeleccionVariablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionVariablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
