<template>
  <CCard>
    <CCardBody>
      <CRow>
        <CCol :sm="12" :md="12">
          <CCard class="full-height">
            <CCardBody class="files-container">
              <CCardTitle>
                <file-upload
                  class="btn btn-dark"
                  :post-action="options.postAction"
                  :put-action="options.putAction"
                  :extensions="options.extensions"
                  :accept="options.accept"
                  :multiple="false"
                  :directory="options.directory"
                  :create-directory="options.createDirectory"
                  :size="options.size || 0"
                  :thread="options.thread < 1 ? 1 : (options.thread > 5 ? 5 : options.thread)"
                  :headers="options.headers"
                  :drop="options.drop"
                  :drop-directory="options.dropDirectory"
                  :add-index="options.addIndex"
                  v-model="filesForUpload"
                  @input-filter="inputFilter"
                  @input-file="inputFile"
                  ref="upload">
                    <CIcon :content="cilPlus" size="sm"/> File Manager
                </file-upload>
              </CCardTitle>

              <CCardText>
                <template v-if="filesForUpload.length > 0 && imageReady">
                  <br/>
                  <br/>
                  <files-upload-table
                    :files="filesForUpload"
                    @edit="edit"
                    @remove="remove"
                    @uploadFile="uploadFile"/>
                </template>

                <files-table
                  :files="files"
                  @edit="edit"
                  @remove="remove"
                  @uploadFile="uploadFile"
                />

                <files-upload-table-modal
                  :file="fileForEdit"
                  :show="show"
                  @close="close"
                  @save="save"
                  @watchShow="watchShow" />
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>

<script>

import {computed, ref, getCurrentInstance, onMounted, toRaw, watch} from "vue";
import ImageCompressor from "@xkeshi/image-compressor";
import VueUploadComponent from "vue-upload-component";
import FilesUploadTable from "@/components/dashboard/files/FilesUploadTable.vue";
import { cilPlus, cilActionRedo, cilActionUndo, cilCrop, cilDelete } from "@coreui/icons";
import Cropper from "cropperjs";
import FilesUploadTableModal from "@/components/dashboard/files/FilesUploadTableModal.vue";
import FilesTable from "@/components/dashboard/files/FilesTable.vue";
import {useFilesStore} from "@/stores/dashboard/files";

