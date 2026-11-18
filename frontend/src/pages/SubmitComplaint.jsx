
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FilePlus,
  ImagePlus,
  X,
  LoaderCircle,
  ArrowLeft,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { createComplaint } from "../services/complaintService";

function SubmitComplaint() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    lostDate: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files?.[0];

    if (!selectedImage) return;

    if (!selectedImage.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      event.target.value = "";
      return;
    }

    setImage(selectedImage);
    setPreview(URL.createObjectURL(selectedImage));
  };

  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      formData.title.trim().length < 3 ||
      formData.title.trim().length > 150
    ) {
      toast.error("Title must contain 3–150 characters.");
      return;
    }

    if (
      formData.description.trim().length < 10 ||
      formData.description.trim().length > 2000
    ) {
      toast.error("Description must contain 10–2000 characters.");
      return;
    }

    if (
      formData.category.trim().length < 2 ||
      formData.category.trim().length > 150
    ) {
      toast.error("Please enter a valid category.");
      return;
    }

    if (
      formData.location.trim().length < 3 ||
      formData.location.trim().length > 200
    ) {
      toast.error("Please enter a valid location.");
      return;
    }

    if (!formData.lostDate) {
      toast.error("Please select the date lost.");
      return;
    }

    if (new Date(formData.lostDate) > new Date()) {
      toast.error("Lost date cannot be in the future.");
      return;
    }

    try {
      setLoading(true);

      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        payload.append(
          key,
          key === "lostDost"
            ? new Date(value).toISOString()
            : value.trim()
        );
      });

      if (image) {
  payload.append("image", image);
}

      await createComplaint(payload);

      toast.success("Lost item complaint submitted successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.error("Submit complaint error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to submit complaint. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-10">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back to dashboard
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <FilePlus size={25} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Submit Lost Item Complaint
              </h1>

              <p className="text-slate-500 mt-1">
                Tell us about your missing belongings so we can help find them.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 space-y-6"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Item title *
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength={150}
              required
              placeholder="e.g. Black leather wallet"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-xs text-slate-400 text-right mt-1">
              {formData.title.length}/150
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description *
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              maxLength={2000}
              required
              rows={5}
              placeholder="Describe the item, its appearance, identifying marks, etc."
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none resize-y focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-xs text-slate-400 text-right mt-1">
              {formData.description.length}/2000
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Category *
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              maxLength={150}
              required
              placeholder="e.g. Electronics, Accessories, Documents"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Location where lost *
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              maxLength={200}
              required
              placeholder="e.g. Library, Block A, Hyderabad"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date lost */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Lost Date *
            </label>

            <input
              type="date"
              name="lostDate"
              value={formData.lostDate}
              onChange={handleChange}
              max={new Date().toLocaleDateString("en-CA")}
              required
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Item image
            </label>

            {preview ? (
              <div className="relative border border-slate-200 rounded-xl overflow-hidden">
                <img
                  src={preview}
                  alt="Selected lost item"
                  className="w-full h-64 object-contain bg-slate-100"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-red-50 text-red-500"
                  aria-label="Remove image"
                >
                  <X size={19} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-10 cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 transition">
                <ImagePlus
                  size={36}
                  className="text-slate-400 mb-3"
                />

                <span className="text-sm font-semibold text-slate-700">
                  Click to upload an image
                </span>

                <span className="text-xs text-slate-400 mt-2">
                  Select one image of your lost item
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <LoaderCircle size={19} className="animate-spin" />
                Submitting complaint...
              </>
            ) : (
              "Submit Lost Item Complaint"
            )}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default SubmitComplaint;
