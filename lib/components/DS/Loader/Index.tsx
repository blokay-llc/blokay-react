import "./Index.css";

const Loader = ({ size, className = "" }: any) => {
  const loaderStyle = {
    width: size === "sm" ? "1rem" : "80px",
    height: size === "sm" ? "1rem" : "80px",
  };

  const loaderClassName = `lds-ring ${size} ${className}`;

  return (
    <div className={loaderClassName} style={loaderStyle}>
      {[1, 2, 3, 4].map((x) => (
        <div key={x} />
      ))}
    </div>
  );
};

export default Loader;
