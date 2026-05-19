import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { handleSelectClick } from "../../utils/utils";
import { setSorting } from "../../slices/slice";

interface SelectSortingViewProps {
  sortingBy: {
    name: string;
    id: string;
    data: string;
  }[];
  sort: string;
  setSortDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

function SelectSortingView({
  sortingBy,
  sort,
  setSortDisplay,
}: SelectSortingViewProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
      {sortingBy.map(({ name, id, data }) => {
        if (name === sort) return;
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
                  setSortDisplay,
                  dispatch,
                  setSorting,
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

export default SelectSortingView;
