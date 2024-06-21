import { Icon, Select } from "../../../DS/Index";

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
    <div className=" bl-flex bl-justify-between bl-items-center bl-select-none">
      <div className="bl-flex bl-gap-3 bl-items-center">
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
      </div>
      <div className="bl-flex bl-ml-auto bl-gap-2 bl-items-center">
        {page > 1 && (
          <div
            className="bl-size-8 bl-p-1 bl-cursor-pointer hover:bl-bg-neutral-300 bl-rounded-full bl-bg-neutral-50 dark:bl-bg-neutral-800"
            onClick={() => setPage(page - 1)}
          >
            <Icon
              icon="left"
              className="bl-fill-neutral-900 dark:bl-fill-neutral-200 bl-w-full bl-h-full"
            />
          </div>
        )}

        <span>
          Page: {page} - {pagesCount}
        </span>

        {page < pagesCount && (
          <div
            className="bl-size-8 bl-p-1 bl-cursor-pointer hover:bl-bg-neutral-300 bl-rounded-full bl-bg-neutral-50 dark:bl-bg-neutral-800"
            onClick={() => setPage(page + 1)}
          >
            <Icon
              icon="right"
              className="bl-fill-neutral-900 dark:bl-fill-neutral-200 bl-w-full bl-h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
