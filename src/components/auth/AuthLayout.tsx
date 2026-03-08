

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex bg-[hsl(var(--color-offwhite))] dark:bg-[hsl(var(--color-nearblack))]">
      {/* Left Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[hsl(var(--color-teal))] flex-col items-center justify-center p-16">
        <div className="max-w-[360px] mx-auto">
          <img
            src={logoLight}
            alt="AdOptimize"
            className="h-10 w-auto mb-8"
          />

          <h1 className="text-3xl font-bold text-[hsl(var(--color-lime))] leading-tight">
            Scale your ads.
            <br />
            Smarter. Faster.
          </h1>

          <p className="text-base text-white/70 mt-4 leading-relaxed">
            AI-powered optimization for Facebook, Instagram and YouTube — in one dashboard.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <p className="text-sm text-white/80">
              ✦&nbsp;&nbsp;AI analysis on every ad account
            </p>
            <p className="text-sm text-white/80">
              ✦&nbsp;&nbsp;Multi-platform in a single view
            </p>
            <p className="text-sm text-white/80">
              ✦&nbsp;&nbsp;Actionable recommendations instantly
            </p>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 bg-white dark:bg-neutral-900 flex items-center justify-center p-8 lg:p-16 min-h-screen">
        <div className="w-full max-w-[440px] mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
