<script setup lang="ts">
import type { PublicMenu } from "@/types";
import type { ComputedRef } from "vue";

import { computed, onMounted, ref } from "vue";

import { useCookies } from "vue3-cookies";

import { useFooterStore } from "@/stores/template/footer";
import { useMarketPlaceStore } from "@/stores/contracts/marketPlace";

import { error } from "@/helpers/log";

const store = useFooterStore();
const market = useMarketPlaceStore();

const name: ComputedRef<string> = computed(() => market.getName());
const menu: ComputedRef<PublicMenu | null> = computed(() => store.menu);
const isActive = computed(() => store.isActive);

const { cookies } = useCookies();

const form = ref({
  email: "",
  csrf: "",
});

onMounted(() => {
  const csrf = cookies.get("_csrf");
  if (csrf) {
    form.value.csrf = csrf;
  }
});

async function submit() {
  try {
    await store.submit(form.value);
    form.value.email = "";
  } catch (e) {
    error(e);
  }
}
</script>
<template>
  <footer id="footer" class="footer-light-style clearfix bg-style">
    <div class="themesflat-container">
      <div class="row">
        <div class="col-lg-3 col-md-12 col-12">
          <div class="widget widget-logo">
            <div class="logo-footer" id="logo-footer">
              <router-link to="/">
                <img
                  src="@/assets/images/logo.svg"
                  :alt="name"
                  id="logo-footer-img"
                />
              </router-link>
            </div>
            <p class="sub-widget-logo">
              Digital marketplace for crypto collectibles and non-fungible
              tokens (NFTs).
            </p>
            <p class="sub-widget-logo">
              Buy, sell, and discover exclusive digital items.
            </p>
          </div>
        </div>
        <template v-if="menu && menu.attributes">
          <div
            v-for="(item, itemIndex) in menu.attributes.items"
            v-bind:key="item['id']"
            :class="
              itemIndex === 0
                ? `col-lg-2 col-md-4 col-sm-5 col-5`
                : itemIndex === 1
                ? `col-lg-2 col-md-4 col-sm-7 col-7`
                : `col-lg-2 col-md-4 col-sm-5 col-5`
            "
          >
            <div
              class="widget widget-menu"
              :class="`style-${itemIndex + 1}`"
              v-if="item.attributes"
            >
              <h5 class="title-widget">{{ item.attributes.name }}</h5>
              <ul class="quick-links" v-if="item.attributes.items">
                <li v-for="link in item.attributes.items" :key="link.id">
                  <router-link :to="link.attributes.link">{{
                    link.attributes.name
                  }}</router-link>
                </li>
              </ul>
            </div>
          </div>
        </template>
        <div class="col-lg-3 col-md-6 col-sm-7 col-12">
          <div class="widget widget-subcribe">
            <h5 class="title-widget">Subscribe</h5>
            <div class="form-subcribe">
              <form
                id="subscribe-form"
                action="#"
                accept-charset="utf-8"
                class="form-submit"
              >
                <input type="hidden" name="csrf" :value="form.csrf" />
                <input
                  autocomplete="true"
                  name="email"
                  v-model="form.email"
                  class="email"
                  type="email"
                  placeholder="info@your-mail.com"
                  required
                />
                <button
                  id="submit"
                  :disabled="form.email === ``"
                  name="submit"
                  type="submit"
                  @click.prevent="submit"
                >
                  <i class="icon-fl-send"></i>
                </button>
              </form>
            </div>
            <!--            <div class="widget-social style-1 mg-t32">-->
            <!--              <ul class="widget-social">-->
            <!--                <li v-for="social in footer.socials" :key="social.id">-->
            <!--                  <a :href="social.link" target="_blank"><i :class="social.icon"></i></a>-->
            <!--                </li>-->
            <!--              </ul>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade popup"
      id="popup_bid"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
      v-bind="{ show: isActive }"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="modal-body space-y-20 pd-40" :class="{ show: isActive }">
            <h3>Place a Bid</h3>
            <p class="text-center">
              You must bid at least
              <span class="price color-popup">4.89 ETH</span>
            </p>
            <input type="text" id="bid-price" class="form-control" placeholder="00.00 ETH" />
            <p>Enter quantity. <span class="color-popup">5 available</span></p>
            <input type="number" id="bid-quantity" class="form-control" placeholder="1" />
            <div class="hr"></div>
            <div class="d-flex justify-content-between">
              <p>You must bid at least:</p>
              <p class="text-right price color-popup">4.89 ETH</p>
            </div>
            <div class="d-flex justify-content-between">
              <p>Service free:</p>
              <p class="text-right price color-popup">0,89 ETH</p>
            </div>
            <div class="d-flex justify-content-between">
              <p>Total bid amount:</p>
              <p class="text-right price color-popup">4 ETH</p>
            </div>
            <router-link
              to="#"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#popup_bid_success"
              data-dismiss="modal"
              aria-label="Close"
            >
              Place a bid</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
