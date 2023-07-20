<template>
  <CModal :visible="show" @close="$emit('close')" scrollable size="lg">
    <CModalHeader>
      <CModalTitle>Edit author {{ author.heading }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm class="text-left">
        <CFormInput
          v-model="author.title"
          id="title"
          type="text"
          label="Title"
          placeholder="author title"
          aria-describedby="title"
        />
        <br/>
        <QuillEditor theme="snow" v-if="author && Object.keys(author).includes('description')"
                     v-model:content="author.description"
                     id="description"
                     contentType="html"
                     placeholder="Please enter Description"
                     toolbar="full"></QuillEditor>
        <br/>
        <CRow>
          <CCol xs>
            <CFormInput
              v-model="author.name"
              id="name"
              type="text"
              label="Name"
              placeholder="author name"
              aria-describedby="name"
            />
            <br/>
            <CFormInput
              v-model="author.slug"
              id="slug"
              type="text"
              label="Slug"
              placeholder="author slug"
              aria-describedby="slug"
            />
            <br/>
            <CFormInput
              v-model="author.btn_link"
              id="btnLink"
              type="text"
              label="Button Link"
              placeholder="link for button"
              aria-describedby="btnLink"
            />
            <br/>
            <CFormInput
              v-model="author.btn_text"
              id="btnText"
              type="text"
              label="Button Text"
              placeholder="text for button"
              aria-describedby="btnText"
            />
            <br/>
            <CFormInput
              v-model="author.order_by"
              id="order_by"
              type="number"
              label="Order"
              placeholder="author order"
              aria-describedby="order_by"
            />
            <br/>
            <CFormCheck
              v-model="author.enabled"
              id="enabled"
              label="Enabled"
              indeterminate />
          </CCol>
          <CCol xs>
            <label class="form-label" for="name">Author Image</label>
            <CFormSelect
              v-model="author.image_id"
              aria-label="Select Image"
              :options="filesOptions">
            </CFormSelect>
            <br/>
            <div v-if="author.image_url" class="author-thumb">
              <img :src="author.image_url">
            </div>
          </CCol>
        </CRow>
        <hr/>
        <CRow>
          <CCol>
            <authors-socials :socials="author.socials" @save="addSocials"/>
            <br/>
          </CCol>
        </CRow>
        <hr/>
        <CRow>
          <CCol>
            <authors-wallets :wallets="author.wallets" @save="addWallets"/>
            <br/>
          </CCol>
        </CRow>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="$emit('close')">
        Close
      </CButton>
      <CButton color="primary" type="submit" @click.prevent="$emit('save', author)">{{ author.id ? 'Update' : 'Create' }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>

import {toRefs, ref, onMounted, watch} from "vue";
import {useFilesStore} from "@/stores/dashboard/files";
import {useAuthorsStore} from "@/stores/dashboard/authors";

import AuthorsSocials from "@/components/dashboard/authors/AuthorSocials.vue";
import AuthorsWallets from "@/components/dashboard/authors/AuthorWallets.vue";

export default {
  name: "AuthorsTableModal",
  components: {AuthorsWallets, AuthorsSocials},
  emits: ["close", "save"],
  props: ["show", "author"],
  setup(props) {
    const store = useAuthorsStore();
    const fileStore = useFilesStore();
    const { show, author } = toRefs(props);

    const filesOptions = ref([
      "Select image"
    ]);

    const slugify = (str) =>
      str
        ? str
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "")
        : "";

    onMounted(async () => {
      if (store.authors.length === 0) {
        await store.load();
      }

      if (fileStore.files.length === 0) {
        await fileStore.load();
      }

      const images = fileStore
        .files
        .filter((_file) => _file.provider === "author")
        .map((_file) => {
          return {
            value: _file.id,
            label: _file.name
          }
        });
      filesOptions.value.push(...images);
    });
    watch(
      () => store.author.name,
      (name) => {
        store.author.slug = slugify(name);
        // Note: `newValue` will be equal to `oldValue` here
        // *unless* state.someObject has been replaced
      },
      { deep: true }
    )
    return {
      show,
      author,
      filesOptions,
      addSocials(social, socials) {
        store.addSocials(social, socials);
      },
      addWallets(wallet, wallets) {
        store.addWallets(wallet, wallets);
      }
    }
  },
}
</script>