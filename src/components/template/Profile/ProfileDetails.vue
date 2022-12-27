<script lang="ts" setup>

import Filter from "./Filter.vue";
import Mint from "./Mint.vue";
import {computed, reactive, ref, watch} from "vue";

import useDetectOutsideClick from "@/helpers/outside-click";

import {useProfileStore} from "@/stores/profile";
import {useAuthStore} from "@/stores/auth";
import {useNFTStore} from "@/stores/contracts/nft";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";

const store = useProfileStore();
const user = computed(() => useAuthStore().user);

const showEditAvatarBtn = computed(() => store.showEditAvatarBtn);
const showEditAvatarOptions = computed(() => store.showEditAvatarOptions);
const showEditWallpaper = computed(() => store.showEditAvatarWallpaper);
const showEditWallpaperOptions = computed(() => store.showEditAvatarWallpaperOptions);
const isActiveModal = computed(() => store.isActiveModal);
const isActiveWallpaperModal = computed(() => store.isActiveWallpaperModal);
const showUsername = computed(() => store.showUsername);
const showEmail = computed(() => store.showEmail);
const items = computed(() => useMarketPlaceStore().items);
const avatar: any = ref(null);
const nftFile: any = ref(null);
const wallpaper: any = ref(null);
const uploadNav = ref(null);
const avatars = ref([]);
const wallpapers = ref([]);
const profile = ref(null);

const item = ref({
  name: "",
  description: "",
  price: 0,
  file: undefined,
  category: "All",
  tags: ""
});

useDetectOutsideClick(uploadNav, () => {
  store.handleOutsideAvatarOptions();
});

useDetectOutsideClick(profile, () => {
  store.handleOutsideWallpaperOptions();
});

const handleAvatarUpload = () => {
  const provider = `avatar:${user.value.uuid}`
  store.handleFileUpload(avatar.value.files[0], user.value, provider);
}

const handleWallpaperUpload = () => {
  const provider = `wallpaper:${user.value.uuid}`
  store.handleFileUpload(wallpaper.value.files[0], user.value, provider);
}

const handleFileUpload = () => {
  item.value.file = nftFile.value.files[0];
  const provider = `nft:${user.value.uuid}`
  store.handleFileUpload(nftFile.value.files[0], user.value, provider);
  useNFTStore().mint(item.value);
}

const wallPaperStyle = reactive({
  background: `url(${user.value.wallpaper}) no-repeat top`,
});

watch(
  () => user.value.wallpaper,
  (url) => {
    wallPaperStyle.background = `url(${url}) no-repeat top`;
  });

function enterEditAvatar() {
  store.handleEnterEditAvatar();
}

function leaveEditAvatar() {
  store.handleLeaveEditAvatar();
}

function enterEditWallpaper() {
  store.handleEnterEditAvatarWallpaper();
}

function leaveEditWallpaper() {
  store.handleLeaveEditAvatarWallpaper();
}

function editAvatar() {
  store.handleEditAvatarOptions();
}

function editWallpaper() {
  store.handleEditAvatarWallpaperOptions();
}

function uploadAvatar() {
  avatar.value.click();
}

function uploadWallpaper() {
  wallpaper.value.click();
}

function selectAvatar(file: any) {
  store.handleSelectAvatar(file, user.value);
}

function selectWallpaper(file: any) {
  store.handleSelectWallpaper(file, user.value);
}

async function handleAvatarModal() {
  try {
    avatars.value = await useAuthStore().loadAvatars();
    store.handleAvatarModal();
  } catch (e) {
    console.error(e);
  }
}

async function handleWallpaperModal() {
  try {
    wallpapers.value = await useAuthStore().loadWallpapers();
    store.handleWallpaperModal();
  } catch (e) {
    console.error(e);
  }
}

function handleCloseAvatarModal() {
  store.handleAvatarModal();
}

function removeAvatar() {}

function removeWallpaper() {}

function editUsername() {
  store.handleShowUsername();
}

function editEmail() {
  store.handleShowEmail();
}

function updateUsername() {
  store.update(user.value);
  store.handleShowUsername();
}

function updateEmail() {
  store.update(user.value);
  store.handleShowEmail();
}

