export default function AppNoItems({ title, description }: any) {
  return (
    <div className="bl-text-center bl-bg-gray-100 bl-rounded-lg bl-p-5">
      <h2 className="bl-text-lg">{title}</h2>
      <p className="bl-font-light">{description}</p>
    </div>
  );
}
