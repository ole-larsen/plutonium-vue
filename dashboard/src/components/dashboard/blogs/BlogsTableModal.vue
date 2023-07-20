<template>
  <COffcanvas placement="top" :backdrop="false" :scroll="true" :visible="show" @hide="$emit('close')">
    <div class="blog-top-canvas">
      <COffcanvasHeader>
        <COffcanvasTitle>Edit Blog</COffcanvasTitle>
        <CCloseButton class="text-reset" @click="$emit('close')"/>
      </COffcanvasHeader>
      <COffcanvasBody>
        <CForm class="text-left">
          <CContainer>
            <CCard class="full-height">
              <CCardBody>
                <CRow>
                  <CCol md="4" sm="4" xs="12">
                    <div class="blog-top-canvas_img-thumb">
                      <img v-if="blog.image && blog.image.thumb" :src="blog.image.thumb">
                    </div>
                    <br/>
                    <CFormSelect
                      v-model="blog.image_id"
                      aria-label="Select Image"
                      :options="filesOptions">
                    </CFormSelect>
                  </CCol>
                  <CCol md="4" sm="4" xs="12">
                    <div class="blog-top-canvas_col">
                      <label class="form-label" for="category_id">Category</label>
                      <CFormSelect
                        v-model="blog.category_id"
                        aria-label="Select category"
                        :options="categoriesOptions">
                      </CFormSelect>

                      <CFormInput
                        v-model="blog.title"
                        id="title"
                        type="text"
                        label="Title"
                        placeholder="blog title"
                        aria-describedby="title"
                      />

                      <CFormInput
                        v-model="blog.slug"
                        id="slug"
                        type="text"
                        label="Slug"
                        placeholder="blog slug"
                        aria-describedby="slug"
                      />
                    </div>
                    <label class="form-label" for="tags">Tags</label>
                    <tags-input v-if="tags" :tags="tags" :blog-id="blog.id"/>
                  </CCol>

                  <CCol md="4" sm="4" xs="12">
                    <label class="form-label" for="author">Author</label>
                    <CFormSelect
                      v-model="blog.author_id"
                      aria-label="Select author"
                      :options="authorsOptions">
                    </CFormSelect>
                    <CFormInput
                      v-model="blog.public_date"
                      id="public_date"
                      type="text"
                      label="Public Date"
                      placeholder="publication date"
                      aria-describedby="public_date"
                    />
                    <CFormInput
                      v-model="blog.order_by"
                      id="order_by"
                      type="number"
                      label="Order BY"
                      placeholder="Order"
                      aria-describedby="order_by"
                    />
                    <br/>
                      <CFormCheck
                        v-model="blog.enabled"
                        id="enabled"
                        label="Enabled"
                        indeterminate />
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CContainer>

          <CContainer class="quill-wrapper">
            <CRow>
              <CCol md="3" sm="6" xs="12">
                <div class="blog-top-canvas_img-thumb">
                  <img v-if="blog.image1 && blog.image1.thumb" :src="blog.image1.thumb">
                </div>
                <br/>
                <CFormSelect
                  v-model="blog.image_1_id"
                  aria-label="Select Image"
                  :options="filesOptions">
                </CFormSelect>
              </CCol>
              <CCol md="9" sm="6" xs="12" class="quill-wrapper-editor">
                <label class="form-label" for="description">Description</label>
                <QuillEditor theme="snow" v-if="blog && Object.keys(blog).includes('description')"
                             v-model:content="blog.description"
                             id="description"
                             contentType="html"
                             placeholder="Please enter Description"
                             toolbar="full"></QuillEditor>
              </CCol>
            </CRow>
          </CContainer>
          <br/>
          <CContainer class="quill-wrapper">
            <CRow>
              <CCol md="3" sm="6" xs="12">
                <div class="blog-top-canvas_img-thumb">
                  <img v-if="blog.image1 && blog.image1.thumb" :src="blog.image1.thumb">
                </div>
                <br/>
                <CFormSelect
                  v-model="blog.image_1_id"
                  aria-label="Select Image"
                  :options="filesOptions">
                </CFormSelect>
              </CCol>

              <CCol md="9" sm="6" xs="12" class="quill-wrapper-editor">
                <label class="form-label" for="content">Content</label>
                <QuillEditor theme="snow"
                             v-if="blog && Object.keys(blog).includes('content')"
                             v-model:content="blog.content"
                             id="content"
                             contentType="html"
                             placeholder="Please enter content"
                             toolbar="full"/>
              </CCol>
            </CRow>
          </CContainer>
          <br/>
          <br/>
          <CContainer class="quill-wrapper">
            <CRow>
              <CCol md="3" sm="6" xs="12">
                <div class="blog-top-canvas_img-thumb">
                  <img v-if="blog.image2 && blog.image2.thumb" :src="blog.image2.thumb">
                </div>
                <br/>
                <CFormSelect
                  v-model="blog.image_2_id"
                  aria-label="Select Image"
                  :options="filesOptions">
                </CFormSelect>
              </CCol>

              <CCol md="9" sm="6" xs="12" class="quill-wrapper-editor">
                <label class="form-label" for="description_2">Description 2</label>
                <QuillEditor theme="snow"
                             v-if="blog && Object.keys(blog).includes('description_2')"
                             v-model:content="blog.description_2"
                             id="description_2"
                             contentType="html"
                             placeholder="Please enter Description 2"
                             toolbar="full"></QuillEditor>
              </CCol>
            </CRow>
          </CContainer>
          <br/>
          <CContainer class="quill-wrapper">
            <CRow>
              <CCol md="3" sm="6" xs="12">
                <div class="blog-top-canvas_img-thumb">
                  <img v-if="blog.image3 && blog.image3.thumb" :src="blog.image3.thumb">
                </div>
                <br/>
                <CFormSelect
                  v-model="blog.image_3_id"
                  aria-label="Select Image"
                  :options="filesOptions">
                </CFormSelect>
              </CCol>
              <CCol md="9" sm="6" xs="12" class="quill-wrapper-editor">
                <label class="form-label" for="description_2">Description 3</label>
                <QuillEditor theme="snow"
                             v-if="blog && Object.keys(blog).includes('description_3')"
                             v-model:content="blog.description_3"
                             id="description_3"
                             contentType="html"
                             placeholder="Please enter Description 3"
                             toolbar="full"></QuillEditor>
              </CCol>
            </CRow>
          </CContainer>
          <br/>
          <CContainer>
            <CCard class="full-height">
              <CCardBody>
                <CRow>

                  <CCol>
                    <CButton color="secondary" @click="$emit('close')">
                      Close
                    </CButton>
                    <CButton color="primary" type="submit" @click.prevent="$emit('save', blog)">{{ blog.id ? 'Update' : 'Create' }}</CButton>
                  </CCol>

                </CRow>
              </CCardBody>
            </CCard>
          </CContainer>
        </CForm>

      </COffcanvasBody>
    </div>
  </COffcanvas>
</template>

<script>

import {toRefs, ref, onMounted, computed, watch} from "vue";
import {useFilesStore} from "@/stores/dashboard/files";
import {useBlogsStore} from "@/stores/dashboard/blogs";
import {useAuthorsStore} from "@/stores/dashboard/authors";
import {useCategoriesStore} from "@/stores/dashboard/categories";
import {useTagsStore} from "@/stores/dashboard/tags";
import TagsInput from "@/components/dashboard/tags/TagsInput.vue";

export default {
  name: "BlogTableModal",
  components: {TagsInput},
  emits: ["close", "save"],
  props: ["show", "blog"],
  setup(props) {
    const store = useBlogsStore();
    const fileStore = useFilesStore();
    const authorStore = useAuthorsStore();
    const categoryStore = useCategoriesStore();
    const tagsStore = useTagsStore();

    const tags = computed(() => tagsStore.tags);

    const { show, blog } = toRefs(props);

    const filesOptions = ref([
      "Select image"
    ]);

    const authorsOptions = ref([
      "Select author"
    ]);

    const categoriesOptions = ref([
      "Select category"
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
      if (store.blogs.length === 0) {
        await store.load();
      }

      if (fileStore.files.length === 0) {
        await fileStore.load();
      }

      const images = fileStore
        .files
        .filter((_file) => _file.provider === "blog")
        .map((_file) => {
          if (_file) {
            return {
              value: _file.id,
              label: _file.name
            }
          }
        });
      filesOptions.value.push(...images);

      if (authorStore.authors.length === 0) {
        await authorStore.load();
      }

      const authors = authorStore
        .authors
        .map((_author) => {
          if (_author) {
            return {
              value: _author.id,
              label: _author.name
            }
          }
        });
      authorsOptions.value.push(...authors);

      if (categoryStore.categories.length === 0) {
        await categoryStore.load();
      }

      const categories = categoryStore
        .categories
        .filter((_category) => _category.provider === "blog")
        .map((_category) => {
          if (_category) {
            return {
              value: _category.id,
              label: _category.title
            }
          }
        });

      categoriesOptions.value.push(...categories);

      if (tags.value.length === 0) {
        await tagsStore.load();
      }
    });
    watch(
      () => store.blog.title,
      (name) => {
        store.blog.slug = slugify(name);
        // Note: `newValue` will be equal to `oldValue` here
        // *unless* state.someObject has been replaced
      },
      { deep: true }
    )
    return {
      show,
      blog,
      filesOptions,
      authorsOptions,
      categoriesOptions,
      tags
    }
  },
}
</script>