import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineRefComponent } from './inline-ref.component';

describe('InlineRefComponent', () => {
  let component: InlineRefComponent;
  let fixture: ComponentFixture<InlineRefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineRefComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InlineRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
