export interface Row {
  id: string;
  fileName: string;
  filePath: string;
  category: string;
  subject: string;
  dateSigned: string;
  dateEffective: string;
}

export interface JSONEntry {
  classification?: Val;
  extension?: string;
  entities?: {
    Contract: {
      Reference: Val | string | null;
      Subject: Val | string | null;
      Type: Val | string | null;
    };
    Dates: {
      Effective: Val | string | null;
      Signing: Val | string | null;
      Termination: Val | string | null;
    };
    Legal: {
      Jurisdiction: Val | string | null;
      Language: Val | string | null;
    };
    Parties: {
      Role: Val | string | null;
      Name: Val | string | null;
      Address: Val | string | null;
      Representative: {
        Name: Val | string | null;
        Title: Val | string | null;
      };
    }[];
    Terms: {
      Obligations: {
        Party: Val | string | null;
        Description?: Val | string | null;
      }[];
    };
  };
}

export interface Val {
  value: string | null;
  reasoning?: string;
  confidence?: number;
}
