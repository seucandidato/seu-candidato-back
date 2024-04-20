import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUsers1713570410383 implements MigrationInterface {
    name = 'AlterTableUsers1713570410383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone\` int NOT NULL`);
    }

}
