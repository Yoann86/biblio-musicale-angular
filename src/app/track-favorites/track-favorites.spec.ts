import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackFavorites } from './track-favorites';

describe('TrackFavorites', () => {
  let component: TrackFavorites;
  let fixture: ComponentFixture<TrackFavorites>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackFavorites],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackFavorites);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
