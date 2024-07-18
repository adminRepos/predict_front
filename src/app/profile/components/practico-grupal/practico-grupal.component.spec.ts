import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticoGrupalComponent } from './practico-grupal.component';

describe('PracticoGrupalComponent', () => {
  let component: PracticoGrupalComponent;
  let fixture: ComponentFixture<PracticoGrupalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticoGrupalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticoGrupalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
