type LoaderProps = {
  size?: "sm" | "md";
  className?: string;
};
const Loader = ({ size, className = "" }: LoaderProps) => {
  const loaderStyle = {
    width: size === "sm" ? "1rem" : "80px",
    height: size === "sm" ? "1rem" : "80px",
  };

  return (
    <div className={`bl-lds-ring ${size} ${className}`} style={loaderStyle}>
      {[1, 2, 3, 4].map((x) => (
        <div key={x} />
      ))}
    </div>
  );
};

export default Loader;
