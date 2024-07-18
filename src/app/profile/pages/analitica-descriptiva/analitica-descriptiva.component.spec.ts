import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliticaDescriptivaComponent } from './analitica-descriptiva.component';

describe('AnaliticaDescriptivaComponent', () => {
  let component: AnaliticaDescriptivaComponent;
  let fixture: ComponentFixture<AnaliticaDescriptivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnaliticaDescriptivaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnaliticaDescriptivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
