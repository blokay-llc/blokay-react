import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Modal } from "../DS/Index";
import Block from "./Block";

type EventsProps = {
  onExecuted?: null | (() => void);
};
function EventsHandler({ onExecuted = null }: EventsProps, ref: any) {
  const subBlockDefault: any = {
    neuronId: null,
    neuronKey: "",
    form: {},
  };
  const [subBlock, setSubBlock] = useState(subBlockDefault);
  const modalRef: any = useRef();

  const functions: any = {
    openNeuron: ({
      neuronId,
      neuronKey,
      form,
    }: {
      neuronId: number;
      neuronKey: string;
      form: any;
    }) => {
      setSubBlock({ neuronId, neuronKey, form });
      modalRef.current.showModal();
    },
  };

  useImperativeHandle(ref, () => ({
    functions,
  }));

  return (
    <>
      <Modal size="auto" position="center" ref={modalRef} bgColor="transparent">
        {(subBlock.neuronKey || subBlock.neuronId) && (
          <Block
            neuronId={subBlock.neuronId}
            neuronKey={subBlock.neuronKey}
            defaultForm={subBlock.form}
            onExec={(result: any) => {
              if (
                !result.type ||
                result.type == "error" ||
                result.type == "message"
              ) {
                modalRef.current.hideModal();
                onExecuted && onExecuted();
              }
            }}
          />
        )}
      </Modal>
    </>
  );
}

const Events = forwardRef(EventsHandler);

export default Events;
