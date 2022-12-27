<script lang="ts" setup>
import { ref } from "vue";
const isActive = ref(false);
function toggleActive(){
  isActive.value = !isActive.value;
}

</script>

<template>
<PopupModel >
    <!-- <button class="sc-button style-place-bid style bag fl-button pri-3" href="javascript:void(0)" 
                        v-on:click="toggleActive(isActive)" ><span>{{btnText}}</span></button> -->

    <div class="modal fade popup" id="popup_bid" tabIndex="-1" role="dialog" aria-hidden="true"  :class="{ show: isActive }">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="toggleActive()">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="modal-body space-y-20 pd-40" :class="{ show: isActive }">
                    <h3>Place a Bid</h3>
                    <p class="text-center">You must bid at least <span class="price color-popup">4.89 ETH</span>
                    </p>
                    <input type="text" class="form-control"
                        placeholder="00.00 ETH" />
                    <p>Enter quantity. <span class="color-popup">5 available</span>
                    </p>
                    <input type="number" class="form-control" placeholder="1" />
                    <div class="hr"></div>
                    <div class="d-flex justify-content-between">
                        <p> You must bid at least:</p>
                        <p class="text-right price color-popup"> 4.89 ETH </p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p> Service free:</p>
                        <p class="text-right price color-popup"> 0,89 ETH </p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p> Total bid amount:</p>
                        <p class="text-right price color-popup"> 4 ETH </p>
                    </div>
                    <router-link to="#" class="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Place a bid</router-link>
                </div>
            </div>
        </div>
    </div>
</PopupModel>
</template>

