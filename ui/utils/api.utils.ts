const serverURL = 'http://localhost:8080';

export const toServerURL = (relativePath: string) => serverURL + relativePath;
