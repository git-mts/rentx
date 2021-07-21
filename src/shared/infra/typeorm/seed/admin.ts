/* eslint import/no-extraneous-dependencies: off, @typescript-eslint/ban-ts-comment: off */
// @ts-nocheck

import { hash } from 'bcrypt';
import { createConnection } from 'typeorm';

async function create() {
  const connection = await createConnection();

  const password = await hash('admin', 8);

  const [{ id: role_id }] = await connection.query(`
    SELECT id FROM roles
    WHERE
    name='admin';
  `);

  const response = await connection.query(`
    INSERT INTO operators
    (username, password, role_id)
    VALUES
    ('admin', '${password}', '${role_id}');
  `);

  console.log(response);
}

create()
  .then(() => console.log('\n✅ Success\n'))
  .catch(err => console.log(`\n❌ Failed \n Error: ${err.message}\n`));
