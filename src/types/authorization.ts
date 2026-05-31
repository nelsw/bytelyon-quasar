export type Authorization = {
  isAuthorized: boolean;
  context: {
    message?: string;
    token?: string;
  };
};

type Claims = {
  exp: number;
  jti: string;
};

const claims = (a: Authorization): Claims => {
  try {
    // Get the payload from the jwt
    const payload = a.context.token?.split('.')[1] as string;

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
    return { exp: 0, jti: '' };
  }
};


export const IsExperimental = (a: Authorization) =>
  claims(a).jti.match(/(01KM010XK0HY8HWWFPJTZGRF0F|01KMXGBJJE2GMCA1A9EXDGF4AJ)/g) !== null;
export const IsGuest = (a: Authorization) => claims(a).jti === '01KM01JC9PS1R4X4FDJNFAR4AZ';
export const IsValid = (a: Authorization) => claims(a).exp * 1000 > Date.now();
