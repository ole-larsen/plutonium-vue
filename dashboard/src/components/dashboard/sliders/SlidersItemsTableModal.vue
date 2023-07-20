<template>
  <CModal :visible="show" @close="$emit('close')" scrollable size="lg">
    <CModalHeader>
      <CModalTitle>Edit Slider Item</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm class="text-left">
        <br/>
        <label class="form-label" for="heading">Heading</label>
        <QuillEditor theme="snow" v-if="item && Object.keys(item).includes('heading')"
                     v-model:content="item.heading"
                     id="heading"
                     contentType="html"
                     placeholder="Please enter Heading"
                     toolbar="full"
                     :modules="modules"
                     ></QuillEditor>
        <br/>
        <label class="form-label" for="description">Description</label>
        <QuillEditor theme="snow" v-if="item && Object.keys(item).includes('description')"
                     v-model:content="item.description"
                     id="description"
                     contentType="html"
                     placeholder="Please enter Description"
                     :modules="modules"
                     toolbar="full"></QuillEditor>
        <br/>
        <CFormSelect
          v-model="item.slider_id"
          aria-label="Select Slider"
          :options="slidersOptions">
        </CFormSelect>
        <br/>
        <label class="form-label" for="btnLink1">Button 1</label>
        <CFormInput
          v-model="item.btn_link_1"
          id="btnLink1"
          type="text"
          label="Button 1 Link"
          placeholder="link for button 1"
          aria-describedby="btnLink1"
        />
        <br/>
        <CFormInput
          v-model="item.btn_text_1"
          id="btnText1"
          type="text"
          label="Button 1 Text"
          placeholder="text for button 1"
          aria-describedby="btnText1"
        />
        <br/>
        <label class="form-label" for="btnLink2">Button 2</label>
        <CFormInput
          v-model="item.btn_link_2"
          id="btnLink2"
          type="text"
          label="Button 2 Link"
          placeholder="link for button 2"
          aria-describedby="btnLink2"
        />
        <br/>
        <CFormInput
          v-model="item.btn_text_2"
          id="btnText2"
          type="text"
          label="Button 2 Text"
          placeholder="text for button 2"
          aria-describedby="btnText2"
        />
        <br/>
        <label class="form-label" for="image_id">Slider Image</label>
        <CFormSelect
          v-model="item.image_id"
          aria-label="Select Image"
          :options="filesOptions">
        </CFormSelect>
        <br/>
        <br/>
        <label class="form-label" for="bg_image_id">Slider Background Image</label>
        <CFormSelect
          v-model="item.bg_image_id"
          aria-label="Select Image"
          :options="filesOptions">
        </CFormSelect>
        <br/>
        <CFormCheck
          v-model="item.enabled"
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
      <CButton color="primary" type="submit" @click.prevent="$emit('save', item)">{{ item.id ? 'Update' : 'Create' }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>

import {toRefs, ref, onMounted} from "vue";
import {useSliderStore} from "@/stores/dashboard/sliders";
import {useFilesStore} from "@/stores/dashboard/files";
import {useQuillStore} from "@/stores/dashboard/quill";

export default {
  name: "SlidersItemsTableModal",
  emits: ["close", "save"],
  props: ["show", "item"],
  setup(props) {
    const store = useSliderStore();
    const fileStore = useFilesStore();
    const { show, item } = toRefs(props);
    const slidersOptions = ref([
      "Select slider"
    ]);
    const filesOptions = ref([
      "Select image"
    ]);

    onMounted(async () => {
      if (store.sliders.length === 0) {
        await store.load();
      }
      const sliders = store.sliders.map((_slider) => {
        return {
          value: String(_slider.id),
          label: _slider.title
        }
      });
      if (fileStore.files.length === 0) {
        await fileStore.load();
      }
      const images = fileStore
        .files
        .filter((_file) => _file.provider === "slider")
        .map((_file) => {
          return {
            value: String(_file.id),
            label: _file.name
          }
        });
      slidersOptions.value.push(...sliders);
      filesOptions.value.push(...images);
    });


    return {
      show,
      item,
      slidersOptions,
      filesOptions,
      modules: useQuillStore().setupImageUploader("slider")
    }
  },
}
</script>