import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface SupportModalProps {
  isOpen: boolean
  onClose: () => void
}

const SupportModal = ({ isOpen, onClose }: SupportModalProps) => {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!isOpen) return
    const prefill = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return
      const fullName = session.user.user_metadata?.full_name
      if (fullName) setName(fullName)
      if (session.user.email) setEmail(session.user.email)
    }
    prefill()
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onClose()
    toast({
      title: "Message sent!",
      description: "We'll be in touch soon.",
    })
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-nearblack/60"
        onClick={onClose}
      >
        <div
          className="w-full max-w-md rounded-[var(--radius-card)] bg-card p-6 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Contact Support</h2>
              <p className="text-sm text-muted-foreground mt-1">We'll get back to you within 24 hours</p>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-[var(--radius-btn)] border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-[var(--radius-btn)] border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="How can we help?"
                className="w-full rounded-[var(--radius-btn)] border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue..."
                className="w-full rounded-[var(--radius-btn)] border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground resize-none outline-none transition focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-[var(--radius-btn)] bg-accent text-accent-foreground py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 mt-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default SupportModal
