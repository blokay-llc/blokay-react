import { useState, useEffect, useContext } from "react";
import { Context } from "../BlokayProvider";
import * as DS from "../DS/Index";
import BlockResponse from "./BlockResponse";
import { BlockForm } from "./BlockForm";

type BlockProps = {
  blockId?: string | null;
  blockKey?: string | null;
  block?: string | null;
  defaultForm?: any;
  onExec?: null | ((response: any) => void);
  onBack?: null | (() => void);
  onChangeForm?: null | (() => void);
  defaultOptions?: any;
  autoExecute?: boolean;
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

  const getBlock = () => {
    if (loading) return;
    setLoading(true);
    api
      .blockGet({
        blockId: props.blockId,
        blockKey: props.blockKey || props.block,
      })
      .then((result: any) => {
        const n = result.Block;
        const autoExec =
          props.autoExecute ||
          ((result.Block.filters.autoExec == undefined ||
            result.Block.filters.autoExec) &&
            !n.filters?.fields?.length);

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

  const execBlock = (n: any, extraForm = {}) => {
    const errorsTmp: any = {};

    if (n.filters?.fields) {
      for (const field of n.filters.fields) {
        if (!form[field.name] && field.isRequired) {
          errorsTmp[field.name] = "The field is required";
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
        blockId: n.id,
        form: {
          ...form,
          ...extraForm,
        },
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
    getBlock();
  }, []);

  useEffect(() => {
    if (!props.autoExecute || !block) {
      return;
    }
    execBlock(block, props.defaultForm);
  }, [props.defaultForm, props.autoExecute]);

  if (exception) {
    return <div className="bl-exception">{JSON.stringify(exception)}</div>;
  }

  return (
    <div className="bl-block-box bl-group">
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
            {block && !response && !autoexecuted && (
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
                defaultOptions={props.defaultOptions || {}}
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
