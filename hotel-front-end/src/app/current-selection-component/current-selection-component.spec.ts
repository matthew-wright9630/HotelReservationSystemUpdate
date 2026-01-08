import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSelectionComponent } from './current-selection-component';

describe('CurrentSelectionComponent', () => {
  let component: CurrentSelectionComponent;
  let fixture: ComponentFixture<CurrentSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentSelectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
