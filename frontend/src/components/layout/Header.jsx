import { BrainCircuit } from "lucide-react";

function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-14 md:py-20">

        <div className="flex items-center gap-2 text-blue-400 mb-5">
          <BrainCircuit size={20} />
          <span className="text-sm font-semibold tracking-widest uppercase">
            AI-Powered Lost & Found
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Lost something?
          <span className="block text-blue-400">
            Let's find it.
          </span>
        </h1>

        <p className="mt-5 text-slate-300 max-w-xl leading-relaxed">
          Discover lost and found items, report belongings,
          and let intelligent matching help reconnect
          people with what matters.
        </p>

      </div>
    </header>
  );
}

export default Header;
