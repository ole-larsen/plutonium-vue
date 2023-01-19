<script lang="ts" setup>
import {onMounted, ref, toRefs, watch} from "vue";
import { useCookies } from "vue3-cookies";

const emit = defineEmits([
  "submit"
]);

const props = defineProps(["csrf", "heading", "subHeading"]);

const NAME_REQUIRED = "name is required",
  EMAIL_REQUIRED = "email is required",
  SUBJECT_REQUIRED = "subject is required",
  MESSAGE_REQUIRED = "message is required";

const disabled = ref(false);
const sent = ref(false);
const { csrf, heading, subHeading } = toRefs(props);

const form = ref({
  provider: "contact-us",
  name: "",
  email: "",
  subject: 0,
  subjectItems: [
    {label: "Troubleshooting", value: 1},
    {label: "Marketing", value: 2},
    {label: "Developers", value: 3}
  ],
  csrf: csrf?.value,
  message: ""
});

const { cookies } = useCookies();

const errors = ref({
  name: "",
  email: "",
  subject: "",
  message: ""
});

onMounted(() => {
  const csrf = cookies.get("_csrf");
  if (csrf) {
    form.value.csrf = csrf;
  }
});
watch(
  () => form.value,
  (form) => {
    if (form.name !== "" && errors.value.name !== "") {
      errors.value.name = "";
      disabled.value = false;
    }
    if (form.email !== "" && errors.value.email !== "") {
      errors.value.email = "";
      disabled.value = false;
    }
    if (form.subject !== 0 && errors.value.subject !== "") {
      errors.value.subject = "";
      disabled.value = false;
    }
    if (form.message !== "" && errors.value.message !== "") {
      errors.value.message = "";
      disabled.value = false;
    }
  },
  { deep: true }
)
const validate = () => {
  if (form.value.name === "") {
    errors.value.name = NAME_REQUIRED;
    return false;
  }
  if (form.value.email === "") {
    errors.value.email = EMAIL_REQUIRED;
    return false;
  }
  if (form.value.subject === 0) {
    errors.value.subject = SUBJECT_REQUIRED;
    return false;
  }
  if (form.value.message === "") {
    errors.value.message = MESSAGE_REQUIRED;
    return false;
  }
  return true;
}

async function submit() {
  disabled.value = true;
  if (validate()) {
    emit("submit", form.value);
    disabled.value = false;
    sent.value = true;
  }
}
</script>
<template>
  <div  v-if="sent === false">
    <form id="contactform"  class="form-submit contact-form" >
      <h2 class="tf-title-heading style-2 mg-bt-12" v-if="heading" v-html="heading"></h2>
      <h5 class="sub-title style-1" v-if="subHeading" v-html="subHeading"></h5>
      <input type="hidden" name="csrf" :value="form.csrf"/>
      <label class="contact-form_name error" v-if="errors.name" v-html="errors.name"></label>
      <input id="name" name="name" tabIndex="1" aria-required="true" type="text"
             placeholder="Your Full Name" v-model="form.name" required/>

      <label class="contact-form_email error" v-if="errors.email" v-html="errors.email"></label>
      <input id="email" name="email" tabIndex="2"  aria-required="true" type="email"
             placeholder="Your Email Address" v-model="form.email" required />

      <div class="row-form style-2">
        <label class="contact-form_subject error" v-if="errors.subject" v-html="errors.subject"></label>
        <select id="subject" v-model="form.subject">
          <option v-for="item in form.subjectItems" :value="item.value" v-html="item.label" />
        </select>
        <i class="icon-fl-down"></i>
      </div>
      <label class="contact-form_message error" v-if="errors.message" v-html="errors.message"></label>
      <textarea id="message" name="message" tabIndex="3" aria-required="true" required
                placeholder="Message" v-model="form.message"></textarea>
      <button class="submit" @click.prevent="submit" :disabled="disabled">Send message</button>
    </form>
  </div>
  <h2 v-if="sent">Thank you! We will get in touch with you soon</h2>
</template>

