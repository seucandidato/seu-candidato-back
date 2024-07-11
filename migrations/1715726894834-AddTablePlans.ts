import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTablePlans1715726894834 implements MigrationInterface {
    name = 'AddTablePlans1715726894834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`plans\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`price\` decimal(3,2) NOT NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`benefits\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`plans_benefits_benefits\` (\`plansId\` int NOT NULL, \`benefitsId\` int NOT NULL, INDEX \`IDX_4c16b8882db3685d0cdaaabe95\` (\`plansId\`), INDEX \`IDX_d21d17cf1e32bd9dcefac004a8\` (\`benefitsId\`), PRIMARY KEY (\`plansId\`, \`benefitsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`plans_benefits_benefits\` ADD CONSTRAINT \`FK_4c16b8882db3685d0cdaaabe95a\` FOREIGN KEY (\`plansId\`) REFERENCES \`plans\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`plans_benefits_benefits\` ADD CONSTRAINT \`FK_d21d17cf1e32bd9dcefac004a8b\` FOREIGN KEY (\`benefitsId\`) REFERENCES \`benefits\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`plans_benefits_benefits\` DROP FOREIGN KEY \`FK_d21d17cf1e32bd9dcefac004a8b\``);
        await queryRunner.query(`ALTER TABLE \`plans_benefits_benefits\` DROP FOREIGN KEY \`FK_4c16b8882db3685d0cdaaabe95a\``);
        await queryRunner.query(`DROP INDEX \`IDX_d21d17cf1e32bd9dcefac004a8\` ON \`plans_benefits_benefits\``);
        await queryRunner.query(`DROP INDEX \`IDX_4c16b8882db3685d0cdaaabe95\` ON \`plans_benefits_benefits\``);
        await queryRunner.query(`DROP TABLE \`plans_benefits_benefits\``);
        await queryRunner.query(`DROP TABLE \`benefits\``);
        await queryRunner.query(`DROP TABLE \`plans\``);
    }

}
