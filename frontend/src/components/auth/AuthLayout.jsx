import { Link } from "react-router-dom";
import { ShieldCheck, Search, PackageSearch } from "lucide-react";

function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">

      {/* Left branding section */}
      <div className="hidden lg:flex flex-col justify-between bg-slate-950 text-white p-12">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl">
            <PackageSearch size={28} />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            TraceBack<span className="text-blue-400"> AI</span>
          </span>
        </Link>

        <div className="max-w-lg">
          <div className="mb-8 flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-400/20">
            <Search size={42} className="text-blue-400" />
          </div>

          <h1 className="text-5xl font-bold leading-tight text-white">
  Lost something?
  <br />
  <span className="text-blue-400">
    Let's find it.
  </span>
</h1>

          <p className="mt-6 text-slate-400 text-lg leading-relaxed">
            A smarter way to reconnect people with their lost belongings.
            Report, discover and find what matters.
          </p>

          <div className="mt-10 flex items-center gap-3 text-sm text-slate-400">
            <ShieldCheck size={20} className="text-blue-400" />
            Smart matching. Safer recovery.
          </div>
        </div>

        <p className="text-sm text-slate-500">
          © 2026 TraceBack AI. All rights reserved.
        </p>
      </div>

      {/* Right form section */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">

          <div className="lg:hidden mb-10">
            <Link to="/" className="text-2xl font-bold text-slate-900">
              TraceBack <span className="text-blue-600">AI</span>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              {title}
            </h2>
            <p className="mt-2 text-slate-500">
              {subtitle}
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;