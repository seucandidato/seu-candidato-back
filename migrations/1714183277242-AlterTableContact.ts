import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableContact1714183277242 implements MigrationInterface {
    name = 'AlterTableContact1714183277242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact\` CHANGE \`active\` \`active\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact\` CHANGE \`active\` \`active\` tinyint NOT NULL`);
    }

}
