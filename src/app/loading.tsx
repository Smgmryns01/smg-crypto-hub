export default function Loading() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center" role="status" aria-label="Loading">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-brand-blue/20" aria-hidden="true" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-blue animate-spin" aria-hidden="true" />
        </div>
        <p className="text-sm text-brand-muted animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
