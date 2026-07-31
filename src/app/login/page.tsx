import LoginForm from "@/components/forms/LoginForm";
import InternetIdentityButton from "@/components/auth/InternetIdentityButton";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-black px-6">
      <div className="w-full max-w-md rounded-2xl border border-brand-border bg-brand-card p-8 shadow-card">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-brand-muted">
            Sign in to your SMG Crypto Hub account.
          </p>
        </div>

        <LoginForm />

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-brand-border" />
          <span className="mx-4 text-xs uppercase text-brand-muted">
            Or
          </span>
          <div className="flex-1 border-t border-brand-border" />
        </div>

        <InternetIdentityButton />
      </div>
    </main>
  );
}