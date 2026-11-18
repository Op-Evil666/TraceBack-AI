import { MapPin, CalendarDays, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function ItemCard({ item, type }) {
  const isLost = type === "lost";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300">

      {/* Item Image */}
      <div className="h-48 bg-slate-100 overflow-hidden">
        {item.images?.[0]?.url ? (
          <img
            src={item.images[0].url}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            No image available
          </div>
        )}
      </div>

      {/* Item Details */}
      <div className="p-5">

        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
            {item.title}
          </h3>

          <span
            className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${
              isLost
                ? "bg-orange-100 text-orange-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {isLost ? "Lost" : "Found"}
          </span>
        </div>

        <p className="text-sm text-slate-500 mt-3 line-clamp-2">
          {item.description}
        </p>

        <div className="mt-5 space-y-3 text-sm text-slate-500">

          <div className="flex items-center gap-2">
            <MapPin size={17} className="text-blue-600 shrink-0" />
            <span className="line-clamp-1">{item.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={17} className="text-blue-600 shrink-0" />
            <span>
              {new Date(
                isLost ? item.lostDate : item.dateFound
              ).toLocaleDateString()}
            </span>
          </div>

        </div>

        <div className="border-t border-slate-100 mt-5 pt-4 flex items-center justify-between">

          <span className={`text-xs font-semibold ${
            item.status === "resolved"
              ? "text-green-600"
              : item.status === "in_progress"
              ? "text-blue-600"
              : "text-amber-600"
          }`}>
            {item.status?.replace("_", " ").toUpperCase()}
          </span>

          <Link
  to={`/${isLost ? "complaints" : "reports"}/${item._id}`}
  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition"
>
  View Details
  <ArrowRight size={16} />
</Link>

        </div>

      </div>
    </div>
  );
}

export default ItemCard;
