import { MigrationInterface, QueryRunner } from "typeorm";

export class createPropertiesAndAdresses1666113725856 implements MigrationInterface {
    name = 'createPropertiesAndAdresses1666113725856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "district" character varying NOT NULL, "zipCode" character varying NOT NULL, "number" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "properties" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sold" boolean NOT NULL DEFAULT false, "value" integer NOT NULL, "size" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "adressId" uuid, CONSTRAINT "REL_e9058266ab1b092d636b186895" UNIQUE ("adressId"), CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_e9058266ab1b092d636b1868956" FOREIGN KEY ("adressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_e9058266ab1b092d636b1868956"`);
        await queryRunner.query(`DROP TABLE "properties"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
