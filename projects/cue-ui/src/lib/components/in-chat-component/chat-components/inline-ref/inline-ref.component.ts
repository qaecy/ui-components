import { Component, effect, input, output } from '@angular/core';
import { TooltipDirective } from '../../../../directives';
import { RefSummaryDirective } from './ref-summary.directive';

export interface DocRefData {
  documentId: string;
  fragmentId?: string;
  text?: string;
  documentData?: DocData;
  used: boolean;
}

export interface DocData {
  summary?: string;
  used: boolean;
  files: FileData[];
}

export interface FileData {
  label: string;
  location: string;
}

@Component({
  selector: 'app-inline-ref',
  imports: [RefSummaryDirective],
  templateUrl: './inline-ref.component.html',
  styleUrl: './inline-ref.component.scss',
})
export class InlineRefComponent {
  i = input.required<string>();
  data = input<DocRefData>();
  clickable = input<boolean>(true);

  hovered = output<number | undefined>();
  clicked = output<number>();

  x = effect(() => console.log(this.data()));

  handleMouseIn() {
    this.hovered.emit(parseInt(this.i()));
  }

  handleMouseOut() {
    this.hovered.emit(undefined);
  }

  handleClick() {
    this.clicked.emit(parseInt(this.i()));
  }
}
