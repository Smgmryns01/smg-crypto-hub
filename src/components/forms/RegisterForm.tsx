"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

import { getBackend } from "@/lib/icp/backend";
import { useIcp } from "@/context/IcpContext";

const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters."),
  email: z
    .string()
    .email("Please enter a valid email address."),
  termsAccepted: z.boolean().refine((value) => value, {
    message: "You must agree to the Terms of Service.",
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const { isAuthenticated, principal } = useIcp();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      termsAccepted: false,
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    if (!isAuthenticated || !principal) {
      toast.error(
        "Please connect with Internet Identity before creating your account."
      );
      return;
    }

    try {
      const backend = await getBackend();

      const result = await backend.registerUser(
        data.username.trim(),
        data.email.trim()
      );

      if ("ok" in result) {
        toast.success("Account created successfully!");
        router.replace("/dashboard");
        return;
      }

      toast.error(result.err || "Registration failed.");
    } catch (error) {
      console.error("ICP registration failed:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to create your account."
      );
    }
  }

  if (!isAuthenticated || !principal) {
    return (
      <div className="rounded-2xl border border-brand-border bg-brand-card p-6 text-center">
        <p className="text-sm text-brand-muted">
          Please connect with Internet Identity before creating your account.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label htmlFor="username">Username</Label>

        <Input
          id="username"
          type="text"
          placeholder="johndoe"
          autoComplete="username"
          {...register("username")}
        />

        {errors.username && (
          <p className="mt-1 text-sm text-red-500">
            {errors.username.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          {...register("email")}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-3 text-sm text-white">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-brand-border bg-brand-card text-brand-blue focus:ring-brand-blue"
            {...register("termsAccepted")}
          />

          <span>I agree to the Terms of Service</span>
        </label>

        {errors.termsAccepted && (
          <p className="text-sm text-red-500">
            {errors.termsAccepted.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}