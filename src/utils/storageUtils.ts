export const isStoredItem = (item: string, storage: "local" | "session") => {
  switch (storage) {
    case "local":
      return isStoredItemLocal(item);
    case "session":
      return isStoredItemSession(item);
  }
};

const isStoredItemSession = (item: string): boolean => {
  const sessionState = sessionStorage.getItem(item);

  return sessionState ? true : false;
};

const isStoredItemLocal = (item: string): boolean => {
  const data = localStorage.getItem(item);
  return data ? true : false;
};
