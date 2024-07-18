import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaDataComponent } from './carga-data.component';

describe('CargaDataComponent', () => {
  let component: CargaDataComponent;
  let fixture: ComponentFixture<CargaDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
