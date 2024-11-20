import { create } from "zustand";

type NewBuildingState ={
    id?: string;
    isOpen: boolean;
    onOpen: (id: string) => void;
    onClose: () => void;
};

export const UseOpenBuilding = create<NewBuildingState>((set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: undefined }),
}));