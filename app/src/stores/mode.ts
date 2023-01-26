import { defineStore } from "pinia";
import type {Ref} from "vue";
import {ref} from "vue";

export const useModeStore = defineStore("mode", () => {
  const theme: Ref<string> = ref("is_dark"),
        logo: Ref<string> = ref("../../assets/images/item-background/logo@2x.png");

  function getTheme() {
    return localStorage.getItem("user-theme");
  }

  function setTheme(_theme: string) {
    localStorage.setItem("user-theme", _theme);
    theme.value = _theme;
    document.documentElement.className = _theme;
  }

  function getMediaPreference() {
    const hasDarkPreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (hasDarkPreference) {
      theme.value = "is_dark";
      return "is_dark";
    } else {
      theme.value = "is_light";
      return "is_light";
    }
  }

  function toggleTheme() {
    const activeTheme = localStorage.getItem("user-theme");
    if (activeTheme === "is_dark") {
      setTheme("is_light");
    } else {
      setTheme("is_dark");
    }
  }

  return {
    theme, logo, toggleTheme, getMediaPreference, getTheme, setTheme
  }
});