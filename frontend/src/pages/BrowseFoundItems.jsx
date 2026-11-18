
import { useCallback, useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ItemSection from "../components/dashboard/ItemSection";

import { getReports } from "../services/reportService";

function BrowseFoundItems() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 1,
  });

  const fetchReports = useCallback(async (page = 1) => {
    try {
      const data = await getReports({ page, limit: 8 });

      setReports(data.reports || []);

      setPagination({
        page,
        limit: 8,
        total: data.totalReports ?? 0,
        totalPages: data.totalPages ?? 1,
      });

      setError("");
    } catch (err) {
      console.error("Failed to fetch found items:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load found items. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    getReports({ page: 1, limit: 8 })
      .then((data) => {
        if (ignore) return;

        setReports(data.reports || []);

        setPagination({
          page: 1,
          limit: 8,
          total: data.totalReports ?? 0,
          totalPages: data.totalPages ?? 1,
        });
      })
      .catch((err) => {
        if (ignore) return;

        console.error("Failed to fetch found items:", err);

        setError(
          err.response?.data?.message ||
          "Unable to load found items. Please try again."
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

  const handleRetry = () => {
    setLoading(true);
    setError("");
    fetchReports(pagination.page);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-5 text-slate-500 font-medium">
              Loading found items...
            </p>
          </div>
        ) : error ? (
          <div className="py-20 text-center">
            <p className="text-red-600 font-medium">{error}</p>
            <button
              onClick={handleRetry}
              className="mt-4 text-blue-600 hover:underline font-semibold"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <ItemSection
              title="Found Item Reports"
              description="Browse items that people in the community have found."
              items={reports}
              type="found"
            />

            {reports.length > 0 && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  disabled={pagination.page <= 1}
                  onClick={() => handlePageChange(pagination.page - 1)}
                  className="px-4 py-2 rounded-lg border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
                >
                  Previous
                </button>

                <span className="text-sm text-slate-600">
                  Page {pagination.page} of {pagination.totalPages}
                </span>

                <button
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => handlePageChange(pagination.page + 1)}
                  className="px-4 py-2 rounded-lg border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
                >
                  Next
                </button>
              </div>
            )}

            {reports.length > 0 && (
              <p className="text-center text-sm text-slate-500 mt-4">
                Showing {reports.length} of {pagination.total} found items
              </p>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default BrowseFoundItems;
