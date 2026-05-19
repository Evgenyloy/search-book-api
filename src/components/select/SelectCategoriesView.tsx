import { handleSelectClick } from "../../utils/utils";
import { setCategories } from "../../slices/slice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";

interface SelectCategoriesViewProps {
  categories: {
    name: string;
    id: string;
    data: string;
  }[];
  category: string;
  setCategoryDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

function SelectCategoriesView({
  categories,
  category,
  setCategoryDisplay,
}: SelectCategoriesViewProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <>
      {categories.map(({ name, id, data }) => {
        if (name === category) return;
        return (
          <li className="dropdown__item" key={id}>
            <a
              type="checkbox"
              className="dropdown__link"
              id={id}
              data-sort={data}
              onClick={(e) =>
                handleSelectClick(
                  e,
                  setCategoryDisplay,
                  dispatch,
                  setCategories,
                  navigate
                )
              }
            >
              {name}
            </a>
          </li>
        );
      })}
    </>
  );
}

export default SelectCategoriesView;
