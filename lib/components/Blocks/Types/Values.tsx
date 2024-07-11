import { Props } from "./props";
function Values({ title, data }: Props) {
  const getValues = () => {
    const arr = [];
    for (const index in data) {
      arr.push({ label: index, value: data[index] });
    }
    return arr;
  };
  return (
    <div className="bl-value">
      <h2 className="bl-value-title">{title}</h2>
      <div className="bl-value-container">
        {getValues().map((val: any) => (
          <div key={val.label} className="bl-text-center">
            <div className="bl-value-label ">
              {val.label.replaceAll("__", " ")}
            </div>
            <div className="bl-value-value">{val.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Values;
