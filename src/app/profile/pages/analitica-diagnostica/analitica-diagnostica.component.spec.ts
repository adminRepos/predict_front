import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliticaDiagnosticaComponent } from './analitica-diagnostica.component';

describe('AnaliticaDiagnosticaComponent', () => {
  let component: AnaliticaDiagnosticaComponent;
  let fixture: ComponentFixture<AnaliticaDiagnosticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnaliticaDiagnosticaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnaliticaDiagnosticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
