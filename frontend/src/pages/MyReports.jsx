
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilePlus, Plus, RefreshCw } from "lucide-react";

import { getMyReports } from "../services/reportService";
import ItemSection from "../components/dashboard/ItemSection";

function MyReports() {
  const [reports, setReports] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 1,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReports = useCallback(async (page = 1) => {
  try {
    const data = await getMyReports({
      page,
      limit: 8,
    });

    setReports(data.reports || []);

    setPagination({
  page: data.pagination?.currentPage ?? 1,
  limit: data.pagination?.limit ?? 8,
  total: data.pagination?.totalReports ?? 0,
  totalPages: data.pagination?.totalPages ?? 1,
});

    setError("");
  } catch (err) {
    console.error("Failed to fetch reports:", err);

    setError(
      err.response?.data?.message ||
      "Unable to load your reports. Please try again."
    );
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
  let ignore = false;

  getMyReports({ page: 1, limit: 8 })
    .then((data) => {
      if (ignore) return;

      setReports(data.reports || []);

      setPagination({
  page: data.pagination?.currentPage ?? 1,
  limit: data.pagination?.limit ?? 8,
  total: data.pagination?.totalReports ?? 0,
  totalPages: data.pagination?.totalPages ?? 1,
});
    })
    .catch((err) => {
      if (ignore) return;

      console.error("Failed to fetch reports:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load your reports. Please try again."
      );
    })
    .finally(() => {
      if (!ignore) setLoading(false);
    });

  return () => {
    ignore = true;
  };
}, []);

  const handlePageChange = (page) => {
  setLoading(true);
  setError("");
  fetchReports(page);
};

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">

          <div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                <FilePlus size={26} />
              </div>

              <h1 className="text-3xl font-bold text-slate-900">
                My Found Reports
              </h1>
            </div>

            <p className="text-slate-500 mt-3">
              View and manage the items you have reported as found.
            </p>
          </div>

          <Link
            to="/create-report"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            <Plus size={19} />
            Create Report
          </Link>

        </div>

        {/* Report count */}
        {!loading && !error && (
          <div className="mb-6">
            <p className="text-sm text-slate-500">
              Showing {reports.length} of {pagination.total} reports
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-slate-500 mt-4">
              Loading your reports...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-white border border-red-200 rounded-2xl p-8 text-center">
            <p className="text-red-600 font-medium">
              {error}
            </p>

            <button
  onClick={() => {
    setLoading(true);
    setError("");
    fetchReports(pagination.page);
  }}
  className="inline-flex items-center gap-2 mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition"
>
              <RefreshCw size={17} />
              Try Again
            </button>
          </div>
        )}

        {/* Reports */}
        {!loading && !error && (
          <>
            {reports.length > 0 ? (
              <ItemSection
                title="Your Reports"
                description="All the found items you have submitted."
                items={reports}
                type="found"
              />
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl py-20 px-6 text-center">
                <div className="bg-blue-50 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                  <FilePlus size={30} />
                </div>

                <h2 className="text-xl font-bold text-slate-900 mt-5">
                  No reports yet
                </h2>

                <p className="text-slate-500 mt-2 max-w-md mx-auto">
                  You haven't reported any found items yet.
                  Create your first report to help someone recover
                  their lost belongings.
                </p>

                <Link
                  to="/create-report"
                  className="inline-flex items-center gap-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  <Plus size={18} />
                  Create Your First Report
                </Link>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">

                <button
                  disabled={pagination.page <= 1}
                  onClick={() => handlePageChange(pagination.page - 1)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>

                <span className="text-sm font-medium text-slate-600">
                  Page {pagination.page} of {pagination.totalPages}
                </span>

                <button
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => handlePageChange(pagination.page + 1)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>

              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default MyReports;
