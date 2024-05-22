import AppData from "./Types/AppData";
import AppLine from "./Types/AppLine";
import AppValue from "./Types/AppValue";
import AppException from "./Types/AppException";
import AppDoughnut from "./Types/AppDoughnut";

const NeuronResponse = ({
  neuron,
  response,
  onReload,
  onBack,
  autoExecuted,
  jwtToken,
}: any) => {
  return (
    <>
      <div className="  bl-h-full bl-overflow-y-auto bl-p-5 ">
        {response?.type == "exception" && (
          <AppException data={response.content} />
        )}

        {response?.type == "table" && (
          <AppData
            jwtToken={jwtToken}
            neuronName={neuron?.description}
            data={response.content}
            onReload={onReload}
            onBack={onBack}
            autoExecuted={autoExecuted}
          />
        )}

        {response?.type == "line" && (
          <AppLine
            title={neuron.description}
            data={response.content}
            onReload={onReload}
          />
        )}
        {response?.type == "doughnut" && (
          <AppDoughnut
            title={neuron.description}
            data={response.content}
            onReload={onReload}
          />
        )}
        {response?.type == "value" && (
          <AppValue
            title={neuron.description}
            data={response.content}
            onReload={onReload}
          />
        )}
      </div>
    </>
  );
};
export default NeuronResponse;
