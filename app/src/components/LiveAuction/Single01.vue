<script lang="ts" setup>
import {onMounted, ref, toRefs} from "vue";
import Countdown from "@/components/Collection/Countdown.vue";
import {useMarketPlaceStore} from "@/stores/contracts/marketPlace";
import {useLoaderStore} from "@/stores/loader/store";
import {useLiveAuctionStore} from "@/stores/components/liveAuction";
import {error} from "@/helpers";
import moment from "moment";
const props = defineProps(["collectible", "user"]);
const { collectible, user } = toRefs(props);

const store   = useMarketPlaceStore();
const loader  = useLoaderStore();
const auction = useLiveAuctionStore();

const likes = ref(0);

onMounted(() => {
  refresh();
})

function refresh() {
  if (collectible) {
    loader.loadCollectibleLikes(collectible.value)
      .then((data: {
        data: { likes: number };
        status: number;
      }) => {
        likes.value = data.data.likes ? data.data.likes : 0;
      })
      .catch((e: Error) => {
        error(e);
      });
  }
}

function like() {
  if (collectible) {
    loader.like(collectible.value).then(() => {
      refresh();
    })
  }
}

const endTimestamp = collectible?.value['attributes']['details']['end_time'];
const nowTimestamp = moment().unix();
const endDatetime = moment.unix(endTimestamp);

function toggleActive() {
  console.log("open modal");
}
</script>
<template>
  <div class="sc-card-product">
    <div class="card-media">
      <router-link :to="collectible['attributes']['metadata']['external_url']">
        <img :src="collectible['attributes']['metadata']['image']" alt="image">
      </router-link>
      <div @click.prevent="like" class="wishlist-button heart">
        <span class="number-like">{{ likes }}</span>
      </div>

      <div class="button-place-bid" v-if="user && user.address !== collectible['attributes']['owner']['address']">
        <button class="sc-button style-place-bid style bag fl-button pri-3"><span>Buy</span></button>
      </div>
    </div>
    <div class="card-title">
      <h5>
        <router-link :to="collectible['attributes']['metadata']['external_url']">
          {{collectible['attributes']['metadata']['name']}}
        </router-link>
      </h5>
      <div class="tags">{{collectible['attributes']['details']['fulfilled'] ? 'Sold' : collectible['attributes']['details']['tags'] }}</div>
    </div>

    <div class="meta-info">
      <div class="author">
        <div class="avatar" v-if="collectible['attributes']['creator']['gravatar']">
          <img :src="collectible['attributes']['creator']['gravatar']" :alt="collectible['attributes']['creator']['username']">
        </div>
        <div class="info" v-if="collectible['attributes']['creator']['address']">
          <span>Created By</span>
          <h6 v-if="collectible['attributes']['creator']['uuid']">
            <router-link :to="`/author/${collectible['attributes']['creator']['uuid']}`">{{collectible['attributes']['creator']['username'].slice(0, 16)}}...</router-link>
          </h6>
        </div>
      </div>
      <div class="price">
        <span>Price</span>
        <h5> {{ collectible['attributes']['details']['price'] }} ETH</h5>
      </div>
    </div>
    <div class="meta-info" v-if="collectible['attributes']['owner']">
      <div class="author">
        <div class="avatar" v-if="collectible['attributes']['owner']['gravatar']">
          <img :src="collectible['attributes']['owner']['gravatar']"
               :alt="collectible['attributes']['owner']['username']">
        </div>
        <div class="info" v-if="collectible['attributes']['owner']['address']">
          <span>Owned By</span>
          <h6 v-if="collectible['attributes']['owner']['uuid']">
            <router-link :to="`/author/${collectible['attributes']['owner']['uuid']}`">{{collectible['attributes']['owner']['username'].slice(0, 16)}}...</router-link>
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

