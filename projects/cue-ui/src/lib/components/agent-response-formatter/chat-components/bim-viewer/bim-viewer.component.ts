import {
  booleanAttribute,
  Component,
  computed,
  ElementRef,
  input,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { BIMViewerData } from '../models';
import { v4 as uuid4 } from 'uuid';
import {
  BIMTilesViewer,
  BIMTilesViewerData,
} from '../../../bim-tiles-viewer/bim-tiles-viewer.component';
import { ResizedDirective, ResizedEvent } from '../../../../directives';
import { IconMenu, IconMenuItem } from '../../../icon-menu.component';
import { PassiveMode } from '../../../passive-mode.component';

const DEMO_PROJECT_ID = 'demo-project';

@Component({
  selector: 'app-bim-viewer',
  imports: [BIMTilesViewer, ResizedDirective, PassiveMode, IconMenu],
  templateUrl: './bim-viewer.component.html',
  styleUrl: './bim-viewer.component.scss',
})
export class InChatBIMViewer implements OnInit, OnDestroy {
  data = input<BIMViewerData>();
  startPassive = input(true, { transform: booleanAttribute });

  loadDeferred = false;
  id = uuid4();
  geometryDefinitions = computed<BIMTilesViewerData | undefined>(() => {
    const gDefs = this.data()?.geometryDefinitions;
    if (gDefs === undefined) return;
    const data = new BIMTilesViewerData(DEMO_PROJECT_ID);
    data.urlAuthenticator = async (rawURL) =>
      `https://qaecy.github.io/demo-widget/${DEMO_PROJECT_ID}/tiles/${rawURL}`;
    data.geometryDefinitions = gDefs;
    return data;
  });
  menuItems: IconMenuItem[] = [
    new IconMenuItem('add', 'View in fullscreen', () => this._goFullScreen()),
  ];
  private _parentWidth = signal<number | undefined>(undefined);
  private _initialHeight?: number;
  private _container = viewChild<ElementRef>('container');

  ngOnInit(): void {
    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        console.log('Entered fullscreen');
      } else {
        console.log('Exited fullscreen');
        if (this._initialHeight !== undefined) {
          const container = this._container()?.nativeElement;
          if (container) container.style.height = this._initialHeight + 'px';
        }
      }
    });
  }

  ngOnDestroy() {
    console.log('DESTROY');
  }

  onResized(ev: ResizedEvent) {
    this._parentWidth.set(ev.newRect.width);
  }

  private _goFullScreen() {
    const elem = document.getElementById(this.id);
    this._initialHeight = elem?.offsetHeight;
    if (!elem) throw new Error('Element could not be reached');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if ((elem as any).webkitRequestFullscreen) {
      // Safari
      (elem as any).webkitRequestFullscreen();
    } else if ((elem as any).msRequestFullscreen) {
      // IE11
      (elem as any).msRequestFullscreen();
    }
  }
}
