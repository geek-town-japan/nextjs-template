import { create } from "zustand";

export type Notice = {
  variant: "success" | "error";
  message: string;
};

type UserUiState = {
  editingUserId: number | null;
  notice: Notice | null;
  setEditingUserId: (id: number | null) => void;
  setNotice: (notice: Notice | null) => void;
  reset: () => void;
};

export const useUserUiStore = create<UserUiState>((set) => ({
  editingUserId: null,
  notice: null,
  setEditingUserId: (id) => set({ editingUserId: id }),
  setNotice: (notice) => set({ notice }),
  reset: () => set({ editingUserId: null, notice: null }),
}));
