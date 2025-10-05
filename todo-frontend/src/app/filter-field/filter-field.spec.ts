import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterField } from './filter-field';

describe('FilterField', () => {
  let component: FilterField;
  let fixture: ComponentFixture<FilterField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
