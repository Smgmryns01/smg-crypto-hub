"use client";

import { useEffect } from "react";
import { backend } from "@/lib/icp";

export default function TestBackend() {
  useEffect(() => {
    async function test() {
      try {
        console.log(await backend.health());
        console.log(await backend.version());
      } catch (err) {
        console.error(err);
      }
    }

    test();
  }, []);

  return null;
}