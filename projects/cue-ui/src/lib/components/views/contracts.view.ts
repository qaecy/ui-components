import { Component, computed, input, signal } from '@angular/core';
import { FlexContainer } from '../flexcontainer.component';
import { Container } from '../container.component';
import { Card } from '../card.component';
import { Typography } from '../typography.component';
import { SearchBar } from '../search-bar';
import { ColumnDef, Table } from '../table/table.component';
import { SearchBarShadow } from '../search-bar/search-bar-shadow.component';
import { JSONEntry, Row, Val } from './contracts.interfaces';
import { KeyValList } from '../key-val-list.component';
import { KeyVal } from '../key-val.component';
import { PDFViewer } from '../pdf-viewer/pdf-viewer.component';
import { Button } from '../button';

export class Props {
  constructor(
    public key: string,
    public value: string,
    public size: 'm' | 'l' | 'xl' = 'm'
  ) {}
}

export class ContractProps {
  general: Props[] = [];
  parties: Props[] = [];
  obligations: Props[] = [];
}

@Component({
  selector: 'cue-contracts',
  imports: [
    FlexContainer,
    Container,
    Card,
    Typography,
    SearchBar,
    Table,
    SearchBarShadow,
    KeyValList,
    KeyVal,
    PDFViewer,
    Button,
  ],
  templateUrl: `./contracts.view.html`,
  styleUrl: `./contracts.view.scss`,
})
export class ContractsView {
  contracts = input<{ [filePath: string]: JSONEntry }>({});

  showPDF = signal(false);
  selectedContract = signal<undefined | ContractProps>(undefined);
  pdfURL = signal(
    'https://ocw.mit.edu/courses/18-821-project-laboratory-in-mathematics-spring-2013/41c70fc8f822ec953739073e338142c7_MIT18_821S13_latexsample.pdf'
  );
  filterValue = signal<string>('');

  tableData = computed<Row[]>(() => {
    const json = this.contracts();
    console.log(json);
    const rows: Row[] = [];
    Object.keys(json).forEach((filePath) => {
      const fileName = filePath.split('/').pop() ?? filePath;
      const item = json[filePath];
      const category = this._getStrVal(item.classification, 'Other');
      const dateEffective = this._getStrVal(item.entities?.Dates?.Effective);
      const dateSigned = this._getStrVal(item.entities?.Dates?.Signing);
      const subject = this._getStrVal(item.entities?.Contract?.Subject);
      rows.push({
        id: filePath,
        fileName,
        filePath,
        category,
        dateSigned,
        dateEffective,
        subject,
      });
    });
    return rows;
  });

  hideEmptyValues = signal(false);
  contractData = computed(() => {
    const contract = this.selectedContract();
    if (contract === undefined) return undefined;
    if (!this.hideEmptyValues()) return contract;
    const general = contract.general.filter((p) => p.value !== '-');
    const parties = contract.parties.filter((p) => p.value !== '-');
    const obligations = contract.obligations.filter((p) => p.value !== '-');
    return { general, parties, obligations };
  });

  private _getStrVal(val: string | Val | null | undefined, fallback = '-') {
    const flatVal = typeof val === 'string' ? val : val?.value;
    if (flatVal === undefined) return fallback;
    if (flatVal === null) return fallback;
    if (flatVal === 'None') return fallback;
    return flatVal;
  }

  columnDefs: ColumnDef[] = [];
  constructor() {
    const fileNameCol = new ColumnDef('fileName', 'File Name', 'left');
    fileNameCol.type = 'TRUNCATED';
    const subjectCol = new ColumnDef('subject', 'Subject', 'left');
    subjectCol.type = 'TRUNCATED';
    this.columnDefs = [
      fileNameCol,
      subjectCol,
      new ColumnDef('category', 'Category', 'right'),
      new ColumnDef('dateSigned', 'Date signed', 'left'),
      new ColumnDef('dateEffective', 'Date Effective', 'left'),
    ];
  }

  setTableFilter(value: string) {
    this.filterValue.set(value);
  }

  handleRowClick(ev: Row) {
    const jsonAll = this.contracts();
    const entry = jsonAll[ev.filePath];
    const contractProps = new ContractProps();
    contractProps.general = [
      new Props('File Name', this._getStrVal(ev.fileName), 'l'),
      new Props('Classification', this._getStrVal(entry.classification)),
      new Props('Extension', this._getStrVal(entry.extension)),
      new Props(
        'Contract Reference',
        this._getStrVal(entry.entities?.Contract?.Reference)
      ),
      new Props(
        'Contract Subject',
        this._getStrVal(entry.entities?.Contract?.Subject)
      ),
      new Props(
        'Contract Type',
        this._getStrVal(entry.entities?.Contract?.Type)
      ),
      new Props(
        'Date Effective',
        this._getStrVal(entry.entities?.Dates?.Effective)
      ),
      new Props(
        'Date Signing',
        this._getStrVal(entry.entities?.Dates?.Signing)
      ),
      new Props(
        'Date Termination',
        this._getStrVal(entry.entities?.Dates?.Termination)
      ),
      new Props(
        'Legal Jurisdiction',
        this._getStrVal(entry.entities?.Legal?.Jurisdiction)
      ),
      new Props(
        'Legal Language',
        this._getStrVal(entry.entities?.Legal?.Language)
      ),
    ];
    const parties = entry.entities?.Parties;
    if (parties !== undefined && parties.length) {
      parties.forEach((p) => {
        contractProps.parties.push(new Props('Name', this._getStrVal(p.Name)));
        contractProps.parties.push(
          new Props('Address', this._getStrVal(p.Address))
        );
        contractProps.parties.push(
          new Props(
            'Representative Name',
            this._getStrVal(p.Representative?.Name)
          )
        );
        contractProps.parties.push(
          new Props(
            'Representative Title',
            this._getStrVal(p.Representative?.Title)
          )
        );
      });
    }
    const obligations = entry.entities?.Terms?.Obligations;
    if (obligations !== undefined && obligations.length) {
      obligations.forEach((o) => {
        contractProps.obligations.push(
          new Props('Party', this._getStrVal(o.Party))
        );
        contractProps.obligations.push(
          new Props('Description', this._getStrVal(o.Description))
        );
      });
    }
    this.selectedContract.update(() => contractProps);
    console.log(this.selectedContract());
  }

  togglePDF() {
    this.showPDF() ? this.showPDF.set(false) : this.showPDF.set(true);
  }

  toggleHideEmpty(){
    this.hideEmptyValues.set(!this.hideEmptyValues());
  }
}
