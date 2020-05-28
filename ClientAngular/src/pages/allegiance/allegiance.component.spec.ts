import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllegianceComponent } from './allegiance.component';

describe('AllegianceComponent', () => {
  let component: AllegianceComponent;
  let fixture: ComponentFixture<AllegianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllegianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllegianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
