import { AppIcon } from "./Index";

const AppBox = function ({ title, icon, onClick }: any) {
  const handleClick = (e: any) => {
    onClick && onClick(e);
  };
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
      onClick={handleClick}
    >
      <div>
        <AppIcon className="w-6 h-6" icon={icon} />
      </div>
      <h2>{title}</h2>
    </div>
  );
};

export default AppBox;
