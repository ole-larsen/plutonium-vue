<script lang="ts" setup>
import { ref } from "vue"
const props = defineProps(["data"]);
const visible = ref(false);
const value = ref(0);
function toggle() {
  visible.value = !visible.value;
}

function select(option: any) {
  value.value = option;
}

</script>
<template>
    <div class="aselect" :data-value="value" :data-list="data" >
        <div class="selector" @click="toggle()">
            <div class="label">
                    <span>{{ value }}</span>
            </div>
            <div class="arrow" :class="{ expanded : visible }"></div>
            <div :class="{ hidden : !visible, visible }">
                <ul>
                    <li :class="{ current : item === value }" v-for="item in data" :key="item.id" @click="select(item)">{{ item }}</li>
                    <dropdown v-bind:data="data"></dropdown>
                </ul>
            </div>
        </div>
    </div>
</template>
