function SelectCategoriesView(
  categories: {
    name: string;
    id: string;
    data: string;
  }[],
  category: string,
  handleClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
) {
  const selectItems = categories.map(({ name, id, data }) => {
    if (name === category) return;
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

export default SelectCategoriesView;
