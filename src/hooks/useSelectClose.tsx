import { useEffect } from 'react';
import { handler } from '../utils/utils';

function useSelectClose(
  selectSortingRef: React.MutableRefObject<null>,
  setSortDisplay: React.Dispatch<React.SetStateAction<boolean>>,
  selectCategoryRef: React.MutableRefObject<null>,
  setCategoryDisplay: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    document.addEventListener('click', (e) =>
      handler(
        e,
        selectSortingRef,
        setSortDisplay,
        selectCategoryRef,
        setCategoryDisplay
      )
    );

    return () => {
      document.removeEventListener('click', (e) =>
        handler(
          e,
          selectSortingRef,
          setSortDisplay,
          selectCategoryRef,
          setCategoryDisplay
        )
      );
    };
  }, [selectSortingRef, selectCategoryRef]);
}

export default useSelectClose;
