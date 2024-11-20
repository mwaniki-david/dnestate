import { create } from "zustand";

type NewTenantState ={
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const UseNewTenant = create<NewTenantState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false }),
}));