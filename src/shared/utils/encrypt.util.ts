import * as bcrypt from 'bcrypt';

const ROUNDS = 10;

export class EncryptUtils {
  static async hashPassword(password: string): Promise<string> {
    const hashPassword = await bcrypt.hash(password, ROUNDS);
    return hashPassword;
  }

  static async verifyPassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    const result = await bcrypt.compare(password, hashPassword);
    return result;
  }
}
