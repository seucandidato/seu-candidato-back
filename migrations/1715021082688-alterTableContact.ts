import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableContact1715021082688 implements MigrationInterface {
    name = 'AlterTableContact1715021082688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`contact\` ADD CONSTRAINT \`FK_e7e34fa8e409e9146f4729fd0cb\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact\` DROP FOREIGN KEY \`FK_e7e34fa8e409e9146f4729fd0cb\``);
        await queryRunner.query(`ALTER TABLE \`contact\` DROP COLUMN \`userId\``);
    }

}
