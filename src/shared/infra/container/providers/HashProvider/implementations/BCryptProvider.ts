import { compare, hash } from 'bcrypt';

import { IHashProvider } from '../IHashProvider';

export class BCryptProvider implements IHashProvider {
  async generate(data: string): Promise<string> {
    return hash(data, 8);
  }

  async compare(encrypted: string, data: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}
