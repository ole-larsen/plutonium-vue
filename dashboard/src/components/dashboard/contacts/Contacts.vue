<template>
  <CCard class="full-height contacts-container">
    <CCardBody>
      <CCardTitle><CButton class="btn btn-primary" @click="create">Create Contact</CButton></CCardTitle>
      <CCardText>
        <contacts-table
          :contacts="contacts"
          @edit="edit"
          @remove="remove"/>
        <contacts-table-modal
          :contact="contact"
          :show="show"
          @close="close"
          @save="save"
        />
      </CCardText>
    </CCardBody>
  </CCard>
</template>

<script>
import {computed, onMounted} from "vue";
import ContactsTable from "@/components/dashboard/contacts/ContactsTable.vue";
import ContactsTableModal from "@/components/dashboard/contacts/ContactsTableModal.vue";
import {useContactsStore} from "@/stores/dashboard/contacts";
export default {
  name: "Contacts",
  components: {ContactsTableModal, ContactsTable},
  setup() {
    const store = useContactsStore();
    const show = computed(() => store.show);
    onMounted(async () => {
      await store.load();
    });
    return {
      show,
      contacts: computed(() => store.contacts),
      contact: computed(() => store.contact),
      create() {
        store.toggleModal();
        store.new();
      },
      close() {
        store.toggleModal();
        store.new();
      },
      save(contact) {
        store.save(contact);
        store.toggleModal();
      },
      edit(contact) {
        store.setItem(contact);
        store.toggleModal();
      },
      remove(contact) {
        console.log(contact);
        //store.toggleModal();
      }
    }
  }
}
</script>