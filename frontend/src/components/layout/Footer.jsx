import { Search } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row justify-between gap-8">

          {/* Branding */}
          <div className="max-w-sm">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Search size={20} />
              </div>

              <span className="text-xl font-bold text-white">
                TraceBack <span className="text-blue-500">AI</span>
              </span>
            </Link>

            <p className="mt-4 text-sm leading-relaxed">
              An intelligent lost and found platform helping
              reconnect people with their missing belongings.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link to="/dashboard" className="hover:text-blue-400 transition">
                Dashboard
              </Link>

              <Link to="/create-report" className="hover:text-blue-400 transition">
                Create Report
              </Link>

              <Link to="/submit-complaint" className="hover:text-blue-400 transition">
                Submit Complaint
              </Link>

              <Link to="/notifications" className="hover:text-blue-400 transition">
                Notifications
              </Link>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm">
          © {new Date().getFullYear()} TraceBack AI. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;
