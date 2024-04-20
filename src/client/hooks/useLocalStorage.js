import { useState } from "react";

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};

export const setLocalStorage = (keyName, value) => {
  try {
    window.localStorage.setItem(keyName, JSON.stringify(value));
  } catch (err) {
    console.log(err);
  }
};

export const getLocalStorage = (keyName) => {
  const value = window.localStorage.getItem(keyName);
  if (value) {
    return JSON.parse(value);
  } else {
    return null;
  }
};
