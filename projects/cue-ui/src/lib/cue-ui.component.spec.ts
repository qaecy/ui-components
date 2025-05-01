import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CueUiComponent } from './cue-ui.component';

describe('CueUiComponent', () => {
  let component: CueUiComponent;
  let fixture: ComponentFixture<CueUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CueUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CueUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
