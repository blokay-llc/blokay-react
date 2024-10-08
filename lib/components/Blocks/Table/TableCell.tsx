import { money } from "../../../helpers/functions";

type TableCellProps = {
  td: any;
  eventsRef: any;
  showAll: (td: string) => void;
};

const RenderTd = ({ td, eventsRef, showAll }: TableCellProps) => {
  if (td == null) {
    return <strong>NULL</strong>;
  } else if (td?.type == "money") {
    return <span>{money(td.text)}</span>;
  } else if (td?.type == "number") {
    return <span>{td.text}</span>;
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
  } else if (td?.text) {
    return <span>{td.text}</span>;
  }

  if (td?.length > 50) {
    return (
      <div className="min-w-48">
        <div>{("" + td).substring(0, 50)}...</div>
        <div className="table-show-all" onClick={() => showAll(td)}>
          Show all
        </div>
      </div>
    );
  }

  return td;
};

export function TableCell({ td, eventsRef, showAll }: TableCellProps) {
  return (
    <td>
      <RenderTd td={td} eventsRef={eventsRef} showAll={showAll} />
    </td>
  );
}
