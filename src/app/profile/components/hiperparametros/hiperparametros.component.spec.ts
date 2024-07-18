import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiperparametrosComponent } from './hiperparametros.component';

describe('HiperparametrosComponent', () => {
  let component: HiperparametrosComponent;
  let fixture: ComponentFixture<HiperparametrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiperparametrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HiperparametrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
