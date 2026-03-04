import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  isSynced: JSON.parse(localStorage.getItem("isSynced")) || false,

  login: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isSynced", "false");

    set({ token, user, isSynced: false });
  },

  setSynced: (value) => {
    localStorage.setItem("isSynced", JSON.stringify(value));
    set({ isSynced: value });
  },

  logout: () => {
    localStorage.clear();
    set({ token: null, user: null, isSynced: false });
  },
}));