<script lang="ts" setup>
import axios from 'axios';
import {onBeforeMount, ref} from "vue";
const bid: any = ref(null);
async function created (){
  const response = await axios.get('http://localhost:1337/api/tab?populate=Bid.imgAuthor', {
    headers: {
      Authorization:
        'Bearer 90869d41891af733d3e073ae38876c95e06f7835a3df5c09c6456ce2ead077d3332af4a8e2b0ccf2e36f2daaa31f2212702545cc3e8491d1beb93b3a8b573a834a108e43d98913687e7c7f54000a5b373c8b8c0c7b3c201332b153465f5e295e3a71112b8febdc1e9a53316c2540a51034c9d2224bb1b08d649b442ed4949533',
    }
  })
  const { data: {attributes} } = response.data
  bid.value = attributes
}
onBeforeMount(async() => {
  // await created();
});

</script>
<template>
  <div class="tab-content" v-if="bid !== null">
    <p>{{bid.Infor}}</p>
  </div>
</template>