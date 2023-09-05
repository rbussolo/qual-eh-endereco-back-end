import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterNameColumnCode1693685274132 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("states", "code_dne", "code");
        await queryRunner.renameColumn("cities", "code_dne", "code");
        await queryRunner.renameColumn("neighborhoods", "code_dne", "code");
        await queryRunner.renameColumn("addresses", "code_dne", "code");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("states", "code", "code_dne");
        await queryRunner.renameColumn("cities", "code", "code_dne");
        await queryRunner.renameColumn("neighborhoods", "code", "code_dne");
        await queryRunner.renameColumn("addresses", "code", "code_dne");
    }

}
