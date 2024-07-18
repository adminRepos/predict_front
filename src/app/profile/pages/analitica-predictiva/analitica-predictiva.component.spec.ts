import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliticaPredictivaComponent } from './analitica-predictiva.component';

describe('AnaliticaPredictivaComponent', () => {
  let component: AnaliticaPredictivaComponent;
  let fixture: ComponentFixture<AnaliticaPredictivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnaliticaPredictivaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnaliticaPredictivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
