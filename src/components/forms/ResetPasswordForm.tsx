"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const passwordValue = watch("password") ?? "";

  function getPasswordStrength(password: string) {
    if (!password) {
      return { label: "Weak", className: "text-red-500" };
    }

    if (password.length < 8) {
      return { label: "Weak", className: "text-red-500" };
    }

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    const characterTypes = [hasLowercase, hasUppercase, hasNumber, hasSymbol].filter(Boolean).length;

    if (characterTypes <= 1) {
      return { label: "Weak", className: "text-red-500" };
    }

    if (characterTypes >= 4) {
      return { label: "Strong", className: "text-green-500" };
    }

    return { label: "Medium", className: "text-yellow-500" };
  }

  const passwordStrength = getPasswordStrength(passwordValue);

  async function onSubmit(data: ResetPasswordFormValues) {
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to reset password.");
      }

      toast.success("Password reset successful.");
      router.push("/login");
    } catch {
      toast.error("Unable to reset password.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="password">New Password</Label>

        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
        />

        <p className={`mt-1 text-sm ${passwordStrength.className}`}>
          Password strength: {passwordStrength.label}
        </p>

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>

        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword")}
        />

        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
}
