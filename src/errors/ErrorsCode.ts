import { AppError } from "./AppError";


// City errors
export const errorCityStateRequired = new AppError('É necessário informar a sigla do Estado! (short_state)', 400, 'CITY_001');
export const errorCityNotFound = new AppError('Nenhuma cidade localizada para o estado informado!', 400, 'CITY_002');

export function errorCityNotFoundWithCode(code: number): AppError {
  return new AppError(`Cidade não localizada com o código ${code}.`, 400, 'CITY_003');
}

// Neighborhood errors
export const errorNeighborhoodCityRequired = new AppError('É necessário informar o código da Cidade! (code_city)', 400, 'NEIGHBORHOOD_001');
export const errorNeighborhoodCityIsNaN = new AppError('O código da Cidade deve ser um número! (code_city)', 400, 'NEIGHBORHOOD_002');
export const errorNeighborhoodNotFound = new AppError('Nenhum bairro localizado para a cidade informada!', 400, 'NEIGHBORHOOD_003');

// Address errors
export const errorAddressCodeRequired = new AppError('É necessário informar o CEP! (cep)', 400, 'ADDRESS_001');
export const errorAddressCodeInvalid = new AppError('CEP informado é inválido!', 400, 'ADDRESS_002');
export const errorAddressNotFound = new AppError('CEP não localizado!', 400, 'ADDRESS_003');

