import { useEffect, useState } from "react"
import { supabase } from "@/integrations/supabase/client"

interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  email: string | null
}

export const useAuth = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.user) {
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle()

      setProfile(data)
      setLoading(false)
    }

    getProfile()

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange(async (_event, session) => {
        if (!session?.user) {
          setProfile(null)
          return
        }
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .maybeSingle()
        setProfile(data)
      })

    return () => subscription.unsubscribe()
  }, [])

  const getInitials = (name: string | null): string => {
    if (!name) return "?"
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return { profile, loading, getInitials }
}
