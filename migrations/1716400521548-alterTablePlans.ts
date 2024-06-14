import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTablePlans1716400521548 implements MigrationInterface {
    name = 'AlterTablePlans1716400521548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`plans\` CHANGE \`price\` \`price\` decimal(7,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`plans\` CHANGE \`price\` \`price\` decimal(3,2) NOT NULL`);
    }

}
