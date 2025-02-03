<script lang="ts" setup>
import type { ComputedRef } from "vue";
import type { PublicFileDto, SliderItemDto } from "@/types";
import { computed, onBeforeMount } from "vue";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { useSliderStore } from "./store/slider";
import { error } from "@/helpers";
import "vue3-carousel/dist/carousel.css";

const store = useSliderStore();
const banner: ComputedRef<SliderItemDto[]> = computed(() => store.banner);

onBeforeMount(() => {
  try {
    store.load("home-02");
  } catch (e) {
    error(e);
  }
});
</script>
<template>
  <div class="mainslider home">
    <div class="flat-title-page">
      <img
        class="bgr-gradient gradient1"
        src="../../assets/images/backgroup-section/bg-gradient1.png"
        alt="bg-gradient1"
      />
      <img
        class="bgr-gradient gradient2"
        src="../../assets/images/backgroup-section/bg-gradient2.png"
        alt="bg-gradient2"
      />
      <img
        class="bgr-gradient gradient3"
        src="../../assets/images/backgroup-section/bg-gradient3.png"
        alt="bg-gradient3"
      />
      <div class="shape item-w-16"></div>
      <div class="shape item-w-22"></div>
      <div class="shape item-w-32"></div>
      <div class="shape item-w-48"></div>
      <div class="shape style2 item-w-51"></div>
      <div class="shape style2 item-w-51 position2"></div>
      <div class="shape item-w-68"></div>
      <div class="overlay"></div>
      <carousel
        :autoplay="0"
        :wrap-around="false"
        v-if="banner !== null && banner.length > 0"
      >
        <Slide v-for="(slide, index) in banner" :key="'slide-' + index">
          <div class="slider-item">
            <div class="themesflat-container">
              <div class="wrap-heading flat-slider flex">
                <div class="content">
                  <div v-html="slide['attributes']['heading']"></div>
                  <p class="sub-heading" v-html="slide['attributes']['description']"></p>
                  <div class="flat-bt-slider flex style2">
                    <template v-if="slide['attributes']['btnLink1']">
                      <router-link
                        :to="slide['attributes']['btnLink1']"
                        class="sc-button header-slider style style-1 rocket fl-button pri-1"
                      >
                        <span>{{ slide['attributes']["btnText1"] }}</span>
                      </router-link>
                    </template>
                    <template v-if="slide['attributes']['btnLink2']">
                      <router-link
                        :to="slide['attributes']['btnLink2']"
                        class="sc-button header-slider style style-1 note fl-button pri-1"
                      >
                        <span>{{ slide['attributes']["btnText2"] }}</span>
                      </router-link>
                    </template>
                  </div>
                </div>
                <template v-if="slide['attributes']['image'] && slide['attributes']['image']['attributes']">
                  <div class="image">
                    <img
                      class="img-bg"
                      :src="(slide['attributes']['bg'] as PublicFileDto)['attributes']['url']"
                      :alt="(slide['attributes']['bg'] as PublicFileDto)['attributes']['alt']"
                    />
                    <img
                      :src="slide['attributes']['image']['attributes']['url']"
                      :alt="slide['attributes']['image']['attributes']['alt']"
                    />
                  </div>
                </template>
              </div>
            </div>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </carousel>
    </div>
  </div>
</template>
