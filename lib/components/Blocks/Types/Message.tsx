import { Icon } from "../../DS/Index";
import { Props } from "./props";

export default function Exception({ data }: Props) {
  const classSeverity = () => {
    if (data.severity == "error") {
      return "bl-message-error";
    }
    if (data.severity == "warning") {
      return "bl-message-warning";
    }
    if (data.severity == "message") {
      return "bl-message-info";
    }
  };

  const icon = () => {
    if (data.severity == "error") {
      return "error";
    }
    return "info";
  };

  return (
    <div className={"bl-message " + classSeverity()}>
      <Icon icon={icon()} className="bl-size-5 bl-fill-white" />
      <div>{data.message}</div>
    </div>
  );
}
