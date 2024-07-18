import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticoIndividualComponent } from './practico-individual.component';

describe('PracticoIndividualComponent', () => {
  let component: PracticoIndividualComponent;
  let fixture: ComponentFixture<PracticoIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticoIndividualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticoIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
