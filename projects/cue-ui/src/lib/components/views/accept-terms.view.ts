import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { SafeResourceUrl } from '@angular/platform-browser';
import { SafeUrlPipe } from '../../pipes';
import { FlexContainer } from '../flexcontainer.component';
import { Typography } from '../typography.component';
import { Button } from '../button';
import { Card } from '../card.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cue-accept-terms',
  template: `<cue-card style="flex: 1;">
    <cue-typography
      ><cue-flexcontainer direction="column" align="center" justify="center" style="flex: 1;">
        @if(outdatedAgreed()){
        <p style="text-align: center;" i18n>
          Our terms & conditions have changed. We hope you can still agree to
          them.
        </p>
        }

        <a
          style="font-size: calc(var(--qaecy-font-size) * 2);"
          [href]="termsURL() | cueSafeUrl"
          target="_blank"
          >Terms of use</a
        >

        <mat-checkbox [(ngModel)]="accepted" i18n
          >I have read and accept the terms & conditions</mat-checkbox
        >

        <span style="height: 1rem"></span>

        <cue-button [disabled]="!accepted" (click)="clickedConfirm.emit()" i18n
          >Submit</cue-button
        >
      </cue-flexcontainer>
    </cue-typography></cue-card
  >`,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
  imports: [
    MatCheckboxModule,
    MatIconModule,
    FormsModule,
    SafeUrlPipe,
    Typography,
    FlexContainer,
    Button,
    Card,
  ],
})
export class AcceptTermsView {
  outdatedAgreed = input<boolean>(false); // If the user has agreed to previous terms
  termsURL = input.required<string>();

  clickedConfirm = output<void>();

  accepted = false;
  termsUrl?: SafeResourceUrl;
}
