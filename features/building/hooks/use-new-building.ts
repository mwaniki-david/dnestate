import { create } from "zustand";

type NewBuildingState ={
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const UseNewBuilding = create<NewBuildingState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false }),
}));

