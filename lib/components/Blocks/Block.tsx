import { useState, useEffect } from "react";
import { brainGet, brainExec } from "../../services/brain";
import * as DS from "../DS/Index";
import BlockResponse from "./BlockResponse";

function BlockField({ row, form, errors, setForm }: any) {
  if (row.type == "hidden") {
    return <></>;
  }

  if (row.type == "file") {
    return (
      <DS.File
        onChangeFiles={(val: any) => {
          setForm({ ...form, [row.name]: val.url });
        }}
        label={row.label}
      />
    );
  }

  if (row.type == "select") {
    return (
      <DS.Select
        value={form[row.name]}
        error={errors[row.name]}
        onChange={(val: string) => {
          setForm({ ...form, [row.name]: val });
        }}
        label={row.label}
      >
        <option value="">Select an option</option>
        {row.options?.length > 0 &&
          row.options.map((opt: any, index: number) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
      </DS.Select>
    );
  }

  return (
    <DS.Input
      type={row.type}
      value={form[row.name]}
      error={errors[row.name]}
      onChange={(val: string) => {
        setForm({ ...form, [row.name]: val });
      }}
      label={row.label}
    />
  );
}
function BlockForm({ onBack, neuron, form, setForm, errors, execNeuron }: any) {
  return (
    <div className="bl-py-6 bl-h-full bl-flex bl-items-center bl-justify-center ">
      <div className=" lg:bl-max-w-96 lg:bl-min-w-96 bl-min-w-[90%] bl-bg-white bl-border-white/10 dark:bl-border dark:bl-bg-stone-800 bl-rounded-xl bl-px-5 bl-pb-5 bl-pt-10">
        <div className="bl-flex bl-items-center bl-gap-3">
          {onBack && (
            <div
              className="bl-flex bl-gap-3 bl-items-center"
              onClick={() => onBack()}
            >
              <div className="bl-size-8 bl-p-1 bl-cursor-pointer hover:bl-bg-slate-300 bl-rounded-full bl-bg-slate-200">
                <DS.Icon
                  icon="left"
                  className="bl-fill-slate-900 bl-w-full bl-h-full"
                />
              </div>
              <div></div>
            </div>
          )}
          <h2 className="bl-text-base md:bl-text-lg bl-font-medium bl-text-stone-600 dark:bl-text-stone-300">
            {neuron.description}
          </h2>
        </div>

        {neuron.filters?.fields && (
          <div className="bl-grid bl-grid-cols-2 bl-w-full bl-gap-3 bl-mt-5">
            {neuron.filters.fields.map((row: any, index: number) => (
              <div
                key={index}
                className={`${
                  row.grid == 6 ? "bl-col-span-1" : "bl-col-span-2"
                } `}
              >
                <BlockField
                  row={row}
                  form={form}
                  errors={errors}
                  setForm={setForm}
                />
              </div>
            ))}
          </div>
        )}

        <div className="bl-mt-5 md:bl-mt-5 bl-border-t-2  bl-border-gray-200 dark:bl-border-stone-800 bl-pt-5 bl-text-center bl-flex bl-gap-3 md:bl-gap-5">
          <DS.Button
            text={neuron?.filters?.button || "Generate"}
            onClick={() => execNeuron(neuron)}
            variant="primary"
            className="bl-w-full"
            size="lg"
            color="blue"
          />
        </div>
      </div>
    </div>
  );
}

type BlockProps = {
  neuronId?: string | null;
  neuronKey?: string | null;
  defaultForm?: any;
  onExec?: null | ((response: any) => void);
  onBack?: null | (() => void);
  editMode?: string;
};
const Block = ({
  neuronId = null,
  neuronKey = null,
  defaultForm = {},
  onExec = null,
  onBack = null,
  editMode = "",
}: BlockProps) => {
  const [form, setForm] = useState({ ...defaultForm });
  const [neuron, setNeuron]: any = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]: any = useState({});
  const [exception, setException]: any = useState(null);

  const [autoexecuted, setAutoxecuted]: any = useState(false);

  const jwtTokenComputed = localStorage.getItem("jwt_token_session") || "";

  const getNeuron = ({ neuronId, neuronKey }: any) => {
    if (!neuronId && !neuronKey) return;
    if (loading) return;
    setLoading(true);
    brainGet({ neuronId, neuronKey }, jwtTokenComputed)
      .then((result: any) => {
        const n = result.Neuron;
        const autoExec =
          (result.Neuron.filters.autoExec == undefined ||
            result.Neuron.filters.autoExec) &&
          !n.filters?.fields?.length;

        setAutoxecuted(autoExec);
        setNeuron(n);

        if (autoExec) {
          return execNeuron(n);
        } else {
          setLoading(false);
        }
      })
      .catch((error: any) => {
        setException(error);
        setLoading(false);
      });
  };

  const execNeuron = (n: any) => {
    const errorsTmp: any = {};

    if (n.filters?.fields) {
      for (const field of n.filters.fields) {
        if (!form[field.name] && field.isRequired) {
          errorsTmp[field.name] = "El campo es requerido";
        }
      }
      if (Object.values(errorsTmp).length > 0) {
        setErrors(errorsTmp);
        return;
      }
    }

    if (loading) return;
    setLoading(true);
    setErrors({});

    brainExec(
      {
        neuronId: n.id,
        form,
      },
      jwtTokenComputed
    )
      .then((result: any) => {
        setResponse(result.response);
        onExec && onExec(result.response);
      })
      .catch((error: any) => {
        setException(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getNeuron({ neuronId, neuronKey });
  }, []);

  return (
    <div className="bl-h-full bl-group bl-relative bl-border-2 bl-border-stone-300 dark:bl-border-stone-800 bl-overflow-y-hidden  bl-rounded-2xl bl-pt-0">
      {exception && (
        <div className=" bl-w-full bl-h-full bl-flex bl-justify-center bl-items-center bl-z-10 bl-bg-white/50 dark:bl-bg-black/50 bl-backdrop-blur-sm min-h-32 ">
          <div className="bl-text-center bl-text-stone-600 bl-text-lg">
            {JSON.stringify(exception)}
          </div>
        </div>
      )}
      <div
        className={`bl-overflow-y-auto bl-max-h-full bl-h-full bl-flex bl-w-full ${
          !response ? "bl-items-center" : ""
        } bl-justify-center `}
      >
        {loading && (
          <div className="bl-absolute bl-top-0 bl-left-0 bl-w-full bl-h-full bl-flex bl-justify-center bl-items-center bl-z-10 bl-bg-white/50 dark:bl-bg-black/50 bl-backdrop-blur-sm ">
            <DS.Loader size="md" />
          </div>
        )}

        {(!loading || neuron?.id) && (
          <div
            className={`bl-w-full ${
              editMode === "grid" ? "bl-opacity-70 bl-grayscale" : ""
            }`}
          >
            {!neuron?.id && (
              <div className="bl-text-center bl-text-stone-600 bl-text-lg">
                This doesn't exists
              </div>
            )}
            {neuron &&
              !response &&
              (neuron.filters.autoExec == false ||
                neuron.filters?.fields?.length > 0) && (
                <BlockForm
                  onBack={onBack}
                  neuron={neuron}
                  form={form}
                  setForm={setForm}
                  errors={errors}
                  execNeuron={execNeuron}
                />
              )}

            {response && (
              <BlockResponse
                response={response}
                neuron={neuron}
                onReload={() => {
                  execNeuron(neuron);
                }}
                autoExecuted={neuron.filters.autoExec}
                onBack={
                  !autoexecuted
                    ? () => {
                        setResponse(null);
                      }
                    : null
                }
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Block;
