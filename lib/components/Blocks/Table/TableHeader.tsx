import { useRef } from "react";
import { Icon, Input, Button, Modal, Select } from "../../DS/Index";

type TableHeaderProps = {
  onBack: () => void;
  autoExecuted?: boolean;
  blockName: string;
  filters: any;
  data: any;
  setPage: (val: number) => void;
  setFilters: (val: any) => void;
  onReload: () => void;
  showTitle: boolean;
  showSearchBar: boolean;
  canFilter: boolean;
  onExport?: () => void;
};
export function TableHeader({
  onBack,
  autoExecuted,
  blockName,
  filters,
  data,
  setPage,
  setFilters,
  onReload,
  showTitle,
  showSearchBar,
  canFilter,
  onExport,
}: TableHeaderProps) {
  const modalFilter: any = useRef();

  const clickFilter = () => {
    modalFilter.current.showModal();
  };

  return (
    <>
      <div className="mb-5 justify-end flex items-center gap-3">
        <div className="flex gap-3 items-center mr-auto">
          {onBack && !autoExecuted && (
            <div className="back-button" onClick={onBack}>
              <Icon icon="left" className="icon" />
            </div>
          )}
          {showTitle && (
            <div className="text-neutral-800 dark:text-neutral-200">
              {blockName}
            </div>
          )}
        </div>

        {showSearchBar && data?.data?.length > 10 && (
          <div className="ml-auto lg:w-1/3">
            <Input
              type="text"
              value={filters.search}
              onChange={(val: string) => {
                setPage(1);
                setFilters({ ...filters, search: val });
              }}
              autoComplete="off"
              label="Search"
              icon="search"
              className="input-search-main "
            />
          </div>
        )}

        {onExport && data.data.length > 0 && (
          <Button
            variant="secondary"
            type="button"
            size="xs"
            icon="download"
            text="Export"
            onClick={() => onExport()}
          />
        )}

        {canFilter && data.data.length > 0 && (
          <Button
            variant="secondary"
            type="button"
            size="xs"
            icon="filter"
            text={`Filter${
              filters.fields.length > 0
                ? " (" + filters.fields.length + ")"
                : ""
            }`}
            onClick={() => clickFilter()}
          />
        )}

        {onReload && (
          <Button
            icon="refresh"
            variant="secondary"
            type="button"
            size="xs"
            text="Refresh"
            onClick={() => onReload()}
          />
        )}
      </div>

      <Modal size="md" position="center" ref={modalFilter}>
        {filters.fields.length > 0 && (
          <div className="flex flex-col gap-3 mb-5">
            {filters.fields.map((item: any, index: any) => (
              <div className="grid grid-cols-12 items-center gap-2" key={index}>
                <div className="col-span-4">
                  <Select
                    label="Column"
                    value={item.col}
                    onChange={(val: string) => {
                      setFilters((prev: any) => {
                        const newFilters = { ...prev };
                        newFilters.fields[index].col = val;
                        return newFilters;
                      });
                    }}
                    type="select"
                    mb="0"
                  >
                    {data.header.map((item: any, index: any) => (
                      <option key={"filter-col-" + index} value={index}>
                        {item}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-span-3">
                  <Select
                    label="Condition"
                    value={item.cond}
                    onChange={(val: string) => {
                      setFilters((prev: any) => {
                        const newFilters = { ...prev };
                        newFilters.fields[index].cond = val;
                        return newFilters;
                      });
                    }}
                    type="select"
                    mb="0"
                  >
                    <option value=">">&gt;</option>
                    <option value="<">&lt;</option>
                    <option value="=">Equals to</option>
                    <option value="!=">Different to</option>
                    <option value="contains">Contains</option>
                    <option value="not_contains">Not contains</option>
                  </Select>
                </div>
                <div className="col-span-4">
                  <Input
                    label="Value"
                    value={item.value}
                    onChange={(val: string) => {
                      setFilters((prev: any) => {
                        const newFilters = { ...prev };
                        newFilters.fields[index].value = val;
                        return newFilters;
                      });
                    }}
                    type="text"
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    icon="delete"
                    variant="third"
                    type="button"
                    size="lg"
                    onClick={() =>
                      setFilters((prev: any) => {
                        const newFilters = {
                          ...prev,
                          fields: [...prev.fields],
                        };
                        newFilters.fields.splice(index, 1);
                        return { ...newFilters };
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <Button
          icon="add"
          variant="third"
          type="button"
          size="xs"
          text="Add new filter"
          onClick={() =>
            setFilters({
              ...filters,
              fields: [...filters.fields, { cond: "=", value: "", col: 0 }],
            })
          }
        />
      </Modal>
    </>
  );
}
