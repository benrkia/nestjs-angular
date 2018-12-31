import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLikedComponent } from './top-liked.component';

describe('TopLikedComponent', () => {
  let component: TopLikedComponent;
  let fixture: ComponentFixture<TopLikedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopLikedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLikedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
