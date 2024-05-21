function AppValue({ title, data }: any) {
  const getValues = () => {
    const arr = [];
    for (const index in data) {
      arr.push({ label: index, value: data[index] });
    }
    return arr;
  };
  return (
    <div className="text-stone-800 dark:text-stone-200">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="flex flex-wrap items-center gap-3 lg:gap-10 justify-center">
        {getValues().map((val: any) => (
          <div key={val.label} className="text-center">
            <div className="text-2xl font-bold">{val.value}</div>
            <div className="font-light">{val.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppValue;
