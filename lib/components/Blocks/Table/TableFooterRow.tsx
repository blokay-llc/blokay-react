import { money } from "../../../helpers/functions";

type TableFooterRowProps = {
  data: any;
};
export function TableFooterRow({ data }: TableFooterRowProps) {
  const footerRow = () => {
    if (!data?.length) return { sum: [] };

    let actived = false;
    const sumArray: any = Array(data[0].length).fill(null);
    for (const row of data) {
      for (const index in row) {
        const val: any = row[index];
        if (!val?.fn) {
          continue;
        }
        actived = true;
        if (val.fn == "SUM") {
          if (!sumArray[index])
            sumArray[index] = { val: 0, fn: val?.fn, type: val.type };
          sumArray[index].val += +val.text;
        } else if (val.fn === "COUNT") {
          if (!sumArray[index])
            sumArray[index] = { val: 0, fn: val?.fn, type: val.type };
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

  return (
    footerRowVals?.length > 0 && (
      <tr>
        {footerRowVals.map((item: any, index: number) => (
          <td key={"footer-row-" + index}>
            <span className="bl-text-sm bl-font-bold">
              <span>{item?.val}</span>
            </span>
          </td>
        ))}
      </tr>
    )
  );
}
