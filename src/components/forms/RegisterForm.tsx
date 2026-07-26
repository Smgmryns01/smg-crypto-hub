"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { register as registerUser } from "@/services/auth";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full Name must be at least 2 characters."),
    username: z.string().min(3, "Username must be at least 3 characters."),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters."),
    termsAccepted: z.boolean().refine((value) => value, {
      message: "You must agree to the Terms of Service.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
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

  async function onSubmit(data: RegisterFormValues) {
    const result = await registerUser(data);

    if (result.success) {
      toast.success("Registration successful!");
      router.push("/login");
      return;
    }

    toast.error(result.error ?? "Registration failed.");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="fullName">Full Name</Label>

        <Input
          id="fullName"
          type="text"
          placeholder="John Doe"
          {...register("fullName")}
        />

        {errors.fullName && (
          <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="username">Username</Label>

        <Input
          id="username"
          type="text"
          placeholder="johndoe"
          {...register("username")}
        />

        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>

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
          <p className="text-sm text-red-500">{errors.termsAccepted.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}
