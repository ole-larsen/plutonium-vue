<template>
  <CForm class="text-left">
    <label class="form-label" for="name">Wallets</label>
    <cRow v-for="_wallet in wallets">
      <cCol>
        <br/>
        <CFormInput
          v-model="_wallet.name"
          type="text"
          label="Name"
          placeholder="Wallet Name"
          aria-describedby="wallet_name"
        />
      </cCol>
      <cCol>
        <br/>
        <CFormInput v-if="_wallet.name"
          v-model="_wallet.address"
          type="text"
          label="Address"
          placeholder="Wallet Address"
          aria-describedby="wallet_address"
        />
      </cCol>
    </cRow>
    <br/>
    <cRow>
      <cCol>
        <CFormInput
          v-model="wallet.name"
          id="wallet_name"
          type="text"
          label="Name"
          placeholder="Wallet Name"
          aria-describedby="wallet_name"
        />
      </cCol>
      <cCol>
        <CFormInput v-if="wallet.name"
          v-model="wallet.address"
          id="wallet_address"
          type="text"
          label="Address"
          placeholder="Wallet Address"
          aria-describedby="wallet_address"
        />
      </cCol>
    </cRow>
    <hr/>
    <CButton color="primary" type="submit" @click.prevent="submit">Add wallet</CButton>
  </CForm>
</template>

<script>

import {toRefs, ref} from "vue";

export default {
  name: "AuthorsWallets",
  props: ["wallets"],
  events: ["save"],
  setup(props, { emit }) {
    const { wallets } = toRefs(props);
    const wallet = ref({
      name: "",
      address: ""
    })
    return {
      wallet,
      wallets,
      submit() {
        emit("save", wallet.value, wallets.value);
        wallet.value = {
          name: "",
          address: ""
        };
      }
    }
  },
}
</script>