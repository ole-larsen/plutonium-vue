<template>
  <CModal :visible="show" @close="$emit('close')" scrollable size="lg">
    <CModalHeader>
      <CModalTitle>Edit File {{ file.name }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm class="text-left files-container_form">
        <CRow>
          <CCol xs>
            <div class="form-group" v-if="show && file.blob && file.type && file.type.substr(0, 6) === 'image/'">
              <label>Image</label>
              <div class="edit-image">
                <img :src="file.blob" ref="editImage" />
              </div>
            </div>
            <div class="edit-image-tool" v-if="file.cropper">
              <CButtonGroup role="group" aria-label="Cropper1">
                <CButton color="primary" @click="file.cropper.rotate(-90)"
                         title="cropper.rotate(-90)">
                  <CIcon :icon="cilActionRedo" size="xl"/>
                </CButton>
                <CButton color="primary" @click="file.cropper.rotate(90)"
                         title="cropper.rotate(90)">
                  <CIcon :icon="cilActionUndo" size="xl"/>
                </CButton>
              </CButtonGroup>
              <CButtonGroup role="group" aria-label="Cropper">
                <CButton color="primary"
                         @click="file.cropper.crop()"
                         title="cropper.crop()">
                  <CIcon :icon="cilCrop" size="xl"/>
                </CButton>
                <CButton class="btn btn-primary"
                         @click="file.cropper.clear()"
                         title="cropper.clear()">
                  <CIcon :icon="cilDelete" size="xl"/>
                </CButton>
              </CButtonGroup>
            </div>
          </CCol>
          <CCol xs>
            <CCard>
              <CCardBody class="image-description">
                <CRow :xs="{ gutter: 2 }">
                  <CCol :xs="{ span: 6 }">
                    <div class="p-1 border bg-light">
                      <p>SIZE</p>
                      <p>{{ file.size }}</p>
                    </div>
                  </CCol>
                  <CCol :xs="{ span: 6 }">
                    <div class="p-1 border bg-light">
                      <p>DATE</p>
                      <p>-</p>
                    </div>
                  </CCol>
                  <CCol :xs="{ span: 6 }">
                    <div class="p-1 border bg-light">
                      <p>DIMENSIONS</p>
                      <p>{{ file.width }}X{{ file.height }}</p>
                    </div>
                  </CCol>
                  <CCol :xs="{ span: 6 }">
                    <div class="p-1 border bg-light">
                      <p>EXTENSION</p>
                      <p>{{ file.ext }}</p>
                    </div>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            <CFormInput
              v-model="file.name"
              id="name"
              type="text"
              label="Name"
              placeholder="Please enter a file name"
              aria-describedby="name"
            />
            <br/>
            <CFormInput
              v-model="file.alt"
              id="alt"
              type="text"
              label="Alternative Text"
              placeholder="Please enter alternative text"
              aria-describedby="alternative text"
            />
            <br/>
            <CFormInput
              v-model="file.caption"
              id="caption"
              type="text"
              label="Caption"
              placeholder="Please enter a caption"
              aria-describedby="caption"
            />
            <br/>
            <CFormInput
              v-model="file.provider"
              id="provider"
              type="text"
              label="Provider"
              placeholder="Chapter provider"
              aria-describedby="provider"
            />
            <br/>
            <CFormInput
              v-model="file.type"
              id="mime"
              type="text"
              label="MIME"
              placeholder="MIME"
              aria-describedby="type"
            />
            <br/>
            <CFormInput
              v-model="file.ext"
              id="ext"
              type="text"
              label="Extension"
              placeholder=".ext"
              aria-describedby="ext"
            />
          </CCol>
        </CRow>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="$emit('close')">
        Close
      </CButton>
      <CButton color="primary" type="submit" @click.prevent="$emit('save')">Save changes</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>

import {toRefs, ref, onMounted, toRaw, getCurrentInstance, nextTick, watch} from "vue";
import { cilActionRedo, cilActionUndo, cilCrop, cilDelete } from "@coreui/icons";
import Cropper from "cropperjs";

export default {
  name: "FilesUploadTableModal",
  emits: ["watchShow", "close", "save"],
  props: ["show", "file"],
  setup(props, { emit }) {
    const refs = getCurrentInstance();
    const { show, file } = toRefs(props);
    const editImage = ref();

    onMounted(async () => {
      editImage.value = toRaw(refs.ctx.$refs.editImage);
    });

    watch(show, async (trigger) => {
      if (trigger) {
        await nextTick(() => {
          emit("watchShow", editImage)
        });
      }
    });

    return {
      editImage,
      show,
      file,
      cilActionRedo,
      cilActionUndo,
      cilCrop,
      cilDelete,
    }
  },
}
</script>
<style>
.edit-image img {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>