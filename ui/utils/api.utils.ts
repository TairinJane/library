const serverURL = 'http://localhost:8080';

export const toServerURL = (relativePath: string) => serverURL + relativePath;

export const toApiURL = (relativePath: string) => toServerURL('/api' + relativePath);

export const callApi = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const resp = await fetch(toApiURL(url), init);
  if (resp.ok) return await resp.json();
  else throw Error(resp.statusText);
};
