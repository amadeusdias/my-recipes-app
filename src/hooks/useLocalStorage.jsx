import { useEffect, useState } from 'react';

const useLocalStorage = (key, initial = null) => {
  const [state, setState] = useState(() => {
    const local = localStorage.getItem(key);
    return local ? JSON.parse(local) : initial;
  });

  useEffect(() => {
    if (!state) localStorage.clear();
    else localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
};

export default useLocalStorage;
