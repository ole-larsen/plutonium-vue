import {defineStore} from "pinia";
import type { Contact, ContactFormData } from "@/types";
import type { Ref } from "vue";
import { ref } from "vue";
import { useLoaderStore } from "@/stores/loader/store";
import { link } from "@/helpers";

export const useContactStore = defineStore("contact", () => {
  const loader = useLoaderStore();
  const contacts: Ref<{[id: number]: Contact}> = ref({});

  function getContact(pageID: number) {
    return contacts.value[pageID];
  }

  async function load(pageID: number) {
    try {
        const { data } = await loader.loadContact(pageID);
        console.log(data);
        if (data) {
          if (data.attributes.image && data.attributes.image.attributes) {
            data.attributes.image.attributes.url = link(data.attributes.image.attributes.url);
          }
          contacts.value[pageID] = data;
        } else {
          contacts.value[pageID] = {};
        }
      } catch (e) {
        throw e;
      }
  }

  function submit(form: ContactFormData, pageId: number) {
      return loader.postContactForm(form, pageId);
    }
  return {
    getContact,
    submit,
    load
  }
});