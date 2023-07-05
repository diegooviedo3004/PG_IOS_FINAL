import { create } from 'zustand'

const loginStore = create((set) => ({
    code: "",
    logout: () => {
      set((state) => ({ code: "" }));
    },
    login: (code) => set((state) => ({ code: code })),
}));

export default loginStore;