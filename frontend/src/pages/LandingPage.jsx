import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { useAuth } from "../context/useAuth";

function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  const handleEnter = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -top-40 -left-40" />
      <div className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -bottom-40 -right-40" />

      <div className="relative z-10 max-w-2xl w-full text-center">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="bg-blue-600 p-5 rounded-2xl shadow-xl shadow-blue-600/20">
            <Search size={38} className="text-white" />
          </div>
        </div>

        {/* Branding */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          TraceBack <span className="text-blue-500">AI</span>
        </h1>

        <p className="mt-4 text-blue-300 font-medium tracking-widest uppercase text-sm">
          Intelligent Lost Item Retrieval Platform
        </p>

        {/* Introduction */}
        <div className="mt-12 space-y-5">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Lost something?
            <span className="block text-blue-400 mt-2">
              Let's find it.
            </span>
          </h2>

          <p className="text-slate-400 text-lg leading-relaxed max-w-lg mx-auto">
            Reconnect lost belongings with their owners through
            intelligent matching. Every lost item deserves
            a chance to find its way home.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={handleEnter}
          disabled={loading}
          className="mt-12 inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-9 py-4 rounded-xl font-semibold text-lg shadow-xl shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1"
        >
          {loading ? "Loading..." : "Enter TraceBack AI"}
          <ArrowRight size={21} />
        </button>

        <p className="mt-8 text-sm text-slate-500">
          Helping lost belongings find their way home.
        </p>

      </div>
    </main>
  );
}

export default LandingPage;
