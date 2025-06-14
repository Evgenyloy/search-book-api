import { useEffect } from 'react';

function handler(
  event: MouseEvent,
  selectSortingRef: React.MutableRefObject<null>,
  setSortDisplay: React.Dispatch<React.SetStateAction<boolean>>,
  selectCategoryRef: React.MutableRefObject<null>,
  setCategoryDisplay: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (
    selectSortingRef.current &&
    !(selectSortingRef.current as HTMLElement).contains(
      event.target as HTMLElement
    )
  ) {
    setSortDisplay(false);
  }

  if (
    selectCategoryRef.current &&
    !(selectCategoryRef.current as HTMLElement).contains(
      event.target as HTMLElement
    )
  ) {
    setCategoryDisplay(false);
  }
}


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
