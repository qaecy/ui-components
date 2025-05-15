import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InChatBIMViewer } from './bim-viewer.component';

describe('InChatBIMViewer', () => {
  let component: InChatBIMViewer;
  let fixture: ComponentFixture<InChatBIMViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InChatBIMViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InChatBIMViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
