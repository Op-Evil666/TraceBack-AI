
import { Link } from "react-router-dom";
import {
  UserRound,
  Mail,
  ShieldCheck,
  CalendarDays,
  FilePlus,
  ClipboardList,
  ArrowRight,
  BadgeCheck,
  Clock,
} from "lucide-react";

import { useAuth } from "../context/useAuth";

function Profile() {
  const { user } = useAuth();

  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";
  const isVerified = user?.isVerified;

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Not available";

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            My Profile
          </h1>
          <p className="text-slate-500 mt-2">
            Manage your account and view your TraceBack AI activity.
          </p>
        </div>

        {/* Profile card */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">

          {/* Banner */}
          <div className="h-36 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600" />

          <div className="px-8 pb-8">

            {/* Avatar overlaps banner; details stay below it */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 -mt-12">

              <div className="w-24 h-24 shrink-0 rounded-2xl bg-white p-1 shadow-md">
                <div className="w-full h-full rounded-xl bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
                  {initial}
                </div>
              </div>

              <div className="flex-1 min-w-0 pt-12 sm:pt-12">
                <h2 className="text-2xl font-bold text-slate-900 break-words">
                  {user?.name || "User"}
                </h2>

                <p className="text-slate-500 mt-1 break-all">
                  {user?.email || "No email available"}
                </p>
              </div>

              <div className="sm:pt-12">
                {isVerified ? (
                  <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
                    <BadgeCheck size={17} />
                    Verified Account
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
                    <Clock size={17} />
                    Not Verified
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-slate-100 my-8" />

            {/* Account information */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-5">
                Account Information
              </h3>

              <div className="grid sm:grid-cols-2 gap-5">

                {/* Full name */}
                <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-5">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-xl shrink-0">
                    <UserRound size={21} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">
                      Full Name
                    </p>
                    <p className="font-semibold text-slate-900 mt-1 break-words">
                      {user?.name || "Not available"}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-5">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-xl shrink-0">
                    <Mail size={21} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">
                      Email Address
                    </p>
                    <p className="font-semibold text-slate-900 mt-1 break-all">
                      {user?.email || "Not available"}
                    </p>
                  </div>
                </div>

                {/* Account status */}
                <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-5">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-xl shrink-0">
                    <ShieldCheck size={21} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Account Status
                    </p>
                    <p className="font-semibold text-slate-900 mt-1">
                      {isVerified ? "Verified" : "Unverified"}
                    </p>
                  </div>
                </div>

                {/* Member since */}
                <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-5">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-xl shrink-0">
                    <CalendarDays size={21} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Member Since
                    </p>
                    <p className="font-semibold text-slate-900 mt-1">
                      {memberSince}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Activity shortcuts */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-slate-900 mb-5">
            Your Activity
          </h3>

          <div className="grid sm:grid-cols-2 gap-6">

            {/* My reports */}
            <Link
              to="/my-reports"
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-200 transition"
            >
              <div className="flex items-center justify-between">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                  <FilePlus size={25} />
                </div>

                <ArrowRight
                  className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition"
                  size={21}
                />
              </div>

              <h4 className="text-lg font-bold text-slate-900 mt-5">
                My Found Reports
              </h4>

              <p className="text-sm text-slate-500 mt-2">
                View and manage the items you have reported as found.
              </p>
            </Link>

            {/* My complaints */}
            <Link
              to="/my-complaints"
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-indigo-200 transition"
            >
              <div className="flex items-center justify-between">
                <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl">
                  <ClipboardList size={25} />
                </div>

                <ArrowRight
                  className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition"
                  size={21}
                />
              </div>

              <h4 className="text-lg font-bold text-slate-900 mt-5">
                My Lost Complaints
              </h4>

              <p className="text-sm text-slate-500 mt-2">
                View and track the complaints you have submitted.
              </p>
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;
