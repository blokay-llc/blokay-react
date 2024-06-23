import * as DS from "../DS/Index";

type BlockFieldProps = {
  row: any;
  form: any;
  errors: any;
  setForm: any;
};
export function BlockField({ row, form, errors, setForm }: BlockFieldProps) {
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

type BlockFormProps = {
  onBack: any;
  block: any;
  form: any;
  setForm: any;
  errors: any;
  execBlock: any;
};
export function BlockForm({
  onBack,
  block,
  form,
  setForm,
  errors,
  execBlock,
}: BlockFormProps) {
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
