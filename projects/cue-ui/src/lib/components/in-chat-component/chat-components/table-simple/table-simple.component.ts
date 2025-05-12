import { Component, computed, input } from '@angular/core';
import { TableSimpleData } from '../models';
import { ColumnDef, TableComponent } from '../../../table.component';

@Component({
  selector: 'cue-table-simple',
  imports: [TableComponent],
  templateUrl: './table-simple.component.html',
  styleUrl: './table-simple.component.scss',
})
export class InChatTableSimple {

  data = input<TableSimpleData>();

  rows = computed(() => this.data()?.rows);
  columnDefs = computed<ColumnDef[]>(() => {
    const columns = this.data()?.columns;
    if (columns === undefined) return [];
    return columns.map((c) => new ColumnDef(c.key, c.label));
  });
}
