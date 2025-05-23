
export const localStorageProvider = {
  save(LOCAL_KEY,data) {
    try {
      const prevData = localStorageProvider.getStorage() || {};
      localStorage.setItem(LOCAL_KEY, JSON.stringify({ ...prevData, ...data }));
    } catch (error) {
      console.error('Error setting value in local storage:', error);
    }
  },

  getStorage(LOCAL_KEY) {
    try {
      const storedValue = localStorage.getItem(LOCAL_KEY);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error('Error getting value from local storage:', error);
      return null;
    }
  },

  removeStorage(LOCAL_KEY) {
    try {
      localStorage.removeItem(LOCAL_KEY);
    } catch (error) {
      console.error('Error removing value from local storage:', error);
    }
  },
};
