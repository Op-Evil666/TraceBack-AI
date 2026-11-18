import { Link } from "react-router-dom";
import {
  Search,
  BrainCircuit,
  ShieldCheck,
  Bell,
  ArrowRight,
  PackageSearch,
  Users,
  Sparkles,
} from "lucide-react";

function About() {
  const features = [
    {
      icon: BrainCircuit,
      title: "AI-Powered Matching",
      description:
        "Our AI service analyzes lost and found item reports to identify potential matches using descriptions and image similarity.",
    },
    {
      icon: Search,
      title: "Smart Search",
      description:
        "Find relevant lost and found reports without relying entirely on exact keyword matches.",
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description:
        "Receive notifications when our system identifies a potential match for your lost or found item.",
    },
    {
      icon: ShieldCheck,
      title: "Structured Verification",
      description:
        "Potential matches can be reviewed and verified through the platform's resolution workflow.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Submit a Report",
      description:
        "Lost something? Submit a complaint with its description, category, location and date. Found something? Create a report.",
    },
    {
      number: "02",
      title: "AI Finds Potential Matches",
      description:
        "The AI service analyzes available reports and ranks potentially matching lost and found items.",
    },
    {
      number: "03",
      title: "Get Notified",
      description:
        "When a potential match is identified, the relevant user receives an in-app notification.",
    },
    {
      number: "04",
      title: "Verify and Resolve",
      description:
        "The potential match can be reviewed and verified before the case is marked as resolved.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-7">
            <Sparkles size={16} />
            Intelligent Lost and Found Platform
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl mx-auto">
            Lost Something?
            <br />
            <span className="text-blue-200">
              Let AI Help You Find It.
            </span>
          </h1>

          <p className="mt-7 text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            TraceBack AI simplifies the lost-and-found process by
            connecting lost item complaints with found item reports
            through intelligent matching and notifications.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              to="/submit-complaint"
              className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 px-7 py-3.5 rounded-xl font-bold transition"
            >
              Report a Lost Item
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/create-report"
              className="inline-flex items-center gap-2 bg-blue-500/30 hover:bg-blue-500/50 border border-white/30 px-7 py-3.5 rounded-xl font-bold transition"
            >
              Report a Found Item
            </Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">
              Our Mission
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 leading-tight">
              Making lost-and-found management smarter and simpler.
            </h2>

            <p className="text-slate-600 mt-6 leading-relaxed">
              Traditional lost-and-found systems often depend on
              manually searching through reports and hoping that
              descriptions match. This can make finding a lost
              possession unnecessarily difficult.
            </p>

            <p className="text-slate-600 mt-4 leading-relaxed">
              TraceBack AI aims to improve this experience by bringing
              lost and found reports together and using AI-powered
              analysis to identify potential matches.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-blue-50 rounded-2xl p-6">
                <PackageSearch className="text-blue-600" size={32} />
                <h3 className="font-bold text-slate-900 mt-4">
                  Lost Items
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  Report belongings that have gone missing.
                </p>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-6">
                <Search className="text-indigo-600" size={32} />
                <h3 className="font-bold text-slate-900 mt-4">
                  Found Items
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  Report belongings you have discovered.
                </p>
              </div>

              <div className="col-span-2 bg-slate-50 rounded-2xl p-6 flex items-center gap-5">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <BrainCircuit className="text-blue-600" size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">
                    Intelligent Matching
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Connect potentially related reports through AI analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">
              Platform Features
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
              What makes TraceBack AI different?
            </h2>

            <p className="text-slate-600 mt-4">
              A more organized approach to discovering and recovering
              lost belongings.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition duration-300"
                >
                  <div className="bg-blue-50 text-blue-600 w-14 h-14 rounded-xl flex items-center justify-center">
                    <Icon size={27} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-6">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mt-3">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">
            The Process
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">
            How TraceBack AI works
          </h2>

          <p className="text-slate-600 mt-4">
            Four simple steps from reporting an item to resolving a case.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-white border border-slate-200 rounded-2xl p-7"
            >
              <span className="text-4xl font-extrabold text-blue-100">
                {step.number}
              </span>

              <h3 className="text-lg font-bold text-slate-900 mt-5">
                {step.title}
              </h3>

              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Users className="text-blue-400 mx-auto" size={42} />

          <h2 className="text-3xl md:text-4xl font-bold text-white mt-6">
            Every lost item deserves a chance to be found.
          </h2>

          <p className="text-slate-300 mt-5 leading-relaxed">
            Join TraceBack AI and help make the process of reporting
            and recovering lost belongings more efficient.
          </p>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 mt-9 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  );
}

export default About;