import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRolesPermissions1626456320763 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles_permissions',
        columns: [
          { name: 'role_id', type: 'uuid' },
          { name: 'permission_id', type: 'uuid' },
        ],
        foreignKeys: [
          {
            name: 'fk_roles_permissions',
            referencedTableName: 'roles',
            referencedColumnNames: ['id'],
            columnNames: ['role_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'fk_permissions_roles',
            referencedTableName: 'permissions',
            referencedColumnNames: ['id'],
            columnNames: ['permission_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles_permissions');
  }
}
