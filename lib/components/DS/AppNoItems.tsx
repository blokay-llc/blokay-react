export default function AppNoItems({ title, description }: any) {
  return (
    <div className="text-center bg-gray-100 rounded-lg p-5">
      <h2 className="text-lg">{title}</h2>
      <p className="font-light">{description}</p>
    </div>
  );
}
