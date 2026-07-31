"use client";

import type { User } from "@/declarations/backend/backend.did";

interface Props {
  user: User;
}

export default function UserProfileCard({ user }: Props) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-6">
      <h2 className="text-xl font-bold text-white mb-4">
        My Profile
      </h2>

      <div className="space-y-3 text-sm">
        <div>
          <p className="text-brand-muted">Username</p>
          <p className="text-white">{user.username}</p>
        </div>

        <div>
          <p className="text-brand-muted">Email</p>
          <p className="text-white">{user.email}</p>
        </div>

        <div>
          <p className="text-brand-muted">Role</p>
          <p className="text-white">{Object.keys(user.role)[0]}</p>
        </div>

        <div>
          <p className="text-brand-muted">
            Email Verification
          </p>

          <p
            className={
              user.emailVerified
                ? "text-green-400"
                : "text-yellow-400"
            }
          >
            {user.emailVerified
              ? "Verified"
              : "Pending"}
          </p>
        </div>

        <div>
          <p className="text-brand-muted">
            Principal
          </p>

          <p className="break-all text-xs text-white">
            {user.principal.toText()}
          </p>
        </div>
      </div>
    </div>
  );
}