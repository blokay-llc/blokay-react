type LoaderProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};
const Loader = ({ size, className = "" }: LoaderProps) => {
  const loaderStyle = {
    width: size === "lg" ? "80px" : "",
    height: size === "sm" ? "1rem" : "",
  };

  return (
    <div className={`lds-ring ${size} ${className}`} style={loaderStyle}>
      {[1, 2, 3, 4].map((x) => (
        <div key={x} />
      ))}
    </div>
  );
};

export default Loader;
