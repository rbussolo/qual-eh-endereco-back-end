import { File, processingInstance } from "../../../processing/entities/Processing";
import { State } from "../../entities/State";
import { CreateStateService } from "../create/CreateStateService";
import { DeleteStateService } from "../delete/DeleteStateService";
import { ListStateService } from "../list/ListStateService";

interface ProcessStateProps {
  file: File;
  content: string;
}

interface StateFromFile {
  code: number;
  name: string;
  short_name: string;
  short_country: string;
}

interface StatesDifference {
  insert: StateFromFile[];
  remove: State[];
}

export class ProcessStateService {
  async check({ file, content }: ProcessStateProps): Promise<StatesDifference> {
    const listStateService = new ListStateService();

    const statesAtDB = await listStateService.execute({});
    const statesAtFile = await this.loadStatesFromFile({ file, content });

    let posDB = 0;
    let posFile = 0;
    let statesDifference: StatesDifference = {
      insert: [],
      remove: []
    }

    while (statesAtDB.length > posDB || statesAtFile.length > posFile) {
      if (statesAtDB.length === posDB) {
        statesDifference.insert.push(statesAtFile[posFile]);

        posFile += 1;
      } else if (statesAtFile.length === posFile) {
        statesDifference.remove.push(statesAtDB[posDB]);

        posDB += 1;
      } else if (statesAtDB[posDB].name === statesAtFile[posFile].name) {
        posFile += 1;
        posDB += 1;
      } else if (statesAtDB[posDB].name > statesAtFile[posFile].name) {
        statesDifference.insert.push(statesAtFile[posFile]);

        posFile += 1;
      } else {
        statesDifference.remove.push(statesAtDB[posDB]);

        posDB += 1;
      }
    }

    return statesDifference;
  }

  async loadStatesFromFile({ file, content }: ProcessStateProps): Promise<StateFromFile[]> {
    let states: StateFromFile[] = [];

    const lines = content.split('\n');
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];

      const state: StateFromFile = {
        code: parseInt(line.substring(7,9)),
        name: line.substring(9, 81).trim(),
        short_name: line.substring(3, 5),
        short_country: line.substring(1, 3)
      }

      states.push(state);

      processingInstance.updateLinesImported(file.name);
    }

    return states;
  }

  async execute({ file, content }: ProcessStateProps) {
    processingInstance.startImportingFile(file.name);

    const statesDifference = await this.check({ file, content });

    const createState = new CreateStateService();
    const deleteState = new DeleteStateService();

    for (let i = 0; i < statesDifference.insert.length; i++) {
      createState.execute(statesDifference.insert[i]);

      processingInstance.updateLinesImported(file.name);
    }

    for (let i = 0; i < statesDifference.remove.length; i++) {
      deleteState.execute({ id: statesDifference.remove[i].id });

      processingInstance.updateLinesImported(file.name);
    }

    processingInstance.finishImportingFile(file.name);
  }
}