import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<any | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  if (session === undefined) return null;
  if (!session) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
