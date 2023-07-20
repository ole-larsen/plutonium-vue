<template>
  <CModal :visible="show" @close="$emit('close')" scrollable size="lg">
    <CModalHeader>
      <CModalTitle>Edit tag {{ tag.title }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm class="text-left">
        <CFormSelect
          v-model="tag.parent_id"
          aria-label="Select parent tag"
          :options="tagsOptions">
        </CFormSelect>
        <br/>
        <label class="form-label" for="blog_id">Blogs</label>
        <Multiselect
          groupOptions="Select blogs"
          :searchable="true"
          mode="tags"
          v-model="tag.blog_id"
          :options="blogsOptions"
        />
        <br/>
        <br/>
        <label class="form-label" for="blog_id">Pages</label>
        <Multiselect
          groupOptions="Select pages"
          :searchable="true"
          mode="tags"
          v-model="tag.page_id"
          :options="pagesOptions"
        />
        <br/>
        <CFormInput
          v-model="tag.provider"
          id="provider"
          type="text"
          label="Provider"
          placeholder="tag provider"
          aria-describedby="provider"
        />
        <br/>
        <CFormInput
          v-model="tag.title"
          id="title"
          type="text"
          label="Title"
          placeholder="tag title"
          aria-describedby="title"
        />
        <br/>
        <CFormInput
          v-model="tag.slug"
          id="slug"
          type="text"
          label="Slug"
          placeholder="slug"
          aria-describedby="slug"
        />
        <br/>
        <CFormCheck
          v-model="tag.enabled"
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
      <CButton color="primary" type="submit" @click.prevent="$emit('save', tag)">{{ tag.id ? 'Update' : 'Create' }}</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import {toRefs, ref, onMounted, watch} from "vue";
import {useTagsStore} from "@/stores/dashboard/tags";
import {useBlogsStore} from "@/stores/dashboard/blogs";
import {usePagesStore} from "@/stores/dashboard/pages";

export default {
  name: "TagsTableModal",
  components: {
    Multiselect,
  },
  emits: ["close", "save"],
  props: ["show", "tag"],
  setup(props) {
    const store = useTagsStore();
    const blogStore = useBlogsStore();
    const pageStore = usePagesStore();
    const { show, tag } = toRefs(props);

    const tagsOptions = ref([
      "Select parent tag"
    ]);

    const blogsOptions = ref([]);

    const pagesOptions = ref([]);
    
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
      if (store.tags.length === 0) {
        await store.load();
      }

      if (blogStore.blogs.length === 0) {
        await blogStore.load();
      }

      if (pageStore.pages.length === 0) {
        await pageStore.load();
      }

      const _tags = store
        .tags
        .map((tag) => {
          if (tag) {
            return {
              value: tag.id,
              label: tag.parent_id ? `- ${tag.title}` : `${tag.title}`
            }
          }
        });
      tagsOptions.value.push(..._tags);

      const _blogs = blogStore.blogs.map((blog) => {
        if (blog) {
          return {
            value: blog.id,
            label: blog.title
          }
        }
      });
      blogsOptions.value.push(..._blogs);

      const _pages = pageStore.pages.map((page) => {
        if (page) {
          return {
            value: page.id,
            label: page.title
          }
        }
      });
      pagesOptions.value.push(..._pages);
      await store.load();
      store.tags.forEach(t => {
        if (t.page_id.length > 0) {
          console.log(t.title, t.page_id);
        }
        if (t.blog_id.length > 0) {
          console.log(t.title, t.blog_id);
        }
      });
    });

    watch(
      () => store.tag.title,
      (title) => {
        store.tag.slug = slugify(title);
        // Note: `newValue` will be equal to `oldValue` here
        // *unless* state.someObject has been replaced
      },
      { deep: true }
    )

    return {
      show,
      tag,
      tagsOptions,
      blogsOptions,
      pagesOptions,
      slugify
    }
  },
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>