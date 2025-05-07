import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  Input,
  linkedSignal,
  OnChanges,
  output,
  signal,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DisplayType, TableCellComponent } from './table-cell.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  ResizedDirective,
  ResizedEvent,
  TooltipDirective,
} from '../directives';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { IconMenuComponent } from './icon-menu.component';
import { MatButtonModule } from '@angular/material/button';

export class ColumnDef {
  type = 'DEFAULT';
  editable = false;
  tooltip?: string;
  constructor(
    public key: string,
    public label: string,
    public textAlign: 'left' | 'right' | 'center' = 'left'
  ) {}
}

export interface CellValueChange {
  key: string;
  index: number;
  previousValue: string | number | boolean;
  newValue: string | number | boolean;
}

@Component({
  selector: 'cue-table',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ResizedDirective,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatCheckboxModule,
    TableCellComponent,
    TooltipDirective,
    IconMenuComponent,
    MatButtonModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnChanges {
  // Data
  @Input() columnDefs: ColumnDef[] = [];
  @Input() data: any;
  @Input() fixedLayout = true;

  // Functionality
  selectedRow = input<string>(); // Id of selected row
  paginate = input(true);
  @Input() displaySelectColumn = false;
  @Input() displayFilter = true;
  @Input() clickableRows = false;
  @Input() actionItemsMarginRight = '50px';

  // Special columns
  @Input() tooltipCol: string | undefined = undefined;
  @Input() dimmedCol: string | undefined = undefined;
  @Input() editableCol: string | undefined = undefined;
  @Input() actionItemsCol: string | undefined = undefined;

  // Labels
  @Input() filterLabel = 'Filter';

  contentChanged = output<any>();

  // OUTPUT
  sortUpdated = output<Sort>();
  cellValueChange = output<CellValueChange>();
  selectionChange = output<void>();
  clickedRow = output<any>();

  readonly dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.data = this._prepareData();
  }

  displayedColumns: string[] = [];
  originalData: any[] = [];
  selection: { [columnKey: string]: any[] } = {};
  filterStr = '';
  pageSizeOptions = [5, 10, 20];
  filterVisible = false;
  hoveredRow: any = null;
  floatingBoxStyle: any = {};

  rowHeight = signal(0);
  tableHeight = signal(0);
  pageSize = computed(() => {
    if (this.tableHeight() === 0) return 5;
    const toFit = (this.tableHeight() - 30) / this.rowHeight();
    const closestOption = this.pageSizeOptions
      .slice()
      .reverse()
      .find((option) => option <= toFit);
    console.log(closestOption);
    return closestOption ?? 5;
  });
  hidePageSize = computed(() => {
    return this.data.length <= this.pageSize();
  });

  showPaginator = linkedSignal(() => {
    console.log(this.data.length <= this.pageSize());
    if (this.data.length <= this.pageSize()) {
      return false;
    }
    return this.paginate();
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'].isFirstChange()) return;
    this.dataSource.data = this._prepareData();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    if (this.dataSource === undefined) return;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSortChange(sortState: Sort) {
    this.sortUpdated.emit(sortState);
  }

  onCellValueChange(key: string, row: any, newValue: any) {
    const previousValue = row[key];

    row[key] = newValue;
    const isSelectColumn = key === 'selectCol';
    if (isSelectColumn) {
      const selected = row.selectCol;
      if (selected) {
        this.selection[key].push(row);
      } else {
        this.selection[key] = this.selection[key].filter(
          (item) => item.index !== row.index
        );
      }
      this.selectionChange.emit();
    } else {
      const newValue = row[key];
      delete newValue.index; // Used internally by component
      delete newValue.selectCol; // Used internally by component
      const change: CellValueChange = {
        previousValue,
        newValue,
        index: row.index,
        key,
      };
      this.cellValueChange.emit(change);
    }
    this.contentChanged.emit(this.data);
  }

  toggleAllSelected(columnKey: string) {
    if (!Object.keys(this.selection).includes(columnKey))
      this.selection[columnKey] = [];
    if (this.selection[columnKey].length) {
      this.selection[columnKey] = [];
      this.dataSource?.data.forEach((item) => {
        item[columnKey] = false;
      });
    } else {
      this.selection[columnKey] = this.data;
      this.dataSource?.data.forEach((item) => {
        item[columnKey] = true;
      });
    }
    this.selectionChange.emit();
    this.contentChanged.emit(this.data);
  }

  handleRowClick(row: any) {
    if (!this.clickableRows) return;
    if (this.selectedRow() === row.id) return;
    this.clickedRow.emit(row);
  }

  showFloatingBox(event: MouseEvent, row: any) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    this.hoveredRow = row;
    const center = rect.top + rect.height / 2 - 48 / 2;

    this.floatingBoxStyle = {
      top: `${center + window.scrollY}px`, // Adjusts position based on scroll
      right: this.actionItemsMarginRight,
    };

    setTimeout(() => {
      this.hoveredRow = null;
    }, 100);
  }

  tableResized(ev: ResizedEvent) {
    const h = ev.newRect.height;
    console.log(h);
    if (h !== this.tableHeight()) this.tableHeight.set(h);
  }

  rowResized(ev: ResizedEvent) {
    const h = ev.newRect.height;
    if (h !== this.rowHeight()) this.rowHeight.set(h);
  }

  // Reset hovered row on scroll
  @HostListener('wheel', [])
  onWindowScroll() {
    this.hoveredRow = null;
  }

  // Necessary for setting the checkbox in the header row
  private _setInitialSelection() {
    const selectRowKeys = this.columnDefs
      .filter((cd) => cd.type === 'CHECKBOX')
      .map((cd) => {
        this.selection[cd.key] = [];
        return cd.key;
      });

    this.data.forEach((d: any) => {
      selectRowKeys.forEach((k) => {
        if (d[k]) this.selection[k].push(d);
      });
    });
  }

  private _prepareData(): any {
    this.originalData = Object.assign({}, this.data);
    this.displayedColumns = this.columnDefs.map((d) => d.key);
    this._appendIndexCol();
    this._setInitialSelection();
    if (this.displaySelectColumn) this._appendSelectColumn();
    return this.data;
  }

  // Append an index column to have a unique identifier for each row
  private _appendIndexCol() {
    this.data = this.data.map((item: any, i: number) => {
      item.index = i;
      return item;
    });
  }

  private _appendSelectColumn() {
    this.displayedColumns.unshift('selectCol');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.data = this.data.map((item: any) => {
      item.selectCol = false;
      return item;
    });
    const cd = new ColumnDef('selectCol', 'Select');
    cd.type = 'CHECKBOX';
    cd.editable = true;
    this.columnDefs.unshift(cd);
  }
}
