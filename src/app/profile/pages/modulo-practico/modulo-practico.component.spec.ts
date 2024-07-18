import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloPracticoComponent } from './modulo-practico.component';

describe('ModuloPracticoComponent', () => {
  let component: ModuloPracticoComponent;
  let fixture: ComponentFixture<ModuloPracticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloPracticoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuloPracticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
