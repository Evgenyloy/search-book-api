import { useEffect } from 'react';
import { IBooksItem } from '../types/types';

export const useScrollSave = (books: IBooksItem[]) => {
  useEffect(() => {
    if (books.length) {
      const scrollPosition = sessionStorage.getItem('scrollPosition');
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
        sessionStorage.removeItem('scrollPosition');
      }
    }
  }, [books]);
};
