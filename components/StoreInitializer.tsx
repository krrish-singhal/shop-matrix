"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import useStore from "@/store";

export default function StoreInitializer() {
  const { userId, isLoaded } = useAuth();
  const { initializeStore, clearStore } = useStore();

  useEffect(() => {
    if (isLoaded) {
      if (userId) {
        // User is logged in - initialize with their user ID
        initializeStore(userId);
      } else {
        // User is logged out - clear the store
        clearStore();
      }
    }
  }, [userId, isLoaded, initializeStore, clearStore]);

  return null;
}
