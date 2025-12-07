"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import useStore from "@/store";

export default function StoreInitializer() {
  const { userId, isLoaded } = useAuth();
  const { initializeStore } = useStore();

  useEffect(() => {
    if (isLoaded && userId) {
      // User is logged in - initialize with their user ID
      // Cart data persists in localStorage even after logout
      initializeStore(userId);
    }
  }, [userId, isLoaded, initializeStore]);

  return null;
}
