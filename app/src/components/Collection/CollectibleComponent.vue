<script lang="ts" setup>
import Countdown from "@/components/Collection/CountdownComponent.vue";
import type { ComputedRef, Ref } from "vue";
import { ref, toRefs, onMounted, computed } from "vue";
import { useLoaderStore } from "@/stores/loader/store";
import { error } from "@/helpers";
import { useMarketPlaceStore } from "@/stores/contracts/marketPlace";
import moment from "moment/moment";
import { useAuctionStore } from "@/stores/contracts/auction";
import type { PublicUser } from "@/types";
import { useAuthStore } from "@/stores/auth/store";
import type { NFTAuction } from "@ploutonion/dapp-contracts/typechain-types";

const emit = defineEmits(["buy", "placeBid", "loadHistory"]);
const props = defineProps(["collectible"]);
const { collectible } = toRefs(props);

const loader = useLoaderStore();
const market = useMarketPlaceStore();
const auction = useAuctionStore();
const likes = ref(0);
const user: ComputedRef<PublicUser> = computed(() => useAuthStore().getUser());

const auctionContract: ComputedRef<NFTAuction> = computed(() => {
  const auctionName =
    "auction_" +
    collectible?.value.attributes.collectionId +
    ":" +
    collectible?.value.attributes.itemId;
  // const collectionContract = useCollectionStore().contract[collectible.value.attributes.collectionId];
  // const collectionContractAddress = useCollectionStore().contractAddress[collectible.value.attributes.collectionId];
  return auction.contract[auctionName];
});

const isStarted: Ref<boolean> = ref(false);

onMounted(async () => {
  try {
    if (collectible?.value) {
      isStarted.value = await auctionContract.value.isStarted();
      refresh();
    }
  } catch (e) {
    error(e);
  }
});

function refresh() {
  if (collectible?.value) {
    loader
      .loadCollectibleLikes(collectible.value)
      .then((data: { data: { likes: number }; status: number }) => {
        likes.value = data.data.likes ? data.data.likes : 0;
      })
      .catch((e: Error) => {
        error(e);
      });
  }
}

async function like() {
  if (collectible?.value) {
    try {
      await loader.like(collectible.value);
      refresh();
    } catch (e) {
      error(e);
    }
  }
}

function buyCollectible() {
  emit("buy", collectible?.value);
}

function placeBid() {
  emit("placeBid", collectible?.value);
}

function loadHistory() {
  emit("loadHistory", collectible?.value);
}

async function startAuction() {
  try {
    const tx = await auctionContract.value.startAuction();
    await tx.wait();
    await loader.load();
  } catch (e) {
    error(e);
  }
}
const startTimestamp =
  collectible?.value["attributes"]["details"]["start_time"];
const endTimestamp = collectible?.value["attributes"]["details"]["end_time"];

const nowTimestamp = moment().unix();
const startDatetime = moment.unix(startTimestamp);
const endDatetime = moment.unix(endTimestamp);

const authorized: ComputedRef<boolean> = computed(() => {
  return !!user.value?.id;
});

const isOwner: ComputedRef<boolean> = computed(() => {
  return market.getOwner() === user.value.address;
});
</script>
<template>
  <div class="sc-card-product explode">
    <div class="card-media">
      <router-link :to="collectible['attributes']['metadata']['external_url']">
        <img
          :src="collectible['attributes']['metadata']['image']"
          :alt="collectible['attributes']['metadata']['name']"
        />
      </router-link>
      <div class="coming-soon">
        {{ collectible["attributes"]["tokenIds"].length }}
      </div>
      <div @click.prevent="like" class="wishlist-button heart">
        <span class="number-like">{{ likes }}</span>
      </div>

      <template v-if="collectible['attributes']['details']['auction']">
        <div class="featured-countdown" v-if="endTimestamp > nowTimestamp">
          <span class="slogan"></span>
          <Countdown
            :starttime="startDatetime.format('MMMM DD, YYYY, hh:mm:ss')"
            :endtime="endDatetime.format('MMMM DD, YYYY, hh:mm:ss')"
          >
          </Countdown>
        </div>
        <div
          class="button-place-bid"
          v-if="authorized && isOwner && !isStarted"
        >
          <button
            class="sc-button style-place-bid style bag fl-button pri-3"
            @click="startAuction"
          >
            <span>Start Auction</span>
          </button>
        </div>
      </template>
      <!--      <div class="button-place-bid">-->
      <!--        <button class="sc-button style-place-bid style bag fl-button pri-3" @click.prevent="buyCollectible"><span>Buy</span></button>-->
      <!--      </div>-->
    </div>
    <div class="card-title mg-bt-16">
      <h5>
        <router-link
          :to="collectible['attributes']['metadata']['external_url']"
        >
          "{{ collectible["attributes"]["metadata"]["name"] }}"
        </router-link>
      </h5>
      <div class="tags">{{ collectible["attributes"]["details"]["tags"] }}</div>
      <!--      <router-link :to="collection['attributes']['category']['url']">-->
      {{ collectible["attributes"]["details"]["category"] }}
      <!--      </router-link>-->
    </div>
    <div>
      <div class="meta-info" v-if="collectible['attributes']['creator']">
        <div class="author">
          <div class="avatar">
            <img
              :src="collectible['attributes']['creator']['gravatar']"
              :alt="collectible['attributes']['creator']['username']"
            />
          </div>
          <div class="info">
            <span>Creator</span>
            <h6>
              <router-link
                :to="`/author/${collectible['attributes']['creator']['username']}`"
              >
                {{
                  collectible["attributes"]["creator"]["username"].length > 10
                    ? collectible["attributes"]["creator"]["username"].slice(
                        0,
                        4
                      ) +
                      "..." +
                      collectible["attributes"]["creator"]["username"].slice(-4)
                    : collectible["attributes"]["creator"]["username"]
                }}
              </router-link>
            </h6>
          </div>
        </div>
        <div
          class="price"
          v-if="collectible['attributes']['details']['auction']"
        >
          <span>Current Bid</span>
          <h5>{{ collectible["attributes"]["details"]["start_price"] }} ETH</h5>
        </div>
        <div class="price" v-else>
          <span>Current Price</span>
          <h5>{{ collectible["attributes"]["details"]["price"] }} ETH</h5>
        </div>
      </div>
      <div class="meta-info" v-if="collectible['attributes']['owner']">
        <div class="author">
          <div class="avatar">
            <img
              :src="collectible['attributes']['owner']['gravatar']"
              :alt="collectible['attributes']['owner']['username']"
            />
          </div>
          <div class="info">
            <span>Owner</span>
            <h6>
              <router-link
                :to="`/author/${collectible['attributes']['owner']['username']}`"
              >
                {{
                  collectible["attributes"]["owner"]["username"].length > 10
                    ? collectible["attributes"]["owner"]["username"].slice(
                        0,
                        4
                      ) +
                      "..." +
                      collectible["attributes"]["owner"]["username"].slice(-4)
                    : collectible["attributes"]["owner"]["username"]
                }}
              </router-link>
            </h6>
          </div>
        </div>
        <div class="price">
          <span>Token ID</span>
          <h5># {{ collectible["attributes"]["itemId"] }}</h5>
        </div>
      </div>
      <div
        class="card-bottom"
        :class="`active`"
        v-if="
          authorized &&
          isStarted &&
          collectible['attributes']['details']['auction'] &&
          startTimestamp &&
          endTimestamp
        "
      >
        <button
          class="sc-button style bag fl-button pri-3 no-bg"
          v-if="collectible['attributes']['details']['auction']"
          @click.prevent="placeBid"
        >
          <span>Place Bid</span>
        </button>

        <router-link
          to="#"
          class="view-history reload"
          @click.prevent="loadHistory"
          >Load history</router-link
        >
      </div>
      <div
        class="card-bottom"
        :class="`active`"
        v-if="authorized && !collectible['attributes']['details']['auction']"
      >
        <button
          class="sc-button style bag fl-button pri-3 no-bg"
          @click.prevent="buyCollectible"
        >
          <span>Buy</span>
        </button>

        <router-link
          to="#"
          class="view-history reload"
          @click.prevent="loadHistory"
          >Load history</router-link
        >
      </div>
    </div>
  </div>
</template>
