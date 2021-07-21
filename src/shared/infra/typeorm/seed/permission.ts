/* eslint import/no-extraneous-dependencies: off, @typescript-eslint/ban-ts-comment: off */
// @ts-nocheck

import { createConnection } from 'typeorm';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

async function create(name: string, description: string) {
  const connection = await createConnection();

  await connection.query(`
    INSERT INTO permissions
    (name, description)
    VALUES
    ('${name}', '${description}');
  `);
}

const { argv } = yargs(hideBin(process.argv));

const { name, description } = argv;

if (name && description) {
  create(name, description)
    .then(() => console.log('\n✅ Success\n'))
    .catch(err => console.log(`\n❌ Failed \n Error: ${err.message}\n`));
} else {
  console.error('\n❗ Arguments name and description is required.\n');
}
