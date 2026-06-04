const guestUserId = '01KM01JC9PS1R4X4FDJNFAR4AZ';

export type Auth = {
  readonly context: {
    message?: string;
    token?: string;
    userId?: string;
  };
  readonly isAuthorized: boolean;
};

export class JwtAuth {
  claims: Claims;
  token: string;
  userId: string;

  constructor(a?: Auth) {
    this.claims = claims(a?.context.token);
    this.token = a?.context.token ?? '';
    this.userId = a?.context.userId ?? '';
  }

  get IsInvalid() {
    return !this.IsValid;
  }

  get IsValid() {
    return this.claims.exp * 1000 > Date.now();
  }

  get IsGuest() {
    return this.userId === guestUserId;
  }
}

type Claims = {
  aud: string[]; // anonymous or identified
  exp: number; //1772347378;
  iat: number; //1772345578;
  iss: string; //'https://ByteLyon.com';
  jti: string; // userId;
  nbf: number; //1772345578;
  sub: string; //'019ca7c8-437a-7134-8c2b-c30d17dd62fc';
};

const claims = (jwt?: string): Claims => {
  try {
    // Get the payload from the jwt
    const payload = jwt?.split('.')[1] as string;

    // Convert the payload to Base64
    const base64Payload = payload.replace(/-/g, '+').replace(/_/g, '/');

    // Decode Base64 and parse JSON
    return JSON.parse(
      decodeURIComponent(
        atob(base64Payload)
          .split('')
          .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join(''),
      ),
    );
  } catch {
    return { aud: [], exp: 0, iat: 0, iss: '', jti: '', nbf: 0, sub: '' };
  }
};
