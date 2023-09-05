import { AppDataSource } from "../../../../data-source";
import { Neighborhood } from "../../../neighborhoods/entities/Neighborhood";
import { GetNeighborhoodByCodeService } from "../../../neighborhoods/useCases/getByCode/GetNeighborhoodByCodeService";
import { File, processingInstance } from "../../../processing/entities/Processing";
import { Address } from "../../entities/Address";
import { ListAddressService } from "../list/ListAddressService";

interface ProcessAddressProps {
  file: File;
  short_state: string;
  content: string;
}

interface AddressFromFile {
  code: number;
  name: string;
  short_name: string;
  zip_code: string;
  neighborhood_id: number;
}

interface AddressesDifference {
  insert: AddressFromFile[];
  remove: Address[];
}

export class ProcessAddressService {
  async check({ file, short_state, content }: ProcessAddressProps): Promise<AddressesDifference> {
    const listAddressService = new ListAddressService();

    const addressesAtDB = await listAddressService.execute({ short_state });
    const addressesAtFile = await this.loadAddressesFromFile({ file, short_state, content });

    let addressesDifference: AddressesDifference = {
      insert: [],
      remove: []
    }

    // Percorre todas as cidades do arquivo e vai removendo da lista de cidades que esta presente no banco para saber o que deve ser adicionado e o que deve ser removido
    for (let i = 0; i < addressesAtFile.length; i++) {
      const index = addressesAtDB.findIndex(address => {
        return address.code === addressesAtFile[i].code
      });

      if (index >= 0) {
        // Neste caso existe o registro
        addressesAtDB.splice(index, 1);
      } else {
        // Neste caso tem que inserir o registro
        addressesDifference.insert.push(addressesAtFile[i]);
      }
    }

    // Tudo que sobrou dentro do campo que carregou pelo banco deve ser removido
    addressesDifference.remove = addressesAtDB;

    return addressesDifference;
  }

  async loadAddressesFromFile({ file, content }: ProcessAddressProps): Promise<AddressFromFile[]> {
    const getNeighborhoodByCodeService = new GetNeighborhoodByCodeService();

    let addresses: AddressFromFile[] = [];

    const lines = content.split('\n');
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];

      if (line[0] === 'D') {
        const code = parseInt(line.substring(366, 374).trim());
        const code_neighborhood = parseInt(line.substring(94, 102).trim());

        if (!isNaN(code) && !isNaN(code_neighborhood)) {
          const neighborhood = await getNeighborhoodByCodeService.execute({ code: code_neighborhood });

          if (neighborhood instanceof Neighborhood && neighborhood.id > 0) {
            const address: AddressFromFile = {
              code: code,
              name: line.substring(374, 446).trim(),
              short_name: line.substring(446, 482).trim(),
              zip_code: line.substring(518, 526).trim(),
              neighborhood_id: neighborhood.id
            }

            addresses.push(address);
          }
        }

        processingInstance.updateLinesImported(file.name);
      }
    }

    return addresses;
  }

  async execute({ file, short_state, content }: ProcessAddressProps) {
    processingInstance.startImportingFile(file.name);

    const addressesDifference = await this.check({ file, short_state, content });
    const repo = AppDataSource.getRepository(Address);

    for (let i = 0; i < addressesDifference.insert.length; i++) {
      console.log(addressesDifference.insert[i]);

      const address = repo.create(addressesDifference.insert[i]);

      if (address.neighborhood_id > 0) {
        await repo.save(address);

        processingInstance.updateLinesImported(file.name);
      }
    }

    for (let i = 0; i < addressesDifference.remove.length; i++) {
      await repo.delete(addressesDifference.remove[i].id);

      processingInstance.updateLinesImported(file.name);
    }

    processingInstance.finishImportingFile(file.name);
  }
}