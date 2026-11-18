import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ShieldCheck, ArrowLeft, LoaderCircle } from "lucide-react";

import { verifyUser } from "../../services/authService";

function VerifyOTP() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    if (!id) {
      toast.error("Invalid verification link.");
      return;
    }

    try {
      setLoading(true);

      const data = await verifyUser(id, otp);

      toast.success(data.message || "Account verified successfully!");

      navigate("/login", { replace: true });
    } catch (err) {
      console.error("OTP verification failed:", err);

      toast.error(
        err.response?.data?.message ||
          "Unable to verify OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
            <ShieldCheck className="h-9 w-9 text-blue-600" />
          </div>

          <div className="mt-6 text-center">
            <h1 className="text-2xl font-bold text-slate-900">
              Verify Your Account
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              We've sent a 6-digit verification code to your
              registered email address. Enter the code below
              to activate your TraceBack AI account.
            </p>
          </div>

          <form onSubmit={handleVerify} className="mt-8">
            <label
              htmlFor="otp"
              className="block text-sm font-semibold text-slate-700"
            >
              Verification Code
            </label>

            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              value={otp}
              onChange={handleOtpChange}
              placeholder="000000"
              required
              autoFocus
              className="mt-3 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-4 text-center text-3xl font-bold tracking-[0.45em] text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />

            <p className="mt-3 text-center text-xs text-slate-400">
              Enter the six digits from your verification email.
            </p>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <LoaderCircle
                    size={19}
                    className="animate-spin"
                  />
                  Verifying...
                </>
              ) : (
                <>
                  <ShieldCheck size={19} />
                  Verify Account
                </>
              )}
            </button>
          </form>

          <div className="mt-7 border-t border-slate-100 pt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          TraceBack AI · Secure Account Verification
        </p>
      </div>
    </div>
  );
}

export default VerifyOTP;
