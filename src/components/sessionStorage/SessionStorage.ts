interface StorageOptions {
  override: boolean,
}

const SessionStorage = () => {
  const setItem = (key: string, value: string, options: StorageOptions = { override: true }): void => {
    if (!options.override) {
      const oldValue = window.sessionStorage.getItem(key);
      if (oldValue) return;
    }
    window.sessionStorage.setItem(key, value);
  };

  const setItemJSON = (key: string, item: Object, options: StorageOptions = { override: true }): void => {
    if (!options.override) {
      const oldValue = window.sessionStorage.getItem(key);
      if (oldValue) return;
    }
    const strValue = JSON.stringify(item);
    return window.sessionStorage.setItem(key, strValue);
  };

  const getItem = (key: string): string | null => window.sessionStorage.getItem(key);

  const getItemJSON = (key: string): any => {
    const value = window.sessionStorage.getItem(key);
    if (!value)
      return null;
    try {
      const parsedValue = JSON.parse(value);
      return parsedValue;
    } catch (e: any) {
      console.error(e);
      return null;
    }
  };

  const removeItem = (key: string): void => {
    window.sessionStorage.removeItem(key);
  }

  return {
    setItem,
    getItem,
    getItemJSON,
    setItemJSON,
    removeItem
  };
};

export default SessionStorage;
