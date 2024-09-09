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
    <div className="values">
      <h2 className="values-title">{title}</h2>
      <div className="values-container">
        {getValues().map((val: any) => (
          <div key={val.label} className="text-center">
            <div className="values-label ">
              {val.label.replaceAll("__", " ")}
            </div>
            <div className="values-value">{val.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Values;
