import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTablePlans1715731791879 implements MigrationInterface {
    name = 'AlterTablePlans1715731791879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`plans_benefits_benefits\` DROP FOREIGN KEY \`FK_d21d17cf1e32bd9dcefac004a8b\``);
        await queryRunner.query(`ALTER TABLE \`plans_benefits_benefits\` ADD CONSTRAINT \`FK_d21d17cf1e32bd9dcefac004a8b\` FOREIGN KEY (\`benefitsId\`) REFERENCES \`benefits\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`plans_benefits_benefits\` DROP FOREIGN KEY \`FK_d21d17cf1e32bd9dcefac004a8b\``);
        await queryRunner.query(`ALTER TABLE \`plans_benefits_benefits\` ADD CONSTRAINT \`FK_d21d17cf1e32bd9dcefac004a8b\` FOREIGN KEY (\`benefitsId\`) REFERENCES \`benefits\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
