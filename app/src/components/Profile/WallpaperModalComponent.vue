<script lang="ts" setup>
import { toRefs } from "vue";
import { useProfileStore } from "@/stores/template/profile";

const props = defineProps(["isActiveWallpaperModal", "wallpapers", "user"]);
const { isActiveWallpaperModal, wallpapers, user } = toRefs(props);

const store = useProfileStore();

function handleCloseWallpaperModal() {
  store.handleWallpaperModal();
}

function selectWallpaper(file: any) {
  store.handleSelectWallpaper(file, user?.value);
}
</script>

<template>
  <div
    class="modal"
    id="popup_wallpaper"
    tabIndex="-1"
    role="dialog"
    aria-hidden="true"
    :class="{ show: isActiveWallpaperModal }"
    ref="wallpaperModal"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          @click="handleCloseWallpaperModal"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div
          class="modal-body space-y-20 pd-40"
          :class="{ show: isActiveWallpaperModal }"
        >
          <h3>Choose wallpaper</h3>
          <div class="row">
            <div
              class="col-12"
              v-for="img in wallpapers"
              v-bind:key="img['id']"
            >
              <div class="d-flex justify-content-between">
                <div class="avatar-thumb" @click="selectWallpaper(img)">
                  <img :src="img['attributes']['url']" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
