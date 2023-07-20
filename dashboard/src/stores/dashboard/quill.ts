import { defineStore } from "pinia";
import {useAuthStore} from "@/stores/auth";
import {computed} from "vue";

// @ts-ignore
import ImageUploader from "quill-image-uploader";
import {useFilesStore} from "@/stores/dashboard/files";

export const useQuillStore = defineStore({
  id: "quill",
  state: () => ({

  }),
  getters: {
  },
  actions: {
    setupImageUploader(provider: string) {
      return {
        name: "imageUploader",
        module: ImageUploader,
        options: {
          upload: (newFile: File) => {
            return new Promise((resolve, reject) => {
              const URL = (window.URL || window.webkitURL);
              const blob = URL.createObjectURL(newFile);

              const file = {
                name: newFile.name,
                alt: newFile.name,
                caption: newFile.name,
                provider: provider,
                ext: `.${newFile.type.substr(6).split("+")[0]}`,
                type: newFile.type === "image/jpeg" ? "image/jpg" : newFile.type,
                size: newFile.size,
                hash: "",
                thumb: "",
                width: 0,
                height: 0,
                file: newFile
              }
              const img = new Image();
              img.src = blob;
              file.thumb = blob;

              img.onload = () => {
                file.width = img.width;
                file.height = img.height;
                file.file = newFile;
                resolve(useFilesStore().upload(file));
              }
            });
          }
        }
      }
    }
  }
});
