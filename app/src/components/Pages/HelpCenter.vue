<script lang="ts" setup>
import type { ComputedRef, Ref } from "vue";
import type {ContactFormData, HelpCenter} from "@/types";

import { computed, onBeforeMount, ref } from "vue";
import { useHelpCenterStore } from "@/stores/pages/helpCenter";
import { useContactStore } from "@/stores/pages/contact";
import { usePageStore } from "@/stores/template/page";
import { error } from "@/helpers";

import PageTitle from "@/components/Header/PageTitle.vue";

const store = useHelpCenterStore();
const pages = usePageStore();
const contact = useContactStore();

const path = pages.getPath();
const page = pages.getPage(path as string);

const helpCenter: ComputedRef<HelpCenter[]> = computed(() => store.helpCenter);
const form: Ref<ContactFormData> = ref({
  provider: "help-center",
  name: import.meta.env.VITE_HELP_SERVICE_EMAIL,
  email: import.meta.env.VITE_HELP_SERVICE_EMAIL,
  subject: 1,
  subjectItems: [
    {label: "Help Center", value: 1},
    {label: "Marketing", value: 2},
    {label: "Developers", value: 3},
  ],
  message: "",
  csrf: ""
});

onBeforeMount(async () => {
  try {
    await store.load();
  } catch (e) {
    error(e);
  }
});

function submit(e: Event) {
  contact.submit(form.value, page.id);
}

</script>
<template>
  <PageTitle pageTitle="Help Center"/>
  <section class="tf-help-center tf-section" v-if="helpCenter !== null">
    <div class="themesflat-container">
      <div class="row">
        <div class="col-12">
          <form action="#" class="help-center-form">
            <input type="text" placeholder="Type your question here" required v-model="form.message"/>
            <button @click.prevent="submit">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_1241_902" value="mask-type:alpha" maskUnits="userSpaceOnUse" x="1" y="0" width="25" height="24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M24.666 1.3335H2.23912V23.2653H24.666V1.3335Z" fill="white" stroke="white"/>
                </mask>
                <g mask="url(#mask0_1241_902)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.4518 3.02254C18.6829 3.02254 22.9387 7.18324 22.9387 12.2988C22.9387 17.4144 18.6829 21.5762 13.4518 21.5762C8.22183 21.5762 3.96601 17.4144 3.96601 12.2988C3.96601 7.18324 8.22183 3.02254 13.4518 3.02254ZM13.4519 23.2653C19.6353 23.2653 24.666 18.3456 24.666 12.2988C24.666 6.25201 19.6353 1.3335 13.4519 1.3335C7.2685 1.3335 2.23889 6.25201 2.23889 12.2988C2.23889 18.3456 7.2685 23.2653 13.4519 23.2653Z" fill="white"/>
                  <path d="M13.4518 2.52254C18.9484 2.52254 23.4387 6.89655 23.4387 12.2988H22.4387C22.4387 7.46993 18.4174 3.52254 13.4518 3.52254V2.52254ZM23.4387 12.2988C23.4387 17.701 18.9485 22.0762 13.4518 22.0762V21.0762C18.4174 21.0762 22.4387 17.1278 22.4387 12.2988H23.4387ZM13.4518 22.0762C7.95623 22.0762 3.46601 17.701 3.46601 12.2988H4.46601C4.46601 17.1278 8.48742 21.0762 13.4518 21.0762V22.0762ZM3.46601 12.2988C3.46601 6.89659 7.95631 2.52254 13.4518 2.52254V3.52254C8.48734 3.52254 4.46601 7.46989 4.46601 12.2988H3.46601ZM13.4519 22.7653C19.3697 22.7653 24.166 18.059 24.166 12.2988H25.166C25.166 18.6322 19.9008 23.7653 13.4519 23.7653V22.7653ZM24.166 12.2988C24.166 6.53869 19.3698 1.8335 13.4519 1.8335V0.833496C19.9007 0.833496 25.166 5.96533 25.166 12.2988H24.166ZM13.4519 1.8335C7.53406 1.8335 2.73889 6.53862 2.73889 12.2988H1.73889C1.73889 5.9654 7.00294 0.833496 13.4519 0.833496V1.8335ZM2.73889 12.2988C2.73889 18.0591 7.53412 22.7653 13.4519 22.7653V23.7653C7.00288 23.7653 1.73889 18.6322 1.73889 12.2988H2.73889Z" fill="white"/>
                </g>
                <mask id="mask1_1241_902" value="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="18" width="8" height="8">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.11719 19.02H1.33216V24.6668H7.11719V19.02Z" fill="white" stroke="white"/>
                </mask>
                <g mask="url(#mask1_1241_902)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M2.19553 24.6668C2.41546 24.6668 2.63654 24.5846 2.8058 24.4202L6.86358 20.4633C7.20096 20.1334 7.20211 19.5985 6.86473 19.2686C6.5285 18.9364 5.98155 18.9387 5.64302 19.2663L1.58525 23.2243C1.24787 23.5543 1.24672 24.088 1.5841 24.4179C1.75221 24.5846 1.97444 24.6668 2.19553 24.6668Z" fill="white"/>
                  <path d="M2.19553 24.6668C2.41546 24.6668 2.63654 24.5846 2.8058 24.4202L6.86358 20.4633C7.20096 20.1334 7.20211 19.5985 6.86473 19.2686C6.5285 18.9364 5.98155 18.9387 5.64302 19.2663L1.58525 23.2244C1.24787 23.5543 1.24672 24.088 1.5841 24.4179C1.75221 24.5846 1.97444 24.6668 2.19553 24.6668" stroke="white"/>
                </g>
              </svg>
            </button>
          </form>
          <p class="text-center mg-t-40 mg-bt-60">Or choose a categories to quickly find the help you need</p>
        </div>
      </div>
      <div class="sc-box-icon-inner style-3">
        <div class="sc-box-icon" v-for="item in helpCenter">
          <div class="icon">
            <div class="icon-item" v-if="item['image']">
              <img :src="item['image']['attributes']['url']" alt="image">
            </div>
          </div>
          <h4 class="heading"><router-link :to="item['link']">{{item['title']}}</router-link> </h4>
          <p class="content" v-html="item['description']"></p>
        </div>
      </div>
    </div>
  </section>
</template>