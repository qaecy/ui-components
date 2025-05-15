import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineRef } from './inline-ref.component';

describe('InlineRef', () => {
  let component: InlineRef;
  let fixture: ComponentFixture<InlineRef>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineRef]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InlineRef);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
