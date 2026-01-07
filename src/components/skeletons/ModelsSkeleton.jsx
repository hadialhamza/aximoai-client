import ModelCardSkeleton from "./ModelCardSkeleton";

const ModelsSkeleton = () => {
  return (
    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <ModelCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default ModelsSkeleton;
