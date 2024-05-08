import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUsersAddColumnProfile1715124035837 implements MigrationInterface {
    name = 'AlterTableUsersAddColumnProfile1715124035837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`profile\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`profile\``);
    }

}
