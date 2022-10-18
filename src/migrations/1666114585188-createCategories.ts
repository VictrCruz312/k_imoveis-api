import { MigrationInterface, QueryRunner } from "typeorm";

export class createCategories1666114585188 implements MigrationInterface {
    name = 'createCategories1666114585188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_e9058266ab1b092d636b1868956"`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "REL_e9058266ab1b092d636b186895"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "adressId"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "adressIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "UQ_7ccdcbf4e4ffdc275fb1eb32957" UNIQUE ("adressIdId")`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "categoryIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_7ccdcbf4e4ffdc275fb1eb32957" FOREIGN KEY ("adressIdId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_f051b757f8e45139549dceb39af" FOREIGN KEY ("categoryIdId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_f051b757f8e45139549dceb39af"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_7ccdcbf4e4ffdc275fb1eb32957"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "categoryIdId"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "UQ_7ccdcbf4e4ffdc275fb1eb32957"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "adressIdId"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "adressId" uuid`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "REL_e9058266ab1b092d636b186895" UNIQUE ("adressId")`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_e9058266ab1b092d636b1868956" FOREIGN KEY ("adressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
