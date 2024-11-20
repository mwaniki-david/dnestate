import { create } from "zustand";

type NewUnitState ={
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const UseNewUnit = create<NewUnitState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false }),
}));