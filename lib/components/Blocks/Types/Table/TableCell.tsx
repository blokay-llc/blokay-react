import { money } from "../../../../helpers/functions";

type TableCellProps = {
  td: any;
  eventsRef: any;
  showAll: (td: string) => void;
};
export function TableCell({ td, eventsRef, showAll }: TableCellProps) {
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
