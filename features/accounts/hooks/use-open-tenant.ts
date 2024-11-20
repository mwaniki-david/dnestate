import { create } from "zustand";

type NewTenantState ={
    id?: string;
    isOpen: boolean;
    onOpen: (id: string) => void;
    onClose: () => void;
};

export const UseOpenTenant = create<NewTenantState>((set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: undefined }),
}));