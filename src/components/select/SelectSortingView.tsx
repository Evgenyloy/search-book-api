function SelectSortingView(
  sortingBy: {
    name: string;
    id: string;
    data: string;
  }[],
  sort: string,
  handleClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
) {
  const selectItems = sortingBy.map(({ name, id, data }) => {
    if (name === sort) return;
    return (
      <li className="dropdown__item" key={id}>
        <a
          type="checkbox"
          className="dropdown__link"
          id={id}
          data-sort={data}
          onClick={handleClick}
        >
          {name}
        </a>
      </li>
    );
  });
  return selectItems;
}

export default SelectSortingView;
