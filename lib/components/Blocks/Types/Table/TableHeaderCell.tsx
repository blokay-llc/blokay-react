import { Icon } from "../../../DS/Index";

type TableHeaderCellProps = {
  setSort: (val: any) => void;
  index: number;
  sort: any;
  th: any;
};
export function TableHeaderCell({
  setSort,
  index,
  sort,
  th,
}: TableHeaderCellProps) {
  return (
    <th
      onClick={() =>
        setSort({
          [index]: sort?.[index] == "DESC" ? "ASC" : "DESC",
        })
      }
    >
      <div className="bl-table-th">
        <span>{th.replaceAll("__", " ")}</span>
        {sort && sort[index] && (
          <Icon
            icon={sort?.[index] == "ASC" ? "arrow_top" : "arrow_bottom"}
            className="bl-table-th-icon"
          />
        )}
      </div>
    </th>
  );
}
