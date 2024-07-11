import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTablePlans1717501627543 implements MigrationInterface {
    name = 'AlterTablePlans1717501627543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`benefits\` ADD UNIQUE INDEX \`IDX_ba1984684783b76f1c6388589e\` (\`title\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`benefits\` DROP INDEX \`IDX_ba1984684783b76f1c6388589e\``);
    }

}
