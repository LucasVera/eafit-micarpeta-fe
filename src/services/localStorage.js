export const Keys = {
  USER: 'user',
};

export const getObj = (key) => {
  const jsonString = localStorage.getItem(key);
  if (!jsonString) {
    return {};
  }

  return JSON.parse(jsonString);
}

export const setObj = (key, obj) => {
  const jsonString = JSON.stringify(obj);
  localStorage.setItem(key, jsonString);
}
