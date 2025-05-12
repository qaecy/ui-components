import type { Meta, StoryObj } from '@storybook/angular';
import { PDFViewerComponent } from './pdf-viewer.component';

// This is an extended version of https://vadimdez.github.io/ng2-pdf-viewer/

const meta: Meta<PDFViewerComponent> = {
  title: 'PDF Viewer',
  component: PDFViewerComponent,
  tags: ['autodocs'],
  argTypes: {
    renderText: {
      control: {
        type: 'boolean',
      },
      description: 'Render text layer?',
    },
    renderTextMode: {
      control: {
        type: 'select',
      },
      options: [0, 1, 2],
      description: 'Render text mode (0 = Disabled, 1 = Enabled, 2 = Enhanced)',
    },
  },
};

export default meta;
type Story = StoryObj<PDFViewerComponent>;

const render = (args: any) => ({
  props: {
    src: args.src,
    page: args.page,
    renderText: args.renderText,
    renderTextMode: args.renderTextMode,
    originalSize: args.originalSize,
    showAll: args.showAll,
    stickToPage: args.stickToPage,
    zoom: args.zoom,
    rotation: args.rotation,
    externalLinkTarget: args.externalLinkTarget,
    autoresize: args.autoresize,
    fitToPage: args.fitToPage,
    showBorders: args.showBorders,
  },
  template: `<cue-pdf-viewer 
            style="height: 500px"
            [src]="src" [page]="page" [render-text]="renderText"
            [render-text-mode]="renderTextMode" [original-size]="originalSize"
            [show-all]="showAll" [stick-to-page]="stickToPage" [zoom]="zoom" [rotation]="rotation"
            [external-link-target]="externalLinkTarget" [autoresize]="autoresize"
            [fit-to-page]="fitToPage" [show-borders]="showBorders">
        </cue-pdf-viewer>`,
});

export const Default: Story = {
  render,
  args: {
    src: 'https://pdfobject.com/pdf/sample.pdf',
    page: 1,
    renderText: true,
    originalSize: true,
    renderTextMode: 1,
    showAll: true,
    stickToPage: false,
    zoom: 1,
    rotation: 0,
    externalLinkTarget: 'blank',
    autoresize: true,
    fitToPage: false,
    showBorders: false,
  },
};

export const Advanced: Story = {
  render,
  args: {
    src: 'https://ocw.mit.edu/courses/18-821-project-laboratory-in-mathematics-spring-2013/41c70fc8f822ec953739073e338142c7_MIT18_821S13_latexsample.pdf',
    page: 3,
    renderText: true,
    originalSize: true,
    renderTextMode: 1,
    showAll: true,
    stickToPage: false,
    zoom: 1,
    rotation: 0,
    externalLinkTarget: 'blank',
    autoresize: true,
    fitToPage: false,
    showBorders: false,
  },
};
