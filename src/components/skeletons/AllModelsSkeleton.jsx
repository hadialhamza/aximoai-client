import ModelCardSkeleton from "./ModelCardSkeleton";

const AllModelsSkeleton = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <ModelCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default AllModelsSkeleton;
