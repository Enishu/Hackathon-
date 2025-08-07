import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useStore = create()(
    persist(
        (set, get) => ({
            isLogin: false,
            loginToken: "",
            username: "",
            darkMode: true,
            setIsLogin: (status) => set({ isLogin: status }),
            setLoginToken: (token) => set({ loginToken: token }),
            setUsername: (username) => set({ username: username }),
            toggleDarkMode: () => set({ darkMode: !get().darkMode }),
        }),
        {
            name: 'food-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)

export default useStore