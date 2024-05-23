function AppValue({ title, data }: any) {
  const getValues = () => {
    const arr = [];
    for (const index in data) {
      arr.push({ label: index, value: data[index] });
    }
    return arr;
  };
  return (
    <div className="bl-text-stone-800 dark:bl-text-stone-200">
      <h2 className="bl-text-lg font-bold mb-4">{title}</h2>
      <div className="bl-flex bl-flex-wrap bl-items-center bl-gap-3 lg:bl-gap-10 bl-justify-center">
        {getValues().map((val: any) => (
          <div key={val.label} className="bl-text-center">
            <div className="bl-text-2xl bl-font-bold">{val.value}</div>
            <div className="bl-font-light">{val.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppValue;
