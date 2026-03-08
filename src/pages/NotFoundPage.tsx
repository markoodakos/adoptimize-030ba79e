import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[hsl(var(--color-offwhite))] dark:bg-[hsl(var(--color-nearblack))]">
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <p className="text-lg text-muted-foreground mt-4">Page not found</p>
      <Link
        to="/dashboard"
        className="mt-6 text-sm text-primary hover:underline"
      >
        Back to dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
