import { Icon, Select } from "../../DS/Index";

type TableFooterProps = {
  perPage: string;
  setPerPage: (val: number) => void;
  setPage: (val: number) => void;
  page: number;
  pagesCount: number;
};

export function TableFooter({
  perPage,
  setPerPage,
  setPage,
  page,
  pagesCount,
}: TableFooterProps) {
  return (
    <div className="table-footer">
      <Select
        label="Per page"
        value={perPage}
        onChange={(val: string) => {
          setPerPage(+val);
        }}
        type="select"
        mb="0"
      >
        <option value="">Select an option</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </Select>
      <div className="table-page">
        {page > 1 && (
          <div className="action-button" onClick={() => setPage(page - 1)}>
            <Icon icon="left" className="icon" />
          </div>
        )}

        <span>
          Page: {page} - {pagesCount}
        </span>

        {page < pagesCount && (
          <div className="action-button" onClick={() => setPage(page + 1)}>
            <Icon icon="right" className="icon" />
          </div>
        )}
      </div>
    </div>
  );
}
