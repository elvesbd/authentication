import * as bcrypt from 'bcrypt';

const ROUNDS = 10;

export class EncryptUtils {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, ROUNDS);
  }

  static async verifyPassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }
}
