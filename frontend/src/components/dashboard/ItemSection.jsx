import { Link } from "react-router-dom";
import { ArrowRight, PackageSearch } from "lucide-react";
import ItemCard from "./ItemCard";

function ItemSection({ title, description, items, type, viewAllLink }) {
  return (
    <section className="py-10">

      {/* Section heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">

        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <PackageSearch size={20} />
            <span className="text-sm font-semibold uppercase tracking-wider">
              {type === "lost" ? "Lost belongings" : "Found belongings"}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="text-slate-500 mt-2 text-sm">
            {description}
          </p>
        </div>

        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition"
          >
            View All
            <ArrowRight size={17} />
          </Link>
        )}

      </div>

      {/* Items grid */}
      {items?.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              type={type}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl py-14 text-center">
          <PackageSearch size={36} className="mx-auto text-slate-300" />

          <p className="mt-4 text-slate-600 font-semibold">
            No {type === "lost" ? "lost" : "found"} items available.
          </p>

          <p className="text-sm text-slate-400 mt-1">
            Check back later for new listings.
          </p>
        </div>
      )}

    </section>
  );
}

export default ItemSection;
