import { forwardRef } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { sortingByData } from "../../data";
import { Ref, TSelectSortingProps } from "../../types/types";
import SelectSortingView from "./SelectSortingView";

const SelectSorting = forwardRef<Ref, TSelectSortingProps>(
  ({ setSortDisplay, sortDisplay }, dropdownRef) => {
    const sort = useAppSelector((state) => state.book.sorting);

    return (
      <div className="dropdown" ref={dropdownRef}>
        <p
          className="dropdown__name"
          onClick={() => setSortDisplay((display) => !display)}
        >
          {sort}{" "}
        </p>
        <ul className={`dropdown__list ${sortDisplay ? "visible" : ""}`}>
          <SelectSortingView
            sortingBy={sortingByData}
            sort={sort}
            setSortDisplay={setSortDisplay}
          />
        </ul>
      </div>
    );
  }
);

export default SelectSorting;