export default {
  name: "FilesUpload",
  components: {
    FilesUploadTableModal,
    FileUpload: VueUploadComponent,
    FilesUploadTable,
    FilesTable,
  },
  setup() {
    const store = useFilesStore();
    const options = computed(() => store.options);
    const show = ref(false);
    const
      refs = getCurrentInstance(),
      filesForUpload = ref([]),
      files = ref([]),
      fileForEdit = ref(),
      editImage = ref(),
      upload = ref(),
      imageReady = ref(false);

    onMounted(async () => {
      upload.value = toRaw(refs.ctx.$refs.upload);
      editImage.value = toRaw(refs.ctx.$refs.editImage);
      const _files = await store.load();
      for (let i = 0; i < _files.length; i++) {
        const file = toRaw(_files[i]);
        file.thumb = import.meta.env.VITE_BACKEND_URL + file.thumb;
        file.status = "success";
        files.value.push(file);
      }
    });

    const compress = (file) => {
      file.error = "compressing";

      const imageCompressor = new ImageCompressor(null, {
        convertSize: 1024 * 1024,
        maxWidth: 512,
        maxHeight: 512,
      });

      return imageCompressor.compress(file.file);
    }
    const inputFilter = (newFile, oldFile, prevent) => {
      if (newFile && !oldFile) {
        // Before adding a file

        // Filter system files or hide files
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent();
        }

        // Filter php html js file
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent();
        }

        // Automatic compression
        if (newFile.file && !newFile.error && newFile.type.substr(0, 6) === "image/" &&
          options.value.autoCompress > 0 && options.value.autoCompress < newFile.size) {

          compress(newFile)
            .then((file) => {
              upload.value.update(newFile, {
                error: '',
                file: file,
                size: file.size,
                type: file.type,
                status: "compress"
              });
            })
            .catch((err) => {
              upload.value.update(newFile, { error: err.message || "compress", status: "error" });
            });
        }
      }
      if (newFile && !newFile.error && newFile.file && (!oldFile || newFile.file !== oldFile.file)) {
        // Create a blob field
        newFile.blob = "";
        const URL = (window.URL || window.webkitURL);
        if (URL) {
          newFile.blob = URL.createObjectURL(newFile.file);
        }

        // Thumbnails
        newFile.thumb = "";
        if (newFile.blob && newFile.type.substr(0, 6) === "image/") {
          newFile.thumb = newFile.blob;
          newFile.alt = newFile.name;
          if (newFile.type === "image/jpeg") {
            newFile.type = "image/jpg";
          }
          newFile.ext = `.${newFile.type.substr(6).split("+")[0]}`;
          newFile.caption = newFile.name;
          newFile.cropper = null;
          newFile.provider = "default";
          newFile.status = "preview created";
        }
      }
      // image size
      if (newFile && !newFile.error && newFile.type.substr(0, 6) === "image/" && newFile.blob &&
        (!oldFile || newFile.blob !== oldFile.blob)) {
        newFile.error = "image parsing";
        const img = new Image();
        img.onload = () => {
          upload.value.update(newFile, {
            error: "",
            height: img.height,
            width: img.width
          });
          imageReady.value = true;
        }
        img.οnerrοr = (err) => {
          upload.value.update(newFile, {
            error: err.message,
            status: "error"
          });
        }
        img.src = newFile.blob;
      }
    }
    return {
      options,
      filesForUpload,
      files,
      upload,
      show,
      fileForEdit,
      editImage,
      imageReady,
      cilActionRedo,
      cilActionUndo,
      cilCrop,
      cilDelete,
      cilPlus,
      uploadFile(file) {
        file.data =  {
          id:       file.id,
          name:     file.name,
          alt:      file.alt,
          ext:      file.ext,
          caption:  file.caption,
          provider: file.provider,
          type:     file.type,
          size:     file.size,
          width:    file.width,
          height:   file.height,
        }
        upload.value.update(file, {active: true, status: "success"});
        console.log("uploaded, reload page")
      },
      remove(file) {
        upload.value.remove(file)
      },
      inputFilter,
      inputFile(newFile, oldFile) {
        if (newFile && oldFile) {
          // update
          if (newFile.active && !oldFile.active) {
            // beforeSend
            // min size
            if (newFile.size >= 0 && options.value.minSize > 0 && newFile.size < options.value.minSize) {
              upload.value.update(newFile, { error: "size", status: "error" });
            }
          }
          if (newFile.progress !== oldFile.progress) {
            // progress
          }
          if (newFile.error && !oldFile.error) {
            // error
          }
          if (newFile.success && !oldFile.success) {
            // success
          }
        }

        if (!newFile && oldFile) {
          // remove
          if (oldFile.success && oldFile.response.id) {
            // $.ajax({
            //   type: 'DELETE',
            //   url: '/upload/delete?id=' + oldFile.response.id,
            // })
          }
        }
        // Automatically activate upload
        if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
          if (options.value.uploadAuto && !upload.value.active) {
            upload.value.update(newFile, { active: true });
          }
        }
      },
      edit(file) {
        if (!file.file) {
          fetch(file.thumb)
            .then(response => response.blob())
            .then(blob => {
              return new File([blob], file.name, {
                type: blob.type
              });
            })
            .then(async (_file) => {
              file.file = _file;
              // Create a blob field
              file.blob = "";
              const URL = (window.URL || window.webkitURL);
              if (URL) {
                file.blob = URL.createObjectURL(file.file);
              }
              fileForEdit.value = { ...file };
              show.value = true;
            })
            .catch(err => {
              console.error(err.message);
            });
        } else {
          fileForEdit.value = { ...file };
          show.value = true;
        }
      },
      watchShow(editImage) {
        const _fileForEdit = toRaw(fileForEdit.value);

        if (!show.value) return;
        if (!editImage.value) return;

        if (_fileForEdit.type !== "image/svg+xml") {
          const cropper = new Cropper(editImage.value, {
            autoCrop: false,
          });
          fileForEdit.value = {
            ..._fileForEdit,
            cropper
          }
        }
      },
      cancel(file) {
        // "file.active ? upload.update(file, {error: 'cancel'}) : false"
      },
      async save() {
        if (!isNaN(fileForEdit.value.id)) {
          const file = { ...fileForEdit.value };

          try {
            const _files = await useFilesStore().update({
              id: file.id,
              name: file.name,
              alt: file.alt,
              ext: file.ext,
              caption: file.caption,
              file: file.file,
              type: file.type,
              hash: file.hash,
              provider: file.provider,
              size: file.size,
              width: file.width,
              height: file.height
            });
            files.value = [];
            if (_files && _files.length) {
              for (let i = 0; i < _files.length; i++) {
                const _file = toRaw(_files[i]);
                _file.thumb = import.meta.env.VITE_BACKEND_URL + _file.thumb;
                _file.status = "success";
                if (file.id === _file.id) {
                  _file.status = "updated";
                }
                files.value.push(_file);
              }
            }
          } catch (err) {
            console.error(err)
          }
          show.value = false;
        }
        if (isNaN(fileForEdit.value.id)) {
          if (!upload.value.features.html5) {
            show.value = false;
            return;
          }

          if (fileForEdit.value.cropper) {
            const binStr = atob(fileForEdit.value.cropper.getCroppedCanvas().toDataURL(fileForEdit.value.type).split(",")[1]);

            const arr = new Uint8Array(binStr.length);

            for (let i = 0; i < binStr.length; i++) {
              arr[i] = binStr.charCodeAt(i);
            }

            fileForEdit.value.file = new File([arr], fileForEdit.value.name, {type: fileForEdit.value.type});
            fileForEdit.value.size = fileForEdit.value.file.size;
          }

          upload.value.update(fileForEdit.value.id, fileForEdit.value);

          filesForUpload.value
            .map((file) => {
              if (file.id === fileForEdit.value.id) {
                file.name = fileForEdit.value.name;
                file.alt = fileForEdit.value.alt;
                file.caption = fileForEdit.value.caption;
                file.provider = fileForEdit.value.provider;
                file.ext = fileForEdit.value.ext;
                file.status = "preview edited";
              }
            });

          show.value = false;
        }
      },
      close () {
        show.value = false;
        fileForEdit.value = {};
      }
    }
  },
}
</script>