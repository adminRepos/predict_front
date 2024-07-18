import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaConvencionesComponent } from './carga-convenciones.component';

describe('CargaConvencionesComponent', () => {
  let component: CargaConvencionesComponent;
  let fixture: ComponentFixture<CargaConvencionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaConvencionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaConvencionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
