import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaLimpiezaComponent } from './carga-limpieza.component';

describe('CargaLimpiezaComponent', () => {
  let component: CargaLimpiezaComponent;
  let fixture: ComponentFixture<CargaLimpiezaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaLimpiezaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaLimpiezaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