</script>
<template>
  <div class="authors-2">
    <section class="tf-section authors profile" v-if="user">
      <div class="themesflat-container">
        <div class="flat-tabs tab-authors">
          <div class="author-profile flex" ref="profile" :style="wallPaperStyle"
               @mouseenter="enterEditWallpaper"
               @mouseleave="leaveEditWallpaper">
            <button type="button"
              v-if="showEditWallpaper"
              class="btn-edit-wallpaper"
              @click="editWallpaper"
            >
              <i class="icon-fl-icon"></i>
            </button>
            <div class="upload-nav-wallpaper" v-show="showEditWallpaperOptions">
              <ul class="menu">
                <li class="menu-item menu-item-has-children">
                  <ul class="sub-menu">
                    <li class="menu-item">
                      <a href="#" @click.prevent="uploadWallpaper">Upload</a>
                      <input ref="wallpaper" v-on:change="handleWallpaperUpload()"  type="file" id="upload-wallpaper" hidden>
                    </li>
                    <li class="menu-item"><a href="#" @click.prevent="handleWallpaperModal">Choose from Library</a></li>
                    <li class="menu-item"><a href="#" @click.prevent="removeWallpaper">Delete</a></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="feature-profile" ref="uploadNav">
              <img :src="user.gravatar" alt="image" class="avatar" @mouseenter="enterEditAvatar" @mouseleave="leaveEditAvatar">
              <button @mouseenter="enterEditAvatar"
                      v-if="showEditAvatarBtn"
                      type="button"
                      class="btn-edit-avatar"
                      @click="editAvatar">
                <i class="icon-fl-icon"></i>
              </button>
              <div class="upload-nav" v-show="showEditAvatarOptions">
                <ul class="menu">
                  <li class="menu-item menu-item-has-children">
                    <ul class="sub-menu">
                      <li class="menu-item">
                        <a href="#" @click.prevent="uploadAvatar">Upload</a>
                        <input ref="avatar" v-on:change="handleAvatarUpload()"  type="file" id="upload-avatar" hidden>
                      </li>
                      <li class="menu-item"><a href="#" @click.prevent="handleAvatarModal">Choose from Library</a></li>
                      <li class="menu-item"><a href="#" @click.prevent="removeAvatar">Delete</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div class="infor-profile">
              <span>{{user.address}}</span>
              <div class="infor-profile-username">
                <h2 class="title" @click="editUsername">{{user.username}}</h2>
                <input v-show="showUsername" id="username" name="email" tabIndex="2"  aria-required="true" type="text"
                       placeholder="Your Username" v-model="user.username" @keyup.enter="updateUsername"/>
              </div>

              <div class="infor-profile-email">
                <div class="content" v-html="user.email" @click="editEmail"></div>
                <input v-show="showEmail" id="email" name="email" tabIndex="2"  aria-required="true" type="email"
                       placeholder="Your Email Address" v-model="user.email" @keyup.enter="updateEmail" />
              </div>

              <div v-for="wallet in user.wallets">
                <form>
                  <div>
                    <label class="form-label">{{ wallet.name }}</label>
                  </div>
                  <input type="text" class="inputcopy" v-model="wallet.address" readOnly />
                  <button type="button" class="btn-copycode"><i class="icon-fl-file-1"></i></button>
                </form>
                <br/>
              </div>

            </div>
            <Mint :item="item" />
            <div class="widget-social style-3" v-if="user.socials">
              <ul>
                <li v-for="social in user.socials">
                  <a :href="social.link" target="_blank"><i :class="social.icon"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <Filter :items="items"/>
        </div>
      </div>
    </section>

    <div class="modal" id="popup_avatar" tabIndex="-1" role="dialog" aria-hidden="true"  :class="{ show: isActiveModal }" ref="avatarModal">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="handleCloseAvatarModal" >
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="modal-body space-y-20 pd-40" :class="{ show: isActiveModal }">
            <h3>Choose avatar</h3>
            <div class="row">
              <div class="col-4" v-for="img in avatars">
                <div class="d-flex justify-content-between">
                  <div class="avatar-thumb" @click="selectAvatar(img)">
                    <img :src="img['attributes']['url']">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" id="popup_wallpaper" tabIndex="-1" role="dialog" aria-hidden="true"  :class="{ show: isActiveWallpaperModal }" ref="wallpaperModal">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="handleCloseAvatarModal" >
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="modal-body space-y-20 pd-40" :class="{ show: isActiveWallpaperModal }">
            <h3>Choose wallpaper</h3>
            <div class="row">
              <div class="col-12" v-for="img in wallpapers">
                <div class="d-flex justify-content-between">
                  <div class="avatar-thumb" @click="selectWallpaper(img)">
                    <img :src="img['attributes']['url']">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>