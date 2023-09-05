import { AppDataSource } from '../../../../data-source';

export class CleanDBService {
  async execute(): Promise<void> {
    const queryRunner = AppDataSource.createQueryRunner();

    queryRunner.query('DELETE FROM addresses;');
    queryRunner.query('DELETE FROM neighborhoods;');
    queryRunner.query('DELETE FROM cities;');
    queryRunner.query('DELETE FROM states;');
    queryRunner.query('DELETE FROM countries;');

    queryRunner.query('ALTER SEQUENCE addresses_id_seq RESTART WITH 1;');
    queryRunner.query('ALTER SEQUENCE neighborhoods_id_seq RESTART WITH 1;');
    queryRunner.query('ALTER SEQUENCE cities_id_seq RESTART WITH 1;');
    queryRunner.query('ALTER SEQUENCE states_id_seq RESTART WITH 1;');
    queryRunner.query('ALTER SEQUENCE countries_id_seq RESTART WITH 1;');
    
    queryRunner.query('COMMIT;');
  }
}