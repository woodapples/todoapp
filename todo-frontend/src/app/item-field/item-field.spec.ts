import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemField } from './item-field';

describe('ItemField', () => {
  let component: ItemField;
  let fixture: ComponentFixture<ItemField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
