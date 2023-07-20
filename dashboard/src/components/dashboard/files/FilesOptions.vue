<template>
  <div class="option" v-show="isOption">
    <CFormInput
      v-model="options.accept"
      id="accept"
      type="text"
      label="Accept"
      placeholder="image/png,image/gif,image/jpeg,image/webp"
      text="Allow upload mime type"
      aria-describedby="accept"
    />
    <br/>
    <CFormInput
      v-model="options.extensions"
      id="extensions"
      type="text"
      label="Extensions"
      placeholder="gif,jpg,jpeg,png,webp"
      text="Allow upload file extension"
      aria-describedby="extensions"
    />
    <br/>
    <label class="form-label" for="put-action">PUT Upload</label>
    <CFormCheck type="radio"
                v-model="options.putAction"
                name="put-action" id="put-action1" value="/upload/put" label="On" checked/>
    <CFormCheck type="radio"
                v-model="options.putAction"
                name="put-action" id="put-action2" value="" label="Off"/>
    <small class="form-text text-muted">After the shutdown, use the POST method to upload</small>
    <br/>
    <CFormInput
      v-model="options.thread"
      id="thread"
      type="number"
      label="Thread"
      max="5" min="1"
      text="Also upload the number of files at the same time (number of threads)"
      aria-describedby="thread"
    />
    <br/>
    <CFormInput
      v-model="options.size"
      id="size"
      type="number"
      label="Max Size"
      text="Allowed file size"
      aria-describedby="size"
    />
    <br/>
    <CFormInput
      v-model="options.minSize"
      id="minSize"
      type="number"
      label="Min Size"
      min="0"
      text="Min file size"
      aria-describedby="minSize"
    />
    <br/>

    <CFormInput
      v-model="options.autoCompress"
      id="autoCompress"
      type="number"
      label="Automatically compress"
      min="0"
      text="Set up automatic compression"
      aria-describedby="minSize"
    />
    <br/>
    <CFormCheck
      id="add-index" label="Start position to add"
      v-model="options.addIndex"
      text="Add a file list to start the location to add"/>
    <CFormCheck
      id="drop" label="Drop"
      v-model="options.drop"
      text="Drag and drop upload"/>
    <CFormCheck
      id="drop-directory" label="Drop Directory"
      v-model="options.dropDirectory"
      text="Not checked, filter the dragged folder"/>
    <CFormCheck
      id="create-directory" label="Create Directory"
      v-model="options.createDirectory"
      text="The directory file will send an upload request"/>
    <CFormCheck
      id="upload-auto" label="Auto Start"
      v-model="options.uploadAuto"
      text="Automatically activate upload"/>
    <CButton color="primary" @click="isOption = !isOption">Confirm</CButton>
  </div>
</template>

<script>

import {useFilesStore} from "@/stores/dashboard/files";
import {onMounted, toRaw, ref} from "vue";

export default {
  name: "FilesOptions",
  setup() {
    const props = defineProps(["isOption", "options"]);
    return {
      isOption,
      options
    }
  },
}
</script>
