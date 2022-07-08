import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoardGameComponent } from './add-board-game.component';

describe('AddBoardGameComponent', () => {
  let component: AddBoardGameComponent;
  let fixture: ComponentFixture<AddBoardGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBoardGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoardGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
