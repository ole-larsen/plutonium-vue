<script lang="ts" setup>
import { ref } from "vue";
import Info from "./Info.vue";
import Provenance from "./Provenance.vue";
import BidHistory from "./BidHistory.vue";
const currentTab =  ref("BidHistory");
const tabs = ref(["BidHistory", "Info", "Provenance"]);

</script>
<template>
    <div class="tab">
        <div class="tab-menu">
            <span
            v-for="tab in tabs"
            :key="tab"
            :class="['tab-button', { active: currentTab === tab }]"
            @click="currentTab = tab"
            >
            {{ tab }}
            </span>
        </div>
	    <Component :is="currentTab" class="tab" />
    </div>
</template>

