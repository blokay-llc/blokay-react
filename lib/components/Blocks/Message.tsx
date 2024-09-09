import { Icon } from "../DS/Index";
import { Props } from "./props";

export default function Exception({ data }: Props) {
  const classSeverity = () => {
    if (data.severity == "error") {
      return "message-error";
    }
    if (data.severity == "warning") {
      return "message-warning";
    }
    if (data.severity == "message") {
      return "message-info";
    }
  };

  const icon = () => {
    if (data.severity == "error") {
      return "error";
    }
    return "info";
  };

  return (
    <div className={"message " + classSeverity()}>
      <Icon icon={icon()} className="size-5 fill-white" />
      <div>{data.message}</div>
    </div>
  );
}
