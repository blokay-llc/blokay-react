import { Icon } from "./Index";

type BoxProps = {
  title: string;
  icon: string;
  onClick?: any;
};
const Box = function ({ title, icon, onClick }: BoxProps) {
  const handleClick = (e: any) => {
    onClick && onClick(e);
  };
  return (
    <div
      className="bl-flex bl-items-center bl-gap-3 bl-p-3 bl-rounded-lg hover:bl-bg-gray-100 bl-cursor-pointer"
      onClick={handleClick}
    >
      <div>
        <Icon className="bl-w-6 bl-h-6" icon={icon} />
      </div>
      <h2>{title}</h2>
    </div>
  );
};

export default Box;