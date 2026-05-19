import { forwardRef } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { categoriesData } from "../../data";
import { Ref, TSelectCategoriesProps } from "../../types/types";
import SelectCategoriesView from "./SelectCategoriesView";

const SelectCategories = forwardRef<Ref, TSelectCategoriesProps>(
  ({ setCategoryDisplay, categoryDisplay }, selectCategoryRef) => {
    const categories = useAppSelector((state) => state.book.categories);

    return (
      <div className="dropdown" ref={selectCategoryRef}>
        <p
          className="dropdown__name"
          onClick={() => setCategoryDisplay((display) => !display)}
        >
          {categories}{" "}
        </p>
        <ul className={`dropdown__list ${categoryDisplay ? "visible" : ""}`}>
          <SelectCategoriesView
            categories={categoriesData}
            category={categories}
            setCategoryDisplay={setCategoryDisplay}
          />
        </ul>
      </div>
    );
  }
);

export default SelectCategories;
