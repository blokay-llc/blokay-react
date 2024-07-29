import { money } from "../../../../helpers/functions";

type TableCellProps = {
  td: any;
  eventsRef: any;
  showAll: (td: string) => void;
};

export function TableCell({ td, eventsRef, showAll }: TableCellProps) {
  const renderTd = () => {
    if (td == null) {
      return <strong>NULL</strong>;
    } else if (td?.type == "money") {
      return <span>{money(td.text)}</span>;
    } else if (td?.html) {
      return (
        <div
          onClick={() => {
            td.click && eventsRef.current.functions[td.click](td.args);
          }}
          dangerouslySetInnerHTML={{
            __html: td.html,
          }}
        />
      );
    } else if (td?.type == "text") {
      return <span>{td.text}</span>;
    }

    if (td.length > 50) {
      <div>
        <div>{("" + td).substring(0, 50)}...</div>
        <div className="bl-table-show-all" onClick={() => showAll(td)}>
          Show all
        </div>
      </div>;
    }

    return td;
  };
  return <td>{renderTd()}</td>;
}
