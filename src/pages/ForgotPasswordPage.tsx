import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      {sent ? (
        <div className="flex flex-col items-center">
          <CheckCircle size={48} className="text-[hsl(var(--success))] mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Check your email</h2>
          <p className="text-sm text-muted-foreground mb-1">
            We sent a password reset link to:
          </p>
          <p className="text-sm font-medium text-foreground mb-6">{email}</p>
          <Link
            to="/login"
            className="text-sm text-primary font-medium hover:underline"
          >
            Back to login
          </Link>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-foreground">Reset your password</h2>
          <p className="text-sm text-muted-foreground mt-1 mb-8">
            Enter your email and we'll send you a reset link
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                placeholder="you@agency.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive mt-4">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full h-10 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Sending…" : "Send reset link"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </>
      )}
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
