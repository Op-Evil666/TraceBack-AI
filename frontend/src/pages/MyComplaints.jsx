
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipboardList, Plus, RefreshCw } from "lucide-react";

import { getMyComplaints } from "../services/complaintService";
import ItemSection from "../components/dashboard/ItemSection";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 1,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchComplaints = useCallback(async (page = 1) => {
    try {
      const data = await getMyComplaints({
        page,
        limit: 8,
      });

      setComplaints(data.complaints || []);

      setPagination({
        page: data.pagination?.currentPage ?? page,
        limit: data.pagination?.limit ?? 8,
        total: data.pagination?.totalComplaints ?? 0,
        totalPages: data.pagination?.totalPages ?? 1,
      });

      setError("");
    } catch (err) {
      console.error("Failed to fetch complaints:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load your complaints. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    let ignore = false;

    getMyComplaints({ page: 1, limit: 8 })
      .then((data) => {
        if (ignore) return;

        setComplaints(data.complaints || []);

        setPagination({
          page: data.pagination?.currentPage ?? 1,
          limit: data.pagination?.limit ?? 8,
          total: data.pagination?.totalComplaints ?? 0,
          totalPages: data.pagination?.totalPages ?? 1,
        });
      })
      .catch((err) => {
        if (ignore) return;

        console.error("Failed to fetch complaints:", err);

        setError(
          err.response?.data?.message ||
          "Unable to load your complaints. Please try again."
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
    fetchComplaints(page);
  };

  const handleRetry = () => {
    setLoading(true);
    setError("");
    fetchComplaints(pagination.page);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">

          <div>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl">
                <ClipboardList size={26} />
              </div>

              <h1 className="text-3xl font-bold text-slate-900">
                My Lost Complaints
              </h1>
            </div>

            <p className="text-slate-500 mt-3">
              View and track the items you have reported as lost.
            </p>
          </div>

          <Link
            to="/submit-complaint"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            <Plus size={19} />
            Submit Complaint
          </Link>

        </div>

        {/* Complaint count */}
        {!loading && !error && (
          <div className="mb-6">
            <p className="text-sm text-slate-500">
              Showing {complaints.length} of {pagination.total} complaints
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />

            <p className="text-slate-500 mt-4">
              Loading your complaints...
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
              onClick={handleRetry}
              className="inline-flex items-center gap-2 mt-5 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition"
            >
              <RefreshCw size={17} />
              Try Again
            </button>
          </div>
        )}

        {/* Complaints */}
        {!loading && !error && (
          <>
            {complaints.length > 0 ? (
              <ItemSection
                title="Your Complaints"
                description="All the lost items you have submitted."
                items={complaints}
                type="lost"
              />
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl py-20 px-6 text-center">
                <div className="bg-indigo-50 text-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                  <ClipboardList size={30} />
                </div>

                <h2 className="text-xl font-bold text-slate-900 mt-5">
                  No complaints yet
                </h2>

                <p className="text-slate-500 mt-2 max-w-md mx-auto">
                  You haven't submitted any lost-item complaints yet.
                  Submit your first complaint to start looking for
                  your missing belongings.
                </p>

                <Link
                  to="/submit-complaint"
                  className="inline-flex items-center gap-2 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  <Plus size={18} />
                  Submit Your First Complaint
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

export default MyComplaints;
