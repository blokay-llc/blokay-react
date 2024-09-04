import { useEffect, useContext } from "react";
import { Context } from "../BlokayProvider";
import * as DS from "../DS/Index";
import BlockResponse from "./BlockResponse";
import { Filters } from "./Filters";
import useResource from "../../hooks/useResource";

type BlockProps = {
  block?: string | null;
  defaultForm?: any;
  onExec?: null | ((response: any) => void);
  onBack?: null | (() => void);
  onChangeForm?: null | (() => void);
  defaultOptions?: any;
  autoExecute?: boolean;
  jwt?: string | undefined;
};
const Block = (props: BlockProps) => {
  const {
    loading,
    exception,
    execute,
    response,
    block,
    clearResponse,
    onExport,
  } = useResource(props.block || "", props.jwt);

  useEffect(() => {
    if (!props.autoExecute || !block) {
      return;
    }
    execute(props.defaultForm);
  }, [block, props.defaultForm, props.autoExecute]);

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
            {block && !response && (
              <Filters
                title={block?.description}
                block={block}
                onBack={props.onBack}
                execute={execute}
              />
            )}

            {response && (
              <BlockResponse
                onExport={onExport}
                response={response}
                block={block}
                onReload={execute}
                autoExecuted={false}
                defaultOptions={props.defaultOptions || {}}
                onBack={() => {
                  clearResponse();
                }}
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
