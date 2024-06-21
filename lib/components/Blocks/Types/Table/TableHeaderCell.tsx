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
      className="bl-th-sortable"
      onClick={() =>
        setSort({
          [index]: sort?.[index] == "DESC" ? "ASC" : "DESC",
        })
      }
    >
      <div className="bl-flex bl-items-center bl-gap-2">
        <span>{th.replaceAll("__", " ")}</span>
        {sort && sort[index] && (
          <Icon
            icon={sort?.[index] == "ASC" ? "arrow_top" : "arrow_bottom"}
            className="bl-h-4 bl-w-4 dark:bl-fill-neutral-200 bl-fill-neutral-900"
          />
        )}
      </div>
    </th>
  );
}
