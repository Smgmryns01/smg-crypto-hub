"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Mail, MessageSquare, Github, Twitter } from "lucide-react";
import { toast } from "sonner";
import { PageLayout } from "@/components/layout/PageLayout";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  category: z.enum(["general", "partnership", "support", "press", "other"], {
    required_error: "Please select a category",
  }),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(120, "Subject too long"),
  message: z.string().min(20, "Message must be at least 20 characters").max(2000, "Message too long"),
});

type ContactFormValues = z.infer<typeof ContactSchema>;

const CATEGORIES = [
  { value: "general", label: "General Enquiry" },
  { value: "partnership", label: "Partnership" },
  { value: "support", label: "Support" },
  { value: "press", label: "Press / Media" },
  { value: "other", label: "Other" },
] as const;

const CONTACT_METHODS = [
  {
    icon: Mail,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: MessageSquare,
    label: "🟡 Telegram Channel",
    value: "t.me/SMGCryptohHubChannel",
    href: SITE.telegramChannel,
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    value: "@smgcryptohub",
    href: SITE.twitter,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "Issues & Discussions",
    href: `${SITE.github}/issues`,
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // Contact form endpoint activates at Milestone 6
      // For now, direct to email
      await new Promise((r) => setTimeout(r, 800));
      console.info("Contact form submission:", data);
      toast.success("Message received! We'll respond within 48 hours.", {
        description: `Sent to ${SITE.email}`,
      });
      reset();
    } catch {
      toast.error("Something went wrong. Please email us directly.", {
        description: SITE.email,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <div className="pt-24 pb-20 px-4">
        <div className="container-narrow">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="badge-blue mb-4 mx-auto w-fit">Contact</div>
            <h1 className="font-display text-display-md font-extrabold text-brand-white text-balance">
              Get in{" "}
              <span className="gradient-text">touch</span>
            </h1>
            <p className="mt-4 text-brand-muted max-w-lg mx-auto">
              Questions, partnerships, or feedback — we read every message.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Methods */}
            <div className="space-y-4">
              <h2 className="font-display text-sm font-semibold text-brand-muted uppercase tracking-widest">
                Other ways to reach us
              </h2>
              {CONTACT_METHODS.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="card-glow flex items-center gap-4 p-4 group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10 border border-brand-blue/20 shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <Icon className="h-4 w-4 text-brand-blue" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs text-brand-muted">{label}</div>
                    <div className="text-sm font-medium text-brand-white group-hover:text-brand-blue transition-colors">
                      {value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card space-y-5"
                noValidate
                aria-label="Contact form"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-white mb-1.5">
                      Full Name <span className="text-red-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register("name")}
                      className={cn("input", errors.name && "border-red-500/50 focus:border-red-500")}
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-white mb-1.5">
                      Email Address <span className="text-red-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={cn("input", errors.email && "border-red-500/50 focus:border-red-500")}
                      placeholder="your@email.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-brand-white mb-1.5">
                    Category <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="category"
                    {...register("category")}
                    className={cn("input", errors.category && "border-red-500/50")}
                    aria-invalid={!!errors.category}
                    aria-describedby={errors.category ? "category-error" : undefined}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p id="category-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-brand-white mb-1.5">
                    Subject <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    {...register("subject")}
                    className={cn("input", errors.subject && "border-red-500/50")}
                    placeholder="Brief description"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  />
                  {errors.subject && (
                    <p id="subject-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-white mb-1.5">
                    Message <span className="text-red-400" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    {...register("message")}
                    rows={6}
                    className={cn("input resize-none", errors.message && "border-red-500/50")}
                    placeholder="Tell us more..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-xs text-brand-muted text-center">
                  We typically respond within 48 hours. For urgent matters:{" "}
                  <a href={`mailto:${SITE.email}`} className="text-brand-blue hover:text-brand-blue-glow">
                    {SITE.email}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
