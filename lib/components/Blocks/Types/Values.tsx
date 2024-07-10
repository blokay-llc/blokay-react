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
    <div className="bl-text-neutral-400 dark:bl-text-neutral-400">
      <h2 className="bl-text-sm bl-font-light bl-pb-3 bl-mb-3 bl-border-b bl-border-neutral-200">
        {title}
      </h2>
      <div className="bl-flex bl-flex-wrap bl-items-center bl-gap-3 lg:bl-gap-10 bl-justify-center">
        {getValues().map((val: any) => (
          <div key={val.label} className="bl-text-center">
            <div className="bl-font-light bl-text-sm ">
              {val.label.replaceAll("__", " ")}
            </div>
            <div className="bl-text-3xl bl-font-bold bl-text-black dark:bl-text-white">
              {val.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Values;
