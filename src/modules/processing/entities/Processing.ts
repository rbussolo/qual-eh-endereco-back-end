enum ProcessingState {
  Waiting = 'waiting',
  Uploaded = 'uploaded',
  Checking = 'checking',
  Checked = 'checked',
  Importing = 'importing',
  Imported = 'imported',
  Error = 'error'
}

enum FileState {
  Waiting = 'waiting',
  Importing = 'importing',
  Imported = 'imported'
}

export interface File {
  name: string;
  path: string;
  check: boolean;
  import: boolean;
  state: FileState;
  currentLine: number;
}

function getListOfFiles(): File[] {
  return [
    { name: "Países", path: "Fixo/DNE_GU_PAISES.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Estados", path: "Fixo/DNE_GU_UNIDADES_FEDERACAO.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Cidades", path: "Fixo/DNE_GU_LOCALIDADES.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Bairros", path: "Fixo/DNE_GU_BAIRROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - AC", path: "Fixo/DNE_GU_AC_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - AL", path: "Fixo/DNE_GU_AL_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - AM", path: "Fixo/DNE_GU_AM_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - AP", path: "Fixo/DNE_GU_AP_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - BA", path: "Fixo/DNE_GU_BA_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - CE", path: "Fixo/DNE_GU_CE_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - DF", path: "Fixo/DNE_GU_DF_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - ES", path: "Fixo/DNE_GU_ES_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - GO", path: "Fixo/DNE_GU_GO_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - MA", path: "Fixo/DNE_GU_MA_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - MG", path: "Fixo/DNE_GU_MG_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - MS", path: "Fixo/DNE_GU_MS_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - MT", path: "Fixo/DNE_GU_MT_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - PA", path: "Fixo/DNE_GU_PA_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - PB", path: "Fixo/DNE_GU_PB_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - PE", path: "Fixo/DNE_GU_PE_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - PI", path: "Fixo/DNE_GU_PI_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - PR", path: "Fixo/DNE_GU_PR_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - RJ", path: "Fixo/DNE_GU_RJ_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - RN", path: "Fixo/DNE_GU_RN_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - RO", path: "Fixo/DNE_GU_RO_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - RR", path: "Fixo/DNE_GU_RR_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - RS", path: "Fixo/DNE_GU_RS_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - SC", path: "Fixo/DNE_GU_SC_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - SE", path: "Fixo/DNE_GU_SE_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - SP", path: "Fixo/DNE_GU_SP_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 },
    { name: "Logradouro - TO", path: "Fixo/DNE_GU_TO_LOGRADOUROS.TXT", check: false, import: true, state: FileState.Waiting, currentLine: 0 }
  ]
}

class Processing {
  state: ProcessingState;
  path: string;
  files: File[];
  
  constructor() {
    this.state = ProcessingState.Waiting;
    this.files = getListOfFiles();
  }

  startCheck(path: string) {
    this.path = path;
    this.state = ProcessingState.Checking;
    this.files = getListOfFiles();
  }

  finishCheck(): boolean {
    const success = this.files.filter(item => !item.check).length === 0;

    this.state = success ? ProcessingState.Checked : ProcessingState.Error;

    return success;
  }

  startImporting() {
    this.state = ProcessingState.Importing;
  }

  finishImporting() {
    this.state = ProcessingState.Imported;
  }

  startImportingFile(name: string){ 
    this.files = this.files.map(item => {
      if (item.name === name) return { ...item, state: FileState.Importing};

      return item;
    });
  }

  finishImportingFile(name: string) {
    this.files = this.files.map(item => {
      if (item.name === name) return { ...item, state: FileState.Imported };

      return item;
    });
  }

  updateLinesImported(name: string) {
    this.files = this.files.map(item => {
      if (item.name === name) return { ...item, currentLine: item.currentLine + 1 };

      return item;
    });
  }

  updateFile(file: File) {
    this.files = this.files.map(item => {
      if (item.name === file.name) return file;

      return item;
    });
  }

  updateFiles(files: File[]) {
    this.files = files;
  }
}

const processingInstance = new Processing();

// Object.freeze(processingInstance);

export { processingInstance };