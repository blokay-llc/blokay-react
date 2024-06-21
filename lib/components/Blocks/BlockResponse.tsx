import { Table } from "./Types/Table/Index";
import ChartLine from "./Types/ChartLine";
import Values from "./Types/Values";
import Exception from "./Types/Exception";
import ChartDoughnut from "./Types/ChartDoughnut";

const components: any = {
  table: Table,
  line: ChartLine,
  doughnut: ChartDoughnut,
  value: Values,
  exception: Exception,
};

type BlockResponseProps = {
  block: any;
  response: any;
  onReload: any;
  onBack: any;
  autoExecuted: boolean;
};
const BlockResponse = ({
  block: block,
  response,
  onReload,
  onBack,
  autoExecuted,
}: BlockResponseProps) => {
  const Component = components[response?.type || "exception"] || Exception;

  return (
    <>
      <div className="bl-block-response">
        <Component
          data={response.content}
          blockName={block?.description}
          onReload={onReload}
          onBack={onBack}
          title={block.description}
          autoExecuted={autoExecuted}
        />
      </div>
    </>
  );
};
export default BlockResponse;
