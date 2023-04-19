<script lang="ts" setup>
import {onMounted, ref, toRefs} from "vue";
const props = defineProps(["starttime", "endtime", "trans"]);
const {starttime, endtime, trans} = toRefs(props);
const timer = ref(""),
  start = ref(0),
  end = ref(0),
  interval = ref(0),
  days = ref(0),
  minutes = ref(0),
  hours = ref(0),
  seconds = ref(0),
  statusType = ref("active");

const calcTime = (dist: number) => {
  // Time calculations for days, hours, minutes and seconds
  days.value = Math.floor(dist / (1000 * 60 * 60 * 24));
  hours.value = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes.value = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
  seconds.value = Math.floor((dist % (1000 * 60)) / 1000);
}

const timerCount = (_start: number, _end: number) => {
  // Get todays date and time
  const now = new Date().getTime();

  // Find the distance between now an the count down date
  const distance = _start - now;
  const passTime = _end - now;

  if (distance < 0 && passTime < 0) {
    statusType.value = "expired";

    //this.statusText = this.wordString.status.expired;
    clearInterval(interval.value);
  }
  if (distance < 0 && passTime > 0) {
    calcTime(passTime);
    statusType.value = "running";
  }
  if (distance > 0 && passTime > 0) {
    calcTime(distance);
    statusType.value = "upcoming";
  }
}

onMounted(() => {
  start.value = new Date(starttime?.value).getTime();
  end.value = new Date(endtime?.value).getTime();
  // Update the count down every 1 second
  timerCount(start.value, end.value);
  // @ts-ignore
  interval.value = setInterval(() => {
    timerCount(start.value, end.value);
  }, 1000);
});

</script>
<template>
  <span v-show ="statusType !== 'expired'">
    <span class="day">
      <span class="number">{{ days }} : </span>
    </span>
    <span class="hour">
      <span class="number">{{ hours }} : </span>
    </span>
    <span class="min">
      <span class="number">{{ minutes }} : </span>
    </span>
    <span class="sec">
      <span class="number">{{ seconds }}</span>
    </span>
  </span>
</template>

