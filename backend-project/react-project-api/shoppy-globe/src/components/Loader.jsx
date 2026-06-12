import SkeletonCard from "./SkeletonCard";

export default function Loader() {
  return (
    <div className="products-grid">
      {[...Array(8)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}