import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDescriptionComponent } from './room-description-component';

describe('RoomDescriptionComponent', () => {
  let component: RoomDescriptionComponent;
  let fixture: ComponentFixture<RoomDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomDescriptionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
