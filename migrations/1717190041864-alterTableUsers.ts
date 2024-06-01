import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUsers1717190041864 implements MigrationInterface {
    name = 'AlterTableUsers1717190041864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`checked\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`checked\``);
    }

}
