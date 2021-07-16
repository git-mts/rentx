import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAddPermisionInRoleFunc1626452800745 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION add_permissions_role() RETURNS TRIGGER
      AS $$
      DECLARE
        role_admin_id uuid;
      BEGIN
        select id from roles where name='admin' into role_admin_id;

        insert into roles_permissions
        (role_id, permission_id)
        values
        (role_admin_id, NEW.id);

        return NEW;
      END
      $$ LANGUAGE plpgsql;
    `);

    await queryRunner.query(`
      CREATE TRIGGER tgr_add_permissions_role
      AFTER INSERT ON permissions
      FOR EACH ROW
      EXECUTE PROCEDURE add_permissions_role();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TRIGGER IF EXISTS tgr_add_permissions_role ON permissions');
    await queryRunner.query('DROP FUNCTION IF EXISTS add_permissions_role()');
  }
}
