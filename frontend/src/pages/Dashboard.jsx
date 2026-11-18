
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/layout/Navbar";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ItemSection from "../components/dashboard/ItemSection";

import { getReports } from "../services/reportService";
import { getComplaints } from "../services/complaintService";

function Dashboard() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError("");

        const [complaintData, reportData] = await Promise.all([
          getComplaints(),
          getReports(),
        ]);

        setLostItems(complaintData.complaints || []);
        setFoundItems(reportData.reports || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);

        const message =
          err.response?.data?.message ||
          "Unable to load items. Please try again.";

        setError(message);
        toast.error("Failed to load dashboard items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />

            <p className="mt-5 text-slate-500 font-medium">
              Loading lost and found items...
            </p>
          </div>
        ) : error ? (
          <div className="py-20 text-center">
            <p className="text-red-600 font-medium">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-blue-600 hover:underline font-semibold"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <ItemSection
              title="Lost Item Reports"
              description="Items people are currently searching for."
              items={lostItems}
              type="lost"
              viewAllLink="/browse-lost"
            />

            <div className="border-t border-slate-200 my-4" />

            <ItemSection
              title="Found Item Reports"
              description="Items reported as found by our community."
              items={foundItems}
              type="found"
              viewAllLink="/browse-found"
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
