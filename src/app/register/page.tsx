import RegisterForm from "@/components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-black px-6">
      <div className="w-full max-w-md rounded-2xl border border-brand-border bg-brand-card p-8 shadow-card">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-2 text-brand-muted">
            Join SMG Crypto Hub today.
          </p>
        </div>

        <RegisterForm />
      </div>
    </main>
  );
}
