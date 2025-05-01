import { Component, computed, input, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

export type CardColor = 'accent' | 'primary';

export class CardButton {
  appearance: 'outlined' = 'outlined';
}

@Component({
  selector: 'cue-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  template: `
    <mat-card [style.background-color]="color()" [appearance]="appearance()">
      <mat-card-header>
        <mat-card-title>{{ title() }}</mat-card-title>
        <mat-card-subtitle>{{ subTitle() }}</mat-card-subtitle>
      </mat-card-header>
      <ng-content select="[actions]">
        <mat-card-actions align="end">
          <button mat-button>Learn More</button>
        </mat-card-actions>
      </ng-content>
    </mat-card>
  `,
  styles: `mat-card{
    padding: 16px;
  }`,
})
export class CardComponent {
  title = input<string>();
  subTitle = input<string>();
  color = input<CardColor>('primary');
  appearance = input<'outlined' | 'raised'>('raised');
  actionsAlign = input<'start' | 'end'>('end');

  colorVar = computed(() =>
    this.appearance() === 'outlined'
      ? 'rgba(0,0,0,0)'
      : `var(--cue-${this.color()})`
  );
}
