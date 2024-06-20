import { useState, useEffect, useRef } from "react";

import { Select, Input, Button, Icon, Modal } from "../../DS/Index";
import { money } from "../../../helpers/functions";
import Events from "../Events";
import { Props } from "./props";
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

function TableCell({ td, eventsRef, showAll }: any) {
  return (
    <td className="bl-text-sm">
      {typeof td == "object" && (
        <>
          {td == null && <strong>NULL</strong>}
          {(td?.type == "money" || td?.type == "number") && (
            <span>{money(td.text)}</span>
          )}
          {td?.type == "text" && <span>{td.text}</span>}

          {td?.html && (
            <div
              onClick={() => {
                td.click && eventsRef.current.functions[td.click](td.args);
              }}
              dangerouslySetInnerHTML={{
                __html: td.html,
              }}
            />
          )}
        </>
      )}

      {typeof td != "object" && (
        <>
          {td.length > 50 ? (
            <div>
              <div>{("" + td).substring(0, 50)}...</div>
              <div
                className="bl-underline bl-font-bold bl-text-neutral-600 bl-text-xs bl-cursor-pointer"
                onClick={() => showAll(td)}
              >
                Show all
              </div>
            </div>
          ) : (
            td
          )}
        </>
      )}
    </td>
  );
}

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

export default function Table({
  data,
  onReload,
  onBack,
  blockName = "",
  autoExecuted,
}: Props) {
  const modalShowTextRef: any = useRef();
  const eventsRef: any = useRef();
  const [sort, setSort]: any = useState(null);
  const [filters, setFilters] = useState({ search: "" });
  const [table, setVarTable]: any = useState({ data: [], header: [] });
  const [page, setPage] = useState(1);
  const [PER_PAGE, setPerPage] = useState(10);
  const [textAll, setTextAll] = useState("");

  useEffect(() => {
    setTable();
  }, []);

  useEffect(() => {
    setTable(data);
  }, [data]);

  const setTable = (data: any = { data: [], header: [] }) => {
    setPage(1);
    setVarTable(data);
  };

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
    const data = table.data.map((row: any[]) => {
      return row.map((col) => {
        if (typeof col == "object") {
          return col.text || "";
        }
        return col;
      });
    });
    return [table.header, ...data];
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

  const getContent = () => {
    let content = table?.data.slice(0);
    if (!content?.length) return [];
    if (sort) {
      const criteria = Object.keys(sort)[0];
      const valCriteria = sort[criteria];
      const sortTypes = (a: any, b: any) => {
        if (typeof a == "string" && typeof b == "string") {
          a = a.toLowerCase();
          b = b.toLowerCase();
          if (a > b) {
            return -1;
          } else if (b > a) {
            return 1;
          }
          return 0;
        }
        return a - b;
      };
      content = content.sort((a: any, b: any) => {
        const val1 =
          typeof a[criteria] == "object" ? a[criteria]?.text : a[criteria];
        const val2 =
          typeof b[criteria] == "object" ? b[criteria]?.text : b[criteria];
        if (valCriteria == "DESC") {
          return sortTypes(val2, val1);
        }
        return sortTypes(val1, val2);
      });
    }

    const toSearch = filters.search.toLowerCase();
    if (toSearch) {
      content = content.filter((item: any) => {
        for (let j = 0; j < item.length; j++) {
          const str = ("" + item[j]).toLowerCase();
          if (str.includes(toSearch)) {
            return true;
          }
        }
        return false;
      });
    }
    return content;
  };
  const tableContent = () => {
    const content = getContent();

    const arr: any = [];
    const from = (page - 1) * PER_PAGE;
    const until = from + PER_PAGE;
    for (let i = from; i < until; i++) {
      if (i < content.length) {
        arr.push(content[i]);
      }
    }
    return arr;
  };

  const pagesCount = () => {
    let pages = 0;
    const rows = getContent();
    if (rows.length > PER_PAGE) {
      pages = rows.length / PER_PAGE;
    }
    pages = Math.floor(pages);
    return pages + 1;
  };

  const footerRow = () => {
    if (!table?.data?.length) return { sum: [] };
    let actived = false;
    const sumArray: any = Array(table.header.length).fill(null);
    for (const row of table.data) {
      for (const index in row) {
        const val: any = row[index];
        if (typeof val != "object") {
          continue;
        }
        actived = true;
        if (val.fn == "SUM") {
          if (!sumArray[index])
            sumArray[index] = { val: 0, fn: val.fn, type: val.type };
          sumArray[index].val += +val.text;
        } else if (val.fn === "COUNT") {
          if (!sumArray[index])
            sumArray[index] = { val: 0, fn: val.fn, type: val.type };
          sumArray[index].val += 1;
        }
      }
    }

    if (!actived) return [];
    return sumArray.map((item: any) => {
      if (!item) return null;
      let val = item.val;
      if (item.type == "money") {
        val = money(val);
      }
      item.val = val;
      return item;
    });
  };

  const footerRowVals = footerRow();
  const tableContentVals = tableContent();

  return (
    <div>
      <div>
        <div className="bl-mb-5">
          <div>
            <div className="bl-justify-end bl-flex bl-items-center bl-gap-3">
              <div className="bl-flex bl-gap-3 bl-items-center bl-mr-auto">
                {onBack && !autoExecuted && (
                  <div
                    className="bl-size-8 bl-p-1 bl-cursor-pointer bl-border-2 bl-border-neutral-100 hover:bl-border-neutral-300 bl-rounded-full bl-bg-white bl-shrink-0 dark:bl-border-black dark:bl-bg-black"
                    onClick={onBack}
                  >
                    <Icon
                      icon="left"
                      className="bl-fill-neutral-800 dark:bl-fill-neutral-100 bl-w-full bl-h-full"
                    />
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
                    label="Search"
                    icon="search"
                    className="bl-input-search-main "
                  />
                </div>
              )}

              {/* <div
                className="bl-flex bl-items-center bl-bg-neutral-200 dark:bl-bg-neutral-800 dark:bl-hover:bg-neutral-700 hover:bl-bg-neutral-300 bl-rounded-xl bl-size-10 bl-justify-center bl-shrink-0 "
                onClick={() => {
                  onReload && onReload();
                }}
              >
                <Icon
                  icon="refresh"
                  className="bl-size-6 bl-fill-neutral-600"
                />
              </div> */}

              {table.data.length > 0 && (
                <Button
                  variant="secondary"
                  type="button"
                  size="xs"
                  text="CSV"
                  onClick={() => generateCSV()}
                />
              )}

              {table.data.length > 0 && (
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
          </div>
        </div>

        <div className="bl-box">
          <div className="bl-box-table">
            <div>
              <div className=" bl-w-full">
                <div>
                  <div className="bl-table bl-overflow-x-scroll b-w-full">
                    {(table.header?.length > 0 || table.data?.length > 0) && (
                      <table className="bl-w-full bl-mb-2">
                        {table.header && (
                          <thead>
                            <tr className="bl-select-none">
                              {table.header.map((th: any, i: number) => (
                                <TableHeaderCell
                                  key={"cell-" + i}
                                  setSort={setSort}
                                  index={i}
                                  sort={sort}
                                  th={th}
                                />
                              ))}
                            </tr>
                          </thead>
                        )}

                        {tableContentVals && (
                          <tbody>
                            {tableContentVals.map((row: any, index: number) => (
                              <tr key={index}>
                                {row.map((td: any, k: number) => (
                                  <TableCell
                                    key={"cell-" + k}
                                    td={td}
                                    eventsRef={eventsRef}
                                    showAll={() => {
                                      setTextAll(td);
                                      modalShowTextRef.current.showModal();
                                    }}
                                  />
                                ))}
                              </tr>
                            ))}

                            {footerRowVals?.length > 0 && (
                              <tr>
                                {footerRowVals.map(
                                  (item: any, index: number) => (
                                    <td key={index}>
                                      <span className="bl-text-sm bl-font-bold">
                                        <span>{item?.val}</span>
                                      </span>
                                    </td>
                                  )
                                )}
                              </tr>
                            )}
                          </tbody>
                        )}
                      </table>
                    )}

                    {!table.header?.length && !table.data?.length && (
                      <div className=" bl-text-center bl-py-10 bl-text-2xl bl-text-neutral-700 bl-px-10 ">
                        No results to display.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {table?.data?.length > 10 && (
                <TableFooter
                  perPage={"" + PER_PAGE}
                  setPerPage={setPerPage}
                  setPage={setPage}
                  page={page}
                  pagesCount={pagesCount()}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Events
        ref={eventsRef}
        onExecuted={() => {
          onReload && onReload();
        }}
      />
      <Modal size="lg" position="center" ref={modalShowTextRef}>
        <div>
          <pre>{textAll}</pre>
        </div>
      </Modal>
    </div>
  );
}
