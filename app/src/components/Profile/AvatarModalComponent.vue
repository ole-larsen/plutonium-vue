<script lang="ts" setup>
import type { PublicFile } from "@/types";
import { toRefs } from "vue";
import { useProfileStore } from "@/stores/template/profile";

const props = defineProps(["isActiveModal", "avatars", "user"]);
const { isActiveModal, avatars, user } = toRefs(props);
const store = useProfileStore();

function handleCloseAvatarModal() {
  store.handleAvatarModal();
}

function selectAvatar(file: PublicFile) {
  store.handleSelectAvatar(file, user?.value);
}
</script>

<template>
  <div
    class="modal"
    id="popup_avatar"
    tabIndex="-1"
    role="dialog"
    aria-hidden="true"
    :class="{ show: isActiveModal }"
    ref="avatarModal"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          @click="handleCloseAvatarModal"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div
          class="modal-body space-y-20 pd-40"
          :class="{ show: isActiveModal }"
        >
          <h3>Choose avatar</h3>
          <div class="row">
            <div class="col-4" v-for="img in avatars" v-bind:key="img['id']">
              <div class="d-flex justify-content-between">
                <div class="avatar-thumb" @click="selectAvatar(img)">
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
