
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  Tag,
  Pencil,
  Trash2,
  Save,
  X,
  LoaderCircle,
  CheckCircle,
  Image as ImageIcon,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import DeleteConfirmationModal from "../components/common/deleteConfirmationModal";

import { useAuth } from "../context/useAuth";
import {
  getReportById,
  updateReport,
  deleteReport,
} from "../services/reportService";

function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [resolving, setResolving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    dateFound: "",
  });

  const fetchReport = useCallback(async () => {
    try {
      const data = await getReportById(id);
      const item = data.report;

      setReport(item);

      setFormData({
        title: item.title || "",
        description: item.description || "",
        category: item.category || "",
        location: item.location || "",
        dateFound: item.dateFound
          ? new Date(item.dateFound).toISOString().split("T")[0]
          : "",
      });

      setError("");
    } catch (err) {
      console.error("Failed to fetch report:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load this report. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
  let ignore = false;

  const loadReport = async () => {
    try {
      const data = await getReportById(id);

      if (ignore) return;

      const item = data.report;

      setReport(item);

      setFormData({
        title: item.title || "",
        description: item.description || "",
        category: item.category || "",
        location: item.location || "",
        dateFound: item.dateFound
          ? new Date(item.dateFound).toISOString().split("T")[0]
          : "",
      });

      setError("");
    } catch (err) {
      if (ignore) return;

      console.error("Failed to fetch report:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load this report. Please try again."
      );
    } finally {
      if (!ignore) {
        setLoading(false);
      }
    }
  };

  loadReport();

  return () => {
    ignore = true;
  };
}, [id]);

  const ownerId =
    report?.owner?._id ||
    report?.owner;

  const currentUserId =
    user?.userId ||
    user?._id ||
    user?.id;

  const isOwner =
    ownerId && currentUserId &&
    String(ownerId) === String(currentUserId);

  const isAdmin = user?.role === "admin";

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancelEdit = () => {
    setFormData({
      title: report.title || "",
      description: report.description || "",
      category: report.category || "",
      location: report.location || "",
      dateFound: report.dateFound
        ? new Date(report.dateFound).toISOString().split("T")[0]
        : "",
    });

    setEditing(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const data = await updateReport(id, formData);

      if (data.report) {
        setReport(data.report);
      } else {
        await fetchReport();
      }

      setEditing(false);
      toast.success("Report updated successfully.");
    } catch (err) {
      console.error("Report update failed:", err);

      toast.error(
        err.response?.data?.message ||
          "Unable to update the report."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);

      await deleteReport(id);

      toast.success("Report deleted successfully.");
      navigate("/browse-found", { replace: true });
    } catch (err) {
      console.error("Report deletion failed:", err);

      toast.error(
        err.response?.data?.message ||
          "Unable to delete the report."
      );

      setDeleting(false);
    }
  };

  const handleResolve = async () => {
    try {
      setResolving(true);

      const data = await updateReport(id, {
        status: "resolved",
      });

      if (data.report) {
        setReport(data.report);
      } else {
        await fetchReport();
      }

      toast.success("Report marked as resolved.");
    } catch (err) {
      console.error("Status update failed:", err);

      toast.error(
        err.response?.data?.message ||
          "Unable to update report status."
      );
    } finally {
      setResolving(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not provided";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const statusStyles = {
    pending: "bg-amber-100 text-amber-700",
    in_progress: "bg-blue-100 text-blue-700",
    resolved: "bg-green-100 text-green-700",
  };

  const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status.replace("_", " ").replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <LoaderCircle className="h-10 w-10 animate-spin text-blue-600 mx-auto" />
            <p className="mt-4 text-slate-500">
              Loading report details...
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-800">
            Report unavailable
          </h2>

          <p className="mt-3 text-slate-500">
            {error || "This report could not be found."}
          </p>

          <button
            onClick={() => navigate("/browse-found")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <ArrowLeft size={18} />
            Back to found items
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const imageUrl = report.images?.[0]?.url;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
        <button
          onClick={() => navigate("/browse-found")}
          className="mb-6 inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium"
        >
          <ArrowLeft size={18} />
          Back to found items
        </button>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="relative h-64 sm:h-80 bg-slate-100 flex items-center justify-center">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={report.title}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="text-center text-slate-400">
                <ImageIcon size={48} className="mx-auto" />
                <p className="mt-2 text-sm">No image available</p>
              </div>
            )}

            <span
              className={`absolute top-5 right-5 rounded-full px-4 py-2 text-sm font-semibold ${
                statusStyles[report.status] ||
                "bg-slate-100 text-slate-600"
              }`}
            >
              {formatStatus(report.status)}
            </span>
          </div>

          <div className="p-6 sm:p-8">
            {!editing ? (
              <>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                      Found item report
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-slate-900">
                      {report.title}
                    </h1>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {isOwner && (
                      <>
                        <button
                          onClick={() => setEditing(true)}
                          className="inline-flex items-center gap-2 rounded-xl border border-blue-200 px-4 py-2.5 font-semibold text-blue-700 hover:bg-blue-50"
                        >
                          <Pencil size={17} />
                          Edit
                        </button>

                        <button
                          onClick={() => setShowDeleteModal(true)}
                          className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 font-semibold text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={17} />
                          Delete
                        </button>
                      </>
                    )}

                    {isAdmin && report.status === "in_progress" && (
                      <button
                        onClick={handleResolve}
                        disabled={resolving}
                        className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                      >
                        {resolving ? (
                          <LoaderCircle size={17} className="animate-spin" />
                        ) : (
                          <CheckCircle size={17} />
                        )}
                        Mark Resolved
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-lg font-bold text-slate-800">
                    Description
                  </h2>

                  <p className="mt-2 whitespace-pre-wrap leading-relaxed text-slate-600">
                    {report.description || "No description provided."}
                  </p>
                </div>

                <div className="mt-8 grid gap-6 border-t border-slate-100 pt-6 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <Tag className="mt-1 text-blue-600" size={20} />
                    <div>
                      <p className="text-sm text-slate-500">Category</p>
                      <p className="mt-1 font-semibold text-slate-800">
                        {report.category || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 text-blue-600" size={20} />
                    <div>
                      <p className="text-sm text-slate-500">Found location</p>
                      <p className="mt-1 font-semibold text-slate-800">
                        {report.location || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-1 text-blue-600" size={20} />
                    <div>
                      <p className="text-sm text-slate-500">Date found</p>
                      <p className="mt-1 font-semibold text-slate-800">
                        {formatDate(report.dateFound)}
                      </p>
                    </div>
                  </div>
                </div>

                {report.owner?.name && (
                  <div className="mt-8 border-t border-slate-100 pt-6">
                    <p className="text-sm text-slate-500">Reported by</p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {report.owner.name}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <form onSubmit={handleUpdate}>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Edit Report
                  </h2>

                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                    aria-label="Cancel editing"
                  >
                    <X size={21} />
                  </button>
                </div>

                <div className="mt-6 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Title
                    </label>
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={5}
                      required
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Category
                      </label>
                      <input
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Date Found
                      </label>
                      <input
                        type="date"
                        name="dateFound"
                        value={formData.dateFound}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Location
                    </label>
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={saving}
                    className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                  >
                    {saving ? (
                      <LoaderCircle size={18} className="animate-spin" />
                    ) : (
                      <Save size={18} />
                    )}
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        title="Delete this report?"
        message="This report will be permanently deleted. This action cannot be undone."
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}

export default ReportDetails;
