import Table from "./Types/Table";
import ChartLine from "./Types/ChartLine";
import Values from "./Types/Values";
import Exception from "./Types/Exception";
import ChartDoughnut from "./Types/ChartDoughnut";

type BlockResponseProps = {
  neuron: any;
  response: any;
  onReload: any;
  onBack: any;
  autoExecuted: boolean;
};
const BlockResponse = ({
  neuron: block,
  response,
  onReload,
  onBack,
  autoExecuted,
}: BlockResponseProps) => {
  const components: any = {
    table: Table,
    line: ChartLine,
    doughnut: ChartDoughnut,
    value: Values,
    exception: Exception,
  };
  const Component = components[response?.type || "exception"] || Exception;

  return (
    <>
      <div className="  bl-h-full bl-overflow-y-auto bl-p-5 ">
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
