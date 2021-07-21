export interface IHashProvider {
  generate(data: string): Promise<string>;
  compare(encrypted: string, data: string): Promise<boolean>;
}
