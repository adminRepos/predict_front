import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticaGraphicsComponent } from './diagnostica-graphics.component';

describe('DiagnosticaGraphicsComponent', () => {
  let component: DiagnosticaGraphicsComponent;
  let fixture: ComponentFixture<DiagnosticaGraphicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticaGraphicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosticaGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
