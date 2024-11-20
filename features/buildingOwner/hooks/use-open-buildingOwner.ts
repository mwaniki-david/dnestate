import { create } from "zustand";

type NewbuildingOwnerState ={
    id?: string;
    isOpen: boolean;
    onOpen: (id: string) => void;
    onClose: () => void;
};

export const UseOpenBuildingOwner = create<NewbuildingOwnerState>((set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: undefined }),
}));