type NoItemsProps = {
  title?: string;
  description?: string;
};
export default function NoItems({ title, description }: NoItemsProps) {
  return (
    <div className="text-center bg-gray-100 rounded-lg p-5">
      <h2 className="text-lg">{title}</h2>
      <p className="font-light">{description}</p>
    </div>
  );
}
