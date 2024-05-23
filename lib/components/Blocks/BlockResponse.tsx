import Table from "./Types/Table";
import ChartLine from "./Types/ChartLine";
import Values from "./Types/Values";
import Exception from "./Types/Exception";
import ChartDoughnut from "./Types/ChartDoughnut";

const BlockResponse = ({
  neuron,
  response,
  onReload,
  onBack,
  autoExecuted,
}: any) => {
  return (
    <>
      <div className="  bl-h-full bl-overflow-y-auto bl-p-5 ">
        {response?.type == "exception" && <Exception data={response.content} />}

        {response?.type == "table" && (
          <Table
            neuronName={neuron?.description}
            data={response.content}
            onReload={onReload}
            onBack={onBack}
            autoExecuted={autoExecuted}
          />
        )}

        {response?.type == "line" && (
          <ChartLine
            title={neuron.description}
            data={response.content}
            onReload={onReload}
          />
        )}
        {response?.type == "doughnut" && (
          <ChartDoughnut
            title={neuron.description}
            data={response.content}
            onReload={onReload}
          />
        )}
        {response?.type == "value" && (
          <Values
            title={neuron.description}
            data={response.content}
            onReload={onReload}
          />
        )}
      </div>
    </>
  );
};
export default BlockResponse;
