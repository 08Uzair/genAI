export const localStorageProvider = {
  save(LOCAL_KEY, data) {
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



export const getRelativeTime=(isoDateString,defaultString)=> {
  if (!isoDateString) return defaultString;

  const past = new Date(isoDateString);
  if (isNaN(past.getTime())) return defaultString;

  const now = new Date();
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) {
    const mins = Math.floor(diffInSeconds / 60);
    return `${mins} min${mins > 1 ? 's' : ''} ago`;
  }
  if (diffInSeconds < 86400) {
    const hrs = Math.floor(diffInSeconds / 3600);
    return `${hrs} hr${hrs > 1 ? 's' : ''} ago`;
  }
  if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }

  const years = Math.floor(diffInSeconds / 31536000);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}