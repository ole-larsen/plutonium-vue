<template>
  <CForm class="text-left">
    <label class="form-label" for="name">Socials</label>
    <cRow v-for="_social in socials">
      <cCol>
        <br/>
        <CFormInput
          v-model="_social.name"
          type="text"
          label="Name"
          placeholder="Social Network Name"
          aria-describedby="social_name"
        />
      </cCol>
      <cCol>
        <br/>
        <CFormInput v-if="_social.name"
          v-model="_social.link"
          type="text"
          label="Link"
          placeholder="Social Network Link"
          aria-describedby="social_link"
        />
      </cCol>
      <cCol>
        <br/>
        <CFormInput v-if="_social.name"
                    v-model="_social.icon"
                    type="text"
                    label="Icon"
                    placeholder="Social Network Icon"
                    aria-describedby="social_icon"
        />
      </cCol>
    </cRow>
    <br/>
    <cRow>
      <cCol>
        <CFormInput
          v-model="social.name"
          id="social_name"
          type="text"
          label="Name"
          placeholder="Social Network Name"
          aria-describedby="social_name"
        />
      </cCol>
      <cCol>
        <CFormInput v-if="social.name"
          v-model="social.link"
          id="social_link"
          type="text"
          label="Link"
          placeholder="Social Network Link"
          aria-describedby="social_link"
        />
      </cCol>
      <cCol>
        <CFormInput v-if="social.name"
                    v-model="social.icon"
                    id="social_icon"
                    type="text"
                    label="Icon"
                    placeholder="Social Network Icon"
                    aria-describedby="social_icon"
        />
      </cCol>
    </cRow>
    <hr/>
    <CButton color="primary" type="submit" @click.prevent="submit">Add network</CButton>
  </CForm>
</template>

<script>

import {toRefs, ref} from "vue";

export default {
  name: "AuthorsSocials",
  props: ["socials"],
  events: ["save"],
  setup(props, { emit }) {
    const { socials } = toRefs(props);
    const social = ref({
      link: "",
      name: "",
      icon: ""
    })
    return {
      social,
      socials,
      submit() {
        emit("save", social.value, socials.value);
        social.value = {
          link: "",
          name: "",
          icon: ""
        };
      }
    }
  },
}
</script>