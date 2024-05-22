import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Modal } from "../DS/Index";
import Block from "./Block";

type EventsProps = {
  onExecuted?: null | (() => void);
};
function EventsHandler({ onExecuted = null }: EventsProps, ref: any) {
  const subneuronDefault: any = {
    neuronId: null,
    neuronKey: "",
    form: {},
  };
  const [subneuron, setSubneuron] = useState(subneuronDefault);
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
      setSubneuron({ neuronId, neuronKey, form });
      modalRef.current.showModal();
    },
  };

  useImperativeHandle(ref, () => ({
    functions,
  }));

  return (
    <>
      <Modal size="lg" position="center" ref={modalRef}>
        {(subneuron.neuronKey || subneuron.neuronId) && (
          <Block
            neuronId={subneuron.neuronId}
            neuronKey={subneuron.neuronKey}
            defaultForm={subneuron.form}
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
