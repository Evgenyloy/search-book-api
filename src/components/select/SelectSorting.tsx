import { forwardRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setSorting } from "../../slices/slice";
import { sortingByData } from "../../data";
import { handleSelectClick } from "../../utils/utils";
import { Ref, TSelectSortingProps } from "../../types/types";
import { useNavigate } from "react-router-dom";
import SelectSortingView from "./SelectSortingView";

const SelectSorting = forwardRef<Ref, TSelectSortingProps>(
  ({ setSortDisplay, sortDisplay }, dropdownRef) => {
    const sort = useAppSelector((state) => state.book.sorting);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const renderItems = SelectSortingView(sortingByData, sort, (e) =>
      handleSelectClick(e, setSortDisplay, dispatch, setSorting, navigate)
    );

    return (
      <div className="dropdown" ref={dropdownRef}>
        <p
          className="dropdown__name"
          onClick={() => setSortDisplay((display) => !display)}
        >
          {sort}{" "}
        </p>
        <ul
          className={sortDisplay ? "dropdown__list visible" : "dropdown__list"}
        >
          {renderItems}
        </ul>
      </div>
    );
  }
);

export default SelectSorting;
