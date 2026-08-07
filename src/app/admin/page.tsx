"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function AdminIndex() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    router.replace(user && isAdmin ? "/admin/dashboard" : "/admin/login");
  }, [loading, user, isAdmin, router]);

  return null;
}
