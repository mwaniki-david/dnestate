import { create } from "zustand";

type NewHouseState ={
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const UseNewHouse = create<NewHouseState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false }),
}));

