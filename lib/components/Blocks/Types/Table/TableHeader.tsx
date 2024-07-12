import { useRef } from "react";
import { Icon, Input, Button, Modal, Select } from "../../../DS/Index";

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
  canExport: boolean;
  showSearchBar: boolean;
  canFilter: boolean;
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
  canExport,
  showSearchBar,
  canFilter,
}: TableHeaderProps) {
  const modalFilter: any = useRef();

  // const generateExcel = () => {
  //   // Lógica para generar un archivo Excel
  //   // Implementa según sea necesario
  // };

  const download = (file: any, filename: string) => {
    const blob = new Blob([file], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const FileExportContent = () => {
    const dataTable = data.data.map((row: any[]) => {
      return row.map((col) => {
        if (typeof col == "object") {
          return col.text || "";
        }
        return col;
      });
    });
    return [data.header, ...dataTable];
  };

  const generateCSV = () => {
    const rows = FileExportContent();
    let csvContent = "";
    rows.forEach((rowArray) => {
      const row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    download(csvContent, `${encodeURIComponent(blockName)}.csv`);
  };

  const clickFilter = () => {
    modalFilter.current.showModal();
  };

  return (
    <>
      <div className="bl-mb-5 bl-justify-end bl-flex bl-items-center bl-gap-3">
        <div className="bl-flex bl-gap-3 bl-items-center bl-mr-auto">
          {onBack && !autoExecuted && (
            <div className="bl-back-button" onClick={onBack}>
              <Icon icon="left" className="bl-icon" />
            </div>
          )}
          {showTitle && (
            <div className="bl-text-neutral-800 dark:bl-text-neutral-200">
              {blockName}
            </div>
          )}
        </div>

        {showSearchBar && data?.data?.length > 10 && (
          <div className="bl-ml-auto lg:bl-w-1/3">
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
              className="bl-input-search-main "
            />
          </div>
        )}

        {canExport && data.data.length > 0 && (
          <Button
            variant="secondary"
            type="button"
            size="xs"
            icon="download"
            text="Export"
            onClick={() => generateCSV()}
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

        <Button
          icon="refresh"
          variant="secondary"
          type="button"
          size="xs"
          text="Refresh"
          onClick={() => onReload && onReload()}
        />
      </div>

      <Modal size="md" position="center" ref={modalFilter}>
        {filters.fields.length > 0 && (
          <div className="bl-flex bl-flex-col bl-gap-3 bl-mb-5">
            {filters.fields.map((item: any, index: any) => (
              <div
                className="bl-grid bl-grid-cols-12 bl-items-center bl-gap-2"
                key={index}
              >
                <div className="bl-col-span-4">
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
                <div className="bl-col-span-3">
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
                <div className="bl-col-span-4">
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
                <div className="bl-col-span-1">
                  <Button
                    icon="delete"
                    variant="third"
                    type="button"
                    size="lg"
                    onClick={() =>
                      setFilters((prev: any) => {
                        let newFilters = {
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
