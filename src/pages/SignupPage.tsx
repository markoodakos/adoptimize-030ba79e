import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { supabase } from "@/integrations/supabase/client";

const getStrength = (pwd: string) => {
  if (pwd.length === 0) return 0;
  if (pwd.length < 6) return 1;
  if (pwd.length < 8 || !/[0-9]/.test(pwd)) return 2;
  if (!/[^a-zA-Z0-9]/.test(pwd)) return 3;
  return 4;
};

const strengthLabels: Record<number, { text: string; className: string }> = {
  0: { text: "", className: "" },
  1: { text: "Weak", className: "text-red-500" },
  2: { text: "Fair", className: "text-amber-500" },
  3: { text: "Good", className: "text-[hsl(var(--color-lime))]" },
  4: { text: "Strong", className: "text-[hsl(var(--color-teal))]" },
};

const strengthColors: Record<number, string> = {
  1: "#ef4444",
  2: "#f59e0b",
  3: "hsl(var(--color-lime))",
  4: "hsl(var(--color-teal))",
};

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const strength = getStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    if (error) {
      setError(error.message);
    } else {
      navigate("/dashboard");
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/dashboard",
      },
    });
  };

  return (
    <AuthLayout>

      <h2 className="text-2xl font-bold text-foreground">Create your account</h2>
      <p className="text-sm text-muted-foreground mt-1 mb-8">
        Start optimizing your ads with AI
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          {/* Full name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">Full name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Strength indicator */}
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  style={{
                    backgroundColor:
                      strength >= level ? strengthColors[level] : undefined,
                  }}
                  className={`flex-1 h-1 rounded-full transition-colors duration-300 ${
                    strength >= level ? "" : "bg-neutral-200 dark:bg-neutral-700"
                  }`}
                />
              ))}
            </div>
            {strengthLabels[strength].text && (
              <span className={`text-xs mt-1 ${strengthLabels[strength].className}`}>
                {strengthLabels[strength].text}
              </span>
            )}
          </div>

          {/* Confirm password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">Confirm password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-destructive mt-4">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full h-10 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">or continue with</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={handleGoogle}
        className="w-full h-10 rounded-md border border-input bg-background text-foreground font-medium text-sm hover:bg-accent/50 transition-colors flex items-center justify-center gap-2"
      >
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
          <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.003 24.003 0 0 0 0 21.56l7.98-6.19z" />
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        </svg>
        Sign up with Google
      </button>

      {/* Sign in link */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>

      {/* Terms */}
      <p className="mt-4 text-center text-xs text-muted-foreground">
        By creating an account you agree to our{" "}
        <a href="#" className="underline hover:text-foreground">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-foreground">
          Privacy Policy
        </a>
      </p>
    </AuthLayout>
  );
};

export default SignupPage;
