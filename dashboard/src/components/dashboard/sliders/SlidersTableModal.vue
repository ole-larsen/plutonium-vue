<template>
  <CModal :visible="show" @close="$emit('close')" scrollable size="lg">
    <CModalHeader>
      <CModalTitle>Edit Slider {{ slider.title }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm class="text-left">
        <CFormInput
          v-model="slider.title"
          id="title"
          type="text"
          label="Title"
          placeholder="Please enter slider title"
          aria-describedby="title"
        />
        <br/>
        <label class="form-label" for="provider">Provider</label>
        <CFormInput
          v-model="slider.provider"
          id="provider"
          type="text"
          placeholder="Please enter slider provider"
          aria-describedby="provider"
        />
        <br/>
        <label class="form-label" for="description">Description</label>
        <QuillEditor theme="snow" v-if="slider && Object.keys(slider).includes('description')"
                     v-model:content="slider.description"
                     id="description"
                     contentType="html"
                     placeholder="Please enter Description"
                     toolbar="full"></QuillEditor>
        <br/>
        <CFormCheck
          v-model="slider.enabled"
          id="enabled"
          label="Enabled"
          indeterminate />
        <br/>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="$emit('close')">
        Close
      </CButton>
      <CButton color="primary" type="submit" @click.prevent="$emit('save', slider)">{{ slider.id ? 'Update' : 'Create' }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>

import {toRefs, watch} from "vue";

export default {
  name: "SlidersTableModal",
  emits: ["close", "save"],
  props: ["show", "slider"],
  setup(props) {
    const { show, slider } = toRefs(props);

    return {
      show,
      slider
    }
  },
}
</script>