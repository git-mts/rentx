/* eslint @typescript-eslint/naming-convention: off */

declare namespace Express {
  export interface Request {
    user: {
      id: string;
      permissions: Array<{
        id: string;
        name: string;
        description: string;
        created_at: Date;
      }>;
    };
  }
}
