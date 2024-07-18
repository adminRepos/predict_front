import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaHistorialComponent } from './carga-historial.component';

describe('CargaHistorialComponent', () => {
  let component: CargaHistorialComponent;
  let fixture: ComponentFixture<CargaHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaHistorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
