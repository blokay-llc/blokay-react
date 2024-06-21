import { useState, useEffect, useContext } from "react";
import { Context } from "../BlokayProvider";
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

  if (row.type == "textarea") {
    return (
      <DS.Textarea
        value={form[row.name]}
        error={errors[row.name]}
        onChange={(val: string) => {
          setForm({ ...form, [row.name]: val });
        }}
        label={row.label}
      />
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
function BlockForm({ onBack, block, form, setForm, errors, execBlock }: any) {
  return (
    <div className="bl-block-form">
      <div className="bl-block-form-header">
        {onBack && (
          <div className="bl-action-button" onClick={() => onBack()}>
            <DS.Icon icon="left" className="bl-icon" />
          </div>
        )}
        <h2 className="bl-block-form-title">{block.description}</h2>
      </div>

      {block.filters?.fields && (
        <div className="bl-block-form-fields">
          {block.filters.fields.map((row: any, index: number) => (
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

      <div className="bl-block-form-footer">
        <DS.Button
          text={block?.filters?.button || "Generate"}
          onClick={() => execBlock(block)}
          variant="secondary"
          size="md"
        />
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
  onChangeForm?: null | (() => void);
};
const Block = (props: BlockProps) => {
  const { api } = useContext(Context);
  const [form, setForm] = useState({ ...props.defaultForm });
  const [block, setBlock]: any = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]: any = useState({});
  const [exception, setException]: any = useState(null);
  const [autoexecuted, setAutoxecuted]: any = useState(false);

  const setFormInterceptor = (form: any) => {
    setForm(form);
    props.onChangeForm && props.onChangeForm();
  };

  const getBlock = ({ neuronId, neuronKey }: any) => {
    if (!neuronId && !neuronKey) return;
    if (loading) return;
    setLoading(true);
    api
      .blockGet({ neuronId, neuronKey })
      .then((result: any) => {
        const n = result.Neuron;
        const autoExec =
          (result.Neuron.filters.autoExec == undefined ||
            result.Neuron.filters.autoExec) &&
          !n.filters?.fields?.length;

        setAutoxecuted(autoExec);
        setBlock(n);

        if (autoExec) {
          return execBlock(n);
        } else {
          setLoading(false);
        }
      })
      .catch((error: any) => {
        setException(error);
        setLoading(false);
      });
  };

  const execBlock = (n: any) => {
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

    api
      .blockExec({
        neuronId: n.id,
        form,
      })
      .then((result: any) => {
        setResponse(result.response);
        props.onExec && props.onExec(result.response);
      })
      .catch((error: any) => {
        setException(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getBlock({ neuronId: props.neuronId, neuronKey: props.neuronKey });
  }, []);

  if (exception) {
    return <div className="bl-exception">{JSON.stringify(exception)}</div>;
  }

  return (
    <div className="bl-block bl-group">
      <div
        className={`bl-h-full bl-flex bl-w-full  ${
          !response ? "bl-items-center" : ""
        } bl-justify-center `}
      >
        {loading && (
          <div className="bl-block-loader">
            <DS.Loader size="md" />
          </div>
        )}

        {(!loading || block?.id) && (
          <>
            {block &&
              !response &&
              (block.filters.autoExec == false ||
                block.filters?.fields?.length > 0) && (
                <BlockForm
                  onBack={props.onBack}
                  block={block}
                  form={form}
                  setForm={setFormInterceptor}
                  errors={errors}
                  execBlock={execBlock}
                />
              )}

            {response && (
              <BlockResponse
                response={response}
                block={block}
                onReload={() => {
                  execBlock(block);
                }}
                autoExecuted={block.filters.autoExec}
                onBack={
                  !autoexecuted
                    ? () => {
                        setResponse(null);
                      }
                    : null
                }
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

const BlockWrapper = (props: BlockProps) => {
  const { session } = useContext(Context);

  if (!session) {
    return <div className="bl-exception"></div>;
  }

  return <Block {...props} />;
};
export default BlockWrapper;
