import { Table } from "./Types/Table/Index";
import ChartLine from "./Types/ChartLine";
import Values from "./Types/Values";
import Exception from "./Types/Exception";
import ChartDoughnut from "./Types/ChartDoughnut";
import Message from "./Types/Message";

const components: any = {
  table: Table,
  line: ChartLine,
  doughnut: ChartDoughnut,
  value: Values,
  exception: Exception,
  message: Message,
};

type BlockResponseProps = {
  block: any;
  response: any;
  onReload: any;
  onBack: any;
  autoExecuted: boolean;
  defaultOptions?: any;
  onExport: (data: any) => void;
};
const BlockResponse = ({
  block: block,
  response,
  onReload,
  onBack,
  autoExecuted,
  defaultOptions = {},
  onExport,
}: BlockResponseProps) => {
  const Component = components[response?.type || "exception"] || Exception;

  const options = {
    ...defaultOptions,
    ...(block?.options || {}),
  };
  return (
    <>
      <div className={`bl-block-response bl-response-${response?.type}`}>
        <Component
          data={response.content}
          blockName={block?.description}
          onReload={onReload}
          onBack={onBack}
          title={block.description}
          autoExecuted={autoExecuted}
          options={options}
          onExport={onExport}
        />
      </div>
    </>
  );
};
export default BlockResponse;
