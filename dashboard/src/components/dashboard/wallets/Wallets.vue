<template>
  <CCard class="full-height wallets-container">
    <CCardBody>
      <CCardTitle><CButton class="btn btn-primary" @click="create">Create Wallet</CButton></CCardTitle>
      <CCardText>
        <wallets-table
          :wallets="wallets"
          @edit="edit"
          @remove="remove"/>
        <wallets-table-modal
          :wallet="wallet"
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
import WalletsTableModal from "@/components/dashboard/wallets/WalletsTableModal.vue";
import WalletsTable from "@/components/dashboard/wallets/WalletsTable.vue";
import {useWalletsStore} from "@/stores/dashboard/wallets";
export default {
  name: "Wallets",
  components: {WalletsTableModal, WalletsTable},
  setup() {
    const store = useWalletsStore();
    const show = computed(() => store.show);
    onMounted(async () => {
      await store.load();
    });
    return {
      show,
      wallets: computed(() => store.wallets),
      wallet: computed(() => store.wallet),
      create() {
        store.toggleModal();
        store.new();
      },
      close() {
        store.toggleModal();
        store.new();
      },
      save(wallet) {
        store.save(wallet);
        store.toggleModal();
      },
      edit(wallet) {
        store.setItem(wallet);
        store.toggleModal();
      },
      remove(wallet) {
        console.log(wallet);
        //store.toggleModal();
      }
    }
  }
}
</script>