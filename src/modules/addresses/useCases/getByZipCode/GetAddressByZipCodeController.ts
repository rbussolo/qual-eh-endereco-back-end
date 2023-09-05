import { Request, Response } from "express";
import { errorAddressCodeInvalid, errorAddressCodeRequired, errorAddressNotFound } from "../../../../errors/ErrorsCode";
import { GetAddressByZipCodeService } from "./GetAddressByZipCodeService";

interface GetAddressByZipCodeQuery {
  cep: string;
}

export class GetAddressByZipCodeController {
  async handle(request: Request, response: Response) {
    const { cep } = request.query as unknown as GetAddressByZipCodeQuery;
    
    if (!cep) {
      return response.json(errorAddressCodeRequired);
    } 
    
    const re = /^[0-9]{2}\.?[0-9]{3}-?[0-9]{3}$/g;
    
    if (!re.test(cep)) {
      return response.json(errorAddressCodeInvalid);
    }

    const zip_code = cep.replaceAll(/[^0-9]/g,'');
    
    const service = new GetAddressByZipCodeService();
    const result = await service.execute({ zip_code });

    if (result === undefined) {
      return response.json(errorAddressNotFound);
    }

    return response.json(result);
  }
}