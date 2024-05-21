import { useState, useEffect, useRef } from "react";
import {
  AppSelect,
  AppInput,
  AppButton,
  AppIcon,
  AppModal,
} from "../../..//components/DS/Index";
import { money } from "../../../helpers/functions";
import Events from "../Events";

function TableHeaderCell({ setSort, index, sort, th }: any) {
  return (
    <th
      className="th-sortable"
      onClick={() =>
        setSort({
          [index]: sort?.[index] == "DESC" ? "ASC" : "DESC",
        })
      }
    >
      <div className="flex items-center gap-2">
        <span>{th}</span>
        {sort && sort[index] && (
          <AppIcon
            icon={sort?.[index] == "ASC" ? "arrow_top" : "arrow_bottom"}
            className="h-4 w-4 dark:fill-stone-200 fill-stone-900"
          />
        )}
      </div>
    </th>
  );
}

function TableCell({ td, eventsRef, showAll }: any) {
  return (
    <td className="text-sm">
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
                className="underline font-bold text-stone-600 text-xs cursor-pointer"
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

function TableFooter({
  perPage,
  setPerPage,
  onReload,
  setPage,
  page,
  pagesCount,
}: any) {
  return (
    <div className="mt-5 flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <AppSelect
          label="Por página"
          value={perPage}
          onChange={(val: string) => {
            setPerPage(+val);
          }}
          type="select"
          mb="0"
        >
          <option value="">Selecciona una opción</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </AppSelect>

        <div
          className="flex items-center bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 hover:bg-stone-300 rounded-xl size-10 justify-center shrink-0 "
          onClick={() => {
            onReload && onReload();
          }}
        >
          <AppIcon icon="refresh" className="size-6 fill-stone-600" />
        </div>
      </div>
      <div className="flex ml-auto gap-2 items-center">
        {page > 1 && (
          <div
            className="size-8 p-1 cursor-pointer hover:bg-stone-300 rounded-full bg-stone-50"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            <svg viewBox="0 0 24 24" className="fill-stone-900 w-full h-full">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
            </svg>
          </div>
        )}

        <span>
          Page: {page} - {pagesCount}{" "}
        </span>

        {page < pagesCount && (
          <div
            className="size-8 p-1 cursor-pointer hover:bg-stone-300 rounded-full bg-stone-50"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <svg viewBox="0 0 24 24" className="fill-slate-900 w-full h-full">
              <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

function AppData({
  data,
  onReload,
  onBack,
  neuronName = "",
  autoExecuted,
}: any) {
  const modalShowTextRef: any = useRef();
  const eventsRef: any = useRef();
  const [sort, setSort]: any = useState(null);
  const [filters, setFilters] = useState({ search: "" });
  const [table, setVarTable]: any = useState({ data: [], header: [] });
  const [page, setPage] = useState(1);
  const [PER_PAGE, setPerPage] = useState(10);
  const [textAll, setTextAll] = useState("");

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    init();
  }, [data]);

  const setTable = (data: any) => {
    setPage(1);
    if (data) {
      setVarTable(data);
    } else {
      setVarTable({ data: [], header: [] });
    }
  };

  const init = () => {
    setTable(data);
  };

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
    const data = table.data.map((row: any[]) => {
      return row.map((col) => {
        if (typeof col == "object") {
          return col.text;
        }
        return col;
      });
    });
    return [table.header, ...data];
  };

  const generateCSV = () => {
    const rows = FileExportContent();
    let csvContent = "";
    rows.forEach(function (rowArray) {
      const row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    download(csvContent, `${encodeURIComponent(neuronName)}.csv`);
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

  const footerRowVals: any = footerRow();
  const tableContentVals = tableContent();

  return (
    <div className="">
      <div className="">
        <div className="mb-5">
          <div>
            <div className="justify-end flex items-center gap-3">
              <div className="flex gap-3 items-center mr-auto">
                {onBack && !autoExecuted && (
                  <div
                    className="size-8 p-1 cursor-pointer border-2 border-stone-100 hover:border-stone-300 rounded-full bg-white shrink-0 dark:border-black dark:bg-black"
                    onClick={onBack}
                  >
                    <AppIcon
                      icon="left"
                      className="fill-stone-800 dark:fill-stone-100 w-full h-full"
                    />
                  </div>
                )}

                <div className="text-stone-800 dark:text-stone-200">
                  {neuronName}
                </div>
              </div>

              {data?.data?.length > 10 && (
                <div className="ml-auto lg:w-1/3">
                  <AppInput
                    type="text"
                    value={filters.search}
                    onChange={(val: string) => {
                      setPage(1);
                      setFilters({ ...filters, search: val });
                    }}
                    label="Search"
                    mb="0"
                    icon="search"
                    className="input-search-main "
                  />
                </div>
              )}

              {table.data.length > 0 && (
                <AppButton
                  variant="secondary"
                  type="button"
                  color="blue"
                  size="lg"
                  text="CSV"
                  onClick={() => generateCSV()}
                />
              )}
            </div>
          </div>
        </div>

        <div className="boxx">
          <div className="box-table">
            <div className="">
              <div className=" w-full">
                <div className="">
                  <div className="table overflow-x-scroll w-full">
                    {(table.header?.length > 0 || table.data?.length > 0) && (
                      <table className="w-full mb-2">
                        {table.header && (
                          <thead>
                            <tr>
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
                                      <span className="text-sm font-bold">
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
                      <div className=" text-center py-10 text-2xl text-stone-700 ">
                        No results to display.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {table?.data?.length > 10 && (
                <TableFooter
                  perPage={PER_PAGE}
                  setPerPage={setPerPage}
                  onReload={onReload}
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
      <AppModal size="lg" position="center" ref={modalShowTextRef}>
        <div>
          <pre>{textAll}</pre>
        </div>
      </AppModal>
    </div>
  );
}

export default AppData;
