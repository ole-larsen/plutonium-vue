import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth";
export type File = {
  id: number;
  provider: string;
  name: string;
  alt: string;
  caption: string;
  thumb: string;
  type: string;
  ext: string;
  hash: string;
  size: number;
  width: number;
  height: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  created_by_id: number;
  updated_by_id: number;
}
export const useFilesStore = defineStore({
  id: "files",
  state: () => ({
    _files: [],
    _options: {
      accept: "image/png,image/gif,image/jpeg,image/webp,image/svg+xml",
      extensions: "gif,jpg,jpeg,png,webp,svg",
      // extensions: ["gif", "jpg", "jpeg","png", "webp"],
      // extensions: /\.(gif|jpe?g|png|webp)$/i,
      minSize: 0,
      size: 1024 * 1024 * 10,
      multiple: true,
      directory: false,
      drop: true,
      dropDirectory: true,
      createDirectory: false,
      addIndex: false,
      thread: 3,
      name: "file",
      postAction: `${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/files`,
      headers: {
        "Authorization": `Bearer ${useAuthStore().user.token}`
      },
      autoCompress: 1024 * 1024,
      uploadAuto: false,
    },
    _isOption: false,
    _show: false,
  }),
  getters: {
    files:   (state) => state._files,
    options: (state) => state._options,
    isOption: (state) => state._isOption,
    show:    (state) => state._show
  },
  actions: {
    load() {
      const user = useAuthStore().user;
      return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/files`, {
        method: 'GET', // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      })
      .then((response) => response.status !== 200 ? response.json() : response.text())
      .then((response) => {
        this._files = JSON.parse(response);
        return this._files;
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
    },
    update(file: any) {
      const user = useAuthStore().user;
      const formData = new FormData();
      formData.append("id", file.id);
      formData.append("name", file.name);
      formData.append("alt", file.alt);
      formData.append("hash", file.hash);
      formData.append("ext", file.ext);
      formData.append("caption", file.caption);
      formData.append("type", file.type);
      formData.append("size", file.size);
      formData.append("width", file.width);
      formData.append("height", file.height);
      formData.append("provider", file.provider);
      formData.append("file", file.file);
      let url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/files`;

      return fetch(url, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${user.token}`
        },
        body: formData
      })
      .then((response) => response.status == 200 ? response.json() : response.text())
      .then(async (response) => {
        this._files = response;
        return this._files;
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
    },
    upload(file: any) {
      const user = useAuthStore().user;
      const formData = new FormData();
      formData.append("name", file.name);
      formData.append("alt", file.alt);
      formData.append("hash", file.hash);
      formData.append("ext", file.ext);
      formData.append("caption", file.caption);
      formData.append("type", file.type);
      formData.append("size", file.size);
      formData.append("width", file.width);
      formData.append("height", file.height);
      formData.append("provider", file.provider);
      formData.append("file", file.file);
      let url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/files`;

      return fetch(url, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${user.token}`
        },
        body: formData
      })
        .then((response) => response.status === 200 ? response.json() : response.text())
        .then(async (response) => {
          if (response.message) {
            const img = await this.findByName(file.name);
            img.thumb = `${import.meta.env.VITE_BACKEND_URL}${img.thumb}`;
            return img.thumb;
          }
        })
        .catch((e) => {
          console.error(e);
          throw e;
        });
    },
    findByName(name: string) {
      const user = useAuthStore().user;
      if (name) {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/files?name=${name}`;

        return fetch(url, {
          method: 'GET', // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
          },
        })
          .then((response) => response.status == 200 ? response.json() : response.text())
          .then((response) => {
            if (response && response.length === 1) {
              return response[0];
            }
            return response;
          })
          .catch((e) => {
            console.error(e);
            throw e;
          });
      } else {
        return null;
      }
    },
    find(id: string | number) {
      const user = useAuthStore().user;
      if (id) {
        return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/files/${id}`, {
          method: 'GET', // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`
          },
        })
        .then((response) => response.status !== 200 ? response.json() : response.text())
        .then((response) => {
          return JSON.parse(response);
        })
        .catch((e) => {
          console.error(e);
          throw e;
        });
      } else {
        return null;
      }
    }
  }
});
