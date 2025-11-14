import { create } from "zustand";

export type CommandResponse = {
  id: string;
  command: string;
  result: string;
};

type UIState = {
  sidebarCollapsed: boolean;
  commandCenterOpen: boolean;
  activeClassId: string;
  commandHistory: CommandResponse[];
  toggleSidebar: () => void;
  openCommandCenter: () => void;
  closeCommandCenter: () => void;
  setActiveClass: (id: string) => void;
  pushCommandResponse: (payload: Omit<CommandResponse, "id">) => void;
};

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  commandCenterOpen: false,
  activeClassId: "grade-10-math",
  commandHistory: [],
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  openCommandCenter: () => set({ commandCenterOpen: true }),
  closeCommandCenter: () => set({ commandCenterOpen: false }),
  setActiveClass: (id) => set({ activeClassId: id }),
  pushCommandResponse: (payload) =>
    set((state) => ({
      commandHistory: [
        {
          id: createId(),
          ...payload,
        },
        ...state.commandHistory,
      ],
    })),
}));
