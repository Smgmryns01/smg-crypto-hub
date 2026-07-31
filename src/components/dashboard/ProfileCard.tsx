"use client";

import { User } from "lucide-react";

interface ProfileCardProps {
  username: string;
  email: string;
  principal: string;
  role: string;
  verified: boolean;
}

export default function ProfileCard({
  username,
  email,
  principal,
  role,
  verified,
}: ProfileCardProps) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/10">
          <User className="h-7 w-7 text-brand-blue" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            {username}
          </h2>

          <p className="text-sm text-brand-muted">
            {email}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <div>
          <span className="text-brand-muted">
            Principal
          </span>

          <p className="break-all text-white">
            {principal}
          </p>
        </div>

        <div className="flex justify-between">
          <span className="text-brand-muted">
            Role
          </span>

          <span className="text-white">
            {role}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-brand-muted">
            Email
          </span>

          <span
            className={
              verified
                ? "text-green-400"
                : "text-yellow-400"
            }
          >
            {verified ? "Verified" : "Pending"}
          </span>
        </div>
      </div>
    </div>
  );
}