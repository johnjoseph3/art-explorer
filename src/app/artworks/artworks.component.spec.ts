import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworksComponent } from './artworks.component';

describe('ArtworksComponent', () => {
  let component: ArtworksComponent;
  let fixture: ComponentFixture<ArtworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
