import { defineStore } from "pinia";
import type { PublicContactDto, ContactFormData } from "@/types";
import type { Ref } from "vue";
import { ref } from "vue";
import { useLoaderStore } from "@/stores/loader/store";

export const useContactStore = defineStore("contact", () => {
  const loader = useLoaderStore();
  const contacts: Ref<{ [id: number]: PublicContactDto }> = ref({});

  async function load(pageID: number) {
    // memoization 
    if (!contacts.value[pageID]) {
      const { data } = await loader.loadContact(pageID);
      contacts.value[pageID] = data as PublicContactDto;  
    }
  }

  function getContact(pageID: number) {
    return contacts.value[pageID];
  }

  function submit(form: ContactFormData, pageId: number) {
    return loader.postContactForm(form, pageId);
  }
  return {
    getContact,
    submit,
    load,
  };
});
