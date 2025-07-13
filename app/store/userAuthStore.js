import { create } from "zustand";
import supabase from "@/utils/supabase/client";
import { jwtDecode } from "jwt-decode";

const useAuthStore = create((set) => ({
  userId: null,
  userRole: null,
  email: null,
  displayName: null,

  /** Set auth state from access token + metadata */
  setAuthFromToken: (token, user = null) => {
    if (!token) {
      set({ userId: null, userRole: null, email: null, displayName: null });
      return;
    }

    try {
      const decoded = jwtDecode(token);

      set({
        userRole: decoded?.role || null,
        userId: decoded?.sub || null,
        email: user?.email || null,
        displayName: user?.user_metadata?.display_name || null,
      });

    } catch (error) {
      console.error("[AuthStore] Failed to decode token:", error);
      set({ userId: null, userRole: null, email: null, displayName: null });
    }
  },

  /** Initialize auth state from Supabase session */
  initializeAuth: async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data?.session) {
        console.warn("[AuthStore] No active session", error);
        set({ userId: null, userRole: null, email: null, displayName: null });
        return;
      }

      const { access_token, user } = data.session;

      if (!access_token || !user) {
        set({ userId: null, userRole: null, email: null, displayName: null });
        return;
      }

      try {
        const decoded = jwtDecode(access_token);
        set({
          userRole: decoded?.role || null,
          userId: user.id || decoded?.sub || null,
          email: user?.email || null,
          displayName: user?.user_metadata?.display_name || null,
        });
      } catch (decodeError) {
        console.error("[AuthStore] Failed to decode session token:", decodeError);
        set({ userId: null, userRole: null, email: null, displayName: null });
      }
    } catch (err) {
      console.error("[AuthStore] initializeAuth error:", err);
      set({ userId: null, userRole: null, email: null, displayName: null });
    }
  },

  /** Clear auth state on logout */
  clearAuth: () => {
    set({ userId: null, userRole: null, email: null, displayName: null });
  },
}));

// Sync store with Supabase auth changes
supabase.auth.onAuthStateChange((_event, session) => {
  const token = session?.access_token || null;
  const user = session?.user || null;
  useAuthStore.getState().setAuthFromToken(token, user);
});

export default useAuthStore;
