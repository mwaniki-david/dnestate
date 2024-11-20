import { create } from "zustand";

type NewbuildingOwnerState ={
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const UseNewBuildingOwner = create<NewbuildingOwnerState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false }),
}));