import { forwardRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setCategories } from "../../slices/slice";
import { categoriesData } from "../../data";
import { handleSelectClick } from "../../utils/utils";
import { Ref, TSelectCategoriesProps } from "../../types/types";
import { useNavigate } from "react-router-dom";
import SelectCategoriesView from "./SelectCategoriesView";

const SelectCategories = forwardRef<Ref, TSelectCategoriesProps>(
  ({ setCategoryDisplay, categoryDisplay }, selectCategoryRef) => {
    const categories = useAppSelector((state) => state.book.categories);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const renderItems = SelectCategoriesView(categoriesData, categories, (e) =>
      handleSelectClick(
        e,
        setCategoryDisplay,
        dispatch,
        setCategories,
        navigate
      )
    );

    return (
      <div className="dropdown" ref={selectCategoryRef}>
        <p
          className="dropdown__name"
          onClick={() => setCategoryDisplay((display) => !display)}
        >
          {categories}{" "}
        </p>
        <ul
          className={
            categoryDisplay ? "dropdown__list visible" : "dropdown__list"
          }
        >
          {renderItems}
        </ul>
      </div>
    );
  }
);

export default SelectCategories;
