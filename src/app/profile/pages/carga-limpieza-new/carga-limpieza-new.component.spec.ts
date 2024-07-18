import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaLimpiezaNewComponent } from './carga-limpieza-new.component';

describe('CargaLimpiezaNewComponent', () => {
  let component: CargaLimpiezaNewComponent;
  let fixture: ComponentFixture<CargaLimpiezaNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaLimpiezaNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaLimpiezaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
