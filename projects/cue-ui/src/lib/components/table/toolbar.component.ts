import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { IconComponent } from '../icon.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'cue-table-toolbar',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    IconComponent,
    MatInputModule,
  ],
  template: `<div class="filter-row">
    @if(!filterVisible()){
    <span style="flex: 1"></span>
    <button
      mat-icon-button
      aria-label="Show filter"
      (click)="toggleFilterDisplay()"
    >
      <cue-icon icon="filter"></cue-icon>
    </button>
    } @if(filterVisible()){
    <mat-form-field style="width: 100%" floatLabel="always">
      <mat-label>{{ filterLabel() }}</mat-label>
      <input
        matInput
        (keyup)="updateFilter($event)"
        [value]="filterValue()"
        [placeholder]="filterLabel()"
        subscriptSizing="dynamic"
      />
    </mat-form-field>
    <button
      mat-icon-button
      aria-label="Hide filter"
      (click)="toggleFilterDisplay()"
    >
      <cue-icon icon="filter_off"></cue-icon>
    </button>
    }
  </div>`,
  styles: [
    `
      .filter-row {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 0.6rem;
        align-items: center;
        padding-bottom: 0.2rem;
        font-family: var(--cue-font-family);
      }
      ::ng-deep .filter-row .mat-mdc-form-field-subscript-wrapper {
        height: 0;
      }
    `,
  ],
})
export class TableToolbar {
  filterLabel = input<string>('Filter');
  filterValue = input<string>('');
  filterValueChange = output<string>();

  filterVisible = signal(true);

  updateFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValueChange.emit(filterValue.trim().toLowerCase());
  }

  toggleFilterDisplay() {
    this.filterVisible()
      ? this.filterVisible.set(false)
      : this.filterVisible.set(true);
  }
}
