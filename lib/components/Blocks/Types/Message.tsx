import { Icon } from "../../DS/Index";
import { Props } from "./props";

export default function Exception({ data }: Props) {
  const classSeverity = () => {
    if (data.severity == "error") {
      return "bl-bg-red-600";
    }
    if (data.severity == "warning") {
      return "bl-bg-yellow-600";
    }
    if (data.severity == "message") {
      return "bl-bg-blue-600";
    }
  };

  const icon = () => {
    if (data.severity == "error") {
      return "error";
    }
    return "info";
  };

  return (
    <div
      className={
        " bl-text-white bl-px-3 bl-py-1  bl-rounded-lg bl-flex bl-items-center bl-gap-1 bl-select-none " +
        classSeverity()
      }
    >
      <Icon icon={icon()} className="bl-size-5 bl-fill-white" />
      <div>{data.message}</div>
    </div>
  );
}
