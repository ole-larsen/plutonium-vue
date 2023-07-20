<template>
  <CCard class="full-height">
    <CCardBody class="blog-editor">
      <CCardTitle><CButton class="btn btn-primary" @click="create">Create blog</CButton></CCardTitle>
      <CCardText>
        <tags-input v-if="tags && tags.length" :tags="tags" />
      </CCardText>
    </CCardBody>
    <code>
    </code>
    <blogs-table
      :blogs="blogs"
      @edit="edit"
      @remove="remove"
    />
    <blogs-table-modal
      :blog="blog"
      :show="show"
      @close="close"
      @save="save"
    />
  </CCard>
</template>

<script>
import {computed} from "vue";
import BlogsTableModal from "@/components/dashboard/blogs/BlogsTableModal.vue";
import BlogsTable from "@/components/dashboard/blogs/BlogsTable.vue";
import {useBlogsStore} from "@/stores/dashboard/blogs";
import TagsInput from "@/components/dashboard/tags/TagsInput.vue";
import {useTagsStore} from "@/stores/dashboard/tags";

export default {
  name: "Blogs",
  components: {TagsInput, BlogsTableModal, BlogsTable},
  setup() {
    const store = useBlogsStore();
    const tags = computed(() => useTagsStore().tags);
    const show = computed(() => store.show);
    const blogs = computed(() => store.blogs);

    return {
      tags,
      show,
      blogs,
      blog: computed(() => store.blog),
      create() {
        store.toggleModal();
        store.new();
      },
      close() {
        store.toggleModal();
        store.new();
      },
      save(blog) {
        store.save(blog);
        store.toggleModal();
      },
      edit(blog) {
        if (blog.author_id) {
          blog.author_id = String(blog.author_id);
        }
        if (blog.category_id) {
          blog.category_id = String(blog.category_id);
        }
        if (blog.image_id) {
          blog.image_id = String(blog.image_id);
        }
        if (blog.image_1_id) {
          blog.image_1_id = String(blog.image_1_id);
        }
        if (blog.image_2_id) {
          blog.image_2_id = String(blog.image_2_id);
        }
        if (blog.image_3_id) {
          blog.image_3_id = String(blog.image_3_id);
        }
        blog.tags = Object.assign([], blog.tag_id).map(id => {
          return tags.value.find((_tag) => Number(_tag.id) === Number(id));
        });
        store.setItem(blog);
        store.toggleModal();

      },
      remove(blog) {
        console.log(blog);
        //store.toggleModal();
      }
    }
  }
}
</script>