import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUsersAddColumnHash1714077555798 implements MigrationInterface {
    name = 'AlterTableUsersAddColumnHash1714077555798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`hash\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`hash\``);
    }

}
