import { useState, useEffect, useRef } from "react";

import { Modal } from "../../../DS/Index";
import Events from "../../Events";
import { PropsTable } from "../props";
import {
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableFooter,
  TableFooterRow,
} from "./Index";

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

const handleSearch = (toSearch: string) => {
  return (item: any) => {
    for (let j = 0; j < item.length; j++) {
      const str = ("" + item[j]).toLowerCase();
      if (str.includes(toSearch)) {
        return true;
      }
    }
    return false;
  };
};

const handleFilters = (filters: any) => {
  return (item: any) => {
    for (let j = 0; j < filters.length; j++) {
      const filter = filters[j];
      const val = item[filter.col];
      if (filter.cond == "=" && item[filter.col] != filter.value) {
        return false;
      } else if (filter.cond == "!=" && val == filter.value) {
        return false;
      } else if (filter.cond == ">" && val < filter.value) {
        return false;
      } else if (filter.cond == "<" && val > filter.value) {
        return false;
      } else if (filter.cond == "contains" && !val.includes(filter.value)) {
        return false;
      } else if (filter.cond == "not_contains" && val.includes(filter.value)) {
        return false;
      }
    }
    return true;
  };
};

const handleSort = (criteria: string, valCriteria: string) => {
  return (a: any, b: any) => {
    const val1 =
      typeof a[criteria] == "object" ? a[criteria]?.text : a[criteria];
    const val2 =
      typeof b[criteria] == "object" ? b[criteria]?.text : b[criteria];
    if (valCriteria == "DESC") {
      return sortTypes(val2, val1);
    }
    return sortTypes(val1, val2);
  };
};

export default function Table(props: PropsTable) {
  const {
    data,
    onReload,
    onBack,
    blockName = "",
    autoExecuted,
    options: {
      showHeader = true,
      showPagination = true,
      showTitle = true,
      showSearchBar = true,
      canExport = true,
      canFilter = true,
    },
  } = props;

  const modalShowTextRef: any = useRef();
  const eventsRef: any = useRef();
  const [sort, setSort]: any = useState(null);
  const [filters, setFilters] = useState({ search: "", fields: [] });
  const [page, setPage] = useState(1);
  const [PER_PAGE, setPerPage] = useState(
    showPagination ? 10 : Number.MAX_SAFE_INTEGER
  );
  const [textAll, setTextAll] = useState("");

  useEffect(() => {
    setPage(1);
  }, [data]);

  const getContent = () => {
    let content = data?.data.slice(0);
    if (!content?.length) return [];
    if (sort) {
      const criteria = Object.keys(sort)[0];
      content = content.sort(handleSort(criteria, sort[criteria]));
    }

    const toSearch = filters.search.toLowerCase();
    if (toSearch) {
      content = content.filter(handleSearch(toSearch));
    }

    if (filters.fields.length > 0) {
      content = content.filter(handleFilters(filters.fields));
    }
    return content;
  };

  const contentComputed = getContent();

  const tableContent = () => {
    const content = contentComputed;
    if (PER_PAGE == Number.MAX_SAFE_INTEGER) return content;

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
    if (PER_PAGE == Number.MAX_SAFE_INTEGER) return 1;
    let pages = 0;
    const rows = contentComputed;
    if (rows.length > PER_PAGE) {
      pages = rows.length / PER_PAGE;
    }
    pages = Math.floor(pages);
    return pages + 1;
  };

  const tableContentVals = tableContent();

  if (!data.header?.length && !data.data?.length) {
    return <div className="bl-table-no-results">No results to display.</div>;
  }

  return (
    <>
      {showHeader && (
        <TableHeader
          onBack={onBack}
          autoExecuted={autoExecuted}
          blockName={blockName}
          filters={filters}
          data={data}
          setPage={setPage}
          setFilters={setFilters}
          onReload={onReload}
          showTitle={showTitle}
          canExport={canExport}
          showSearchBar={showSearchBar}
          canFilter={canFilter}
        />
      )}

      <div className="bl-table">
        <table>
          {data.header && (
            <thead>
              <tr>
                {data.header.map((th: any, i: number) => (
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
                <tr key={"table-row-" + index}>
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

              <TableFooterRow data={contentComputed} />
            </tbody>
          )}
        </table>
      </div>

      {data?.data?.length > 10 && showPagination && (
        <TableFooter
          perPage={"" + PER_PAGE}
          setPerPage={setPerPage}
          setPage={setPage}
          page={page}
          pagesCount={pagesCount()}
        />
      )}

      <Events ref={eventsRef} onExecuted={() => onReload && onReload()} />
      <Modal size="lg" position="center" ref={modalShowTextRef}>
        <pre>{textAll}</pre>
      </Modal>
    </>
  );
}
