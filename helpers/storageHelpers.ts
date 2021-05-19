export const saveToStorage = (key: string, value: any) => {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
};

export const findInStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};
