import { defineStore } from "pinia";

export const useSidebarStore = defineStore({
    id: "sidebar",
    state: () => ({
        sidebarVisible: true,
        sidebarUnfoldable: false,
    }),
    getters: {
        getSidebarVisible(state) {
            return state.sidebarVisible
        },
        getSidebarUnfoldable(state) {
            return state.sidebarUnfoldable
        },
    },
    actions: {
        toggleSidebarVisible() {
            this.sidebarVisible = !this.sidebarVisible
        },
        toggleSidebarUnfoldable() {
            this.sidebarUnfoldable = !this.sidebarUnfoldable
        },
    }
});