import { Icon, Input, Button } from "../../../DS/Index";

type TableHeaderProps = {
  onBack: () => void;
  autoExecuted?: boolean;
  blockName: string;
  filters: any;
  data: any;
  setPage: (val: number) => void;
  setFilters: (val: any) => void;
  onReload: () => void;
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
}: TableHeaderProps) {
  const generateExcel = () => {
    // Lógica para generar un archivo Excel
    // Implementa según sea necesario
  };

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

  return (
    <div className="bl-mb-5 bl-justify-end bl-flex bl-items-center bl-gap-3">
      <div className="bl-flex bl-gap-3 bl-items-center bl-mr-auto">
        {onBack && !autoExecuted && (
          <div className="bl-back-button" onClick={onBack}>
            <Icon icon="left" className="bl-icon" />
          </div>
        )}

        <div className="bl-text-neutral-800 dark:bl-text-neutral-200">
          {blockName}
        </div>
      </div>

      {data?.data?.length > 10 && (
        <div className="bl-ml-auto lg:bl-w-1/3">
          <Input
            type="text"
            value={filters.search}
            onChange={(val: string) => {
              setPage(1);
              setFilters({ ...filters, search: val });
            }}
            autocomplete="off"
            label="Search"
            icon="search"
            className="bl-input-search-main "
          />
        </div>
      )}

      {data.data.length > 0 && (
        <Button
          variant="secondary"
          type="button"
          size="xs"
          text="CSV"
          onClick={() => generateCSV()}
        />
      )}

      {data.data.length > 0 && (
        <Button
          variant="secondary"
          type="button"
          size="xs"
          text="Excel"
          onClick={() => generateExcel()}
        />
      )}

      <Button
        icon="refresh"
        variant="third"
        type="button"
        size="xs"
        text="Refresh"
        onClick={() => onReload && onReload()}
      />
    </div>
  );
}
