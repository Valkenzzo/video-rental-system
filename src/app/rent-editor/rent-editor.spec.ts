import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentEditor } from './rent-editor';

describe('RentEditor', () => {
  let component: RentEditor;
  let fixture: ComponentFixture<RentEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentEditor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
