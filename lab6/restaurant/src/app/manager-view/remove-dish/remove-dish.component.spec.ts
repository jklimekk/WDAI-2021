import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDishComponent } from './remove-dish.component';

describe('RemoveComponent', () => {
  let component: DeleteDishComponent;
  let fixture: ComponentFixture<DeleteDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
