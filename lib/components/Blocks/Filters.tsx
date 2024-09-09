import * as DS from "../DS/Index";
import { useState } from "react";
import { BlockType } from "../../types/Block";

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

type FiltersProps = {
  filters: BlockType["filters"];
  onBack?: any;
  execute: (form: any) => Promise<any>;
  title: string;
};
export function Filters(props: FiltersProps) {
  const [form, setForm] = useState<any>({});
  const [errors, setErrors]: any = useState({});
  const [loading, setLoading]: any = useState(false);
  const { onBack, title, execute, filters } = props;

  const handleSubmit = () => {
    const errorsTmp: any = {};
    if (filters?.fields) {
      for (const field of filters.fields) {
        if (!form[field.name] && field.isRequired) {
          errorsTmp[field.name] = "The field is required";
        }
      }
      if (Object.values(errorsTmp).length > 0) {
        return setErrors(errorsTmp);
      }
    }
    setLoading(true);
    setErrors({});

    execute(form)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="justify-center flex items-center h-full w-full">
      <div className="block-form">
        <div className="block-form-header">
          {onBack && (
            <div className="action-button" onClick={() => onBack()}>
              <DS.Icon icon="left" className="icon" />
            </div>
          )}
          <h2 className="block-form-title">{title}</h2>
        </div>

        {filters.fields && (
          <div className="block-form-fields">
            {filters.fields.map((row: any, index: number) => (
              <div
                key={index}
                className={`${row.grid == 6 ? "col-span-1" : "col-span-2"} `}
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

        <div className="block-form-footer">
          <DS.Button
            text={filters?.button || "Generate"}
            onClick={handleSubmit}
            variant="secondary"
            size="md"
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
