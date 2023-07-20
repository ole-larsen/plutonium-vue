<template>
  <div class="tag-input">
    <Multiselect
      groupOptions="Select tags"
      mode="tags"
      :searchable="true"
      :create-option="true"
      :close-on-select="true"
      v-model="selectedTags"
      @change="handleChange"
      :options="tagsOptions"
    />
  </div>
</template>

<script>
import {nextTick, onMounted, ref, toRefs, watch} from "vue";
import TagsTableModal from "@/components/dashboard/tags/TagsTableModal.vue";
import TagsTable from "@/components/dashboard/tags/TagsTable.vue";
import Multiselect from "@vueform/multiselect";

import {useTagsStore} from "@/stores/dashboard/tags";
export default {
  name: "TagsInput",
  components: {TagsTableModal, TagsTable, Multiselect},
  props: ["tags", "blogId"],
  setup(props) {
    const store = useTagsStore();
    const { tags, blogId } = toRefs(props);
    const value = ref([]);
    const tagsOptions = ref([]);
    const selectedTags = ref([]);
    const filterBlogsTags = (_blogId) => {
      selectedTags.value = tags.value
        .filter(tag => tag.blog_id && tag.blog_id.length > 0 && tag.blog_id.find((id) => id === _blogId))
        .map(tag => tag.id);
    }
    watch(
      () => blogId,
      (blogId) => {
        filterBlogsTags(blogId.value);
      },
      { deep: true });
    watch(
      () => selectedTags,
      (_tags) => {
        if (blogId.value) {
          if (!_tags.value) {
            filterBlogsTags(blogId.value);
          }
        }
      },
      { deep: true }
    );
    onMounted(async () => {
      if (tags.value.length === 0) {
        await store.load();
      }
      tags.value.forEach((tag) => {
        tagsOptions.value.push({
          value: tag.id,
          label: tag.title
        });
      });
      selectedTags.value = tags.value.map(tag => tag.id);
    });
    return {
      tags,
      value,
      tagsOptions,
      selectedTags,
      async handleChange(tagIds) {
        const lastTag = tagIds[tagIds.length - 1];
        if (typeof lastTag === "string") {
          await store.add(lastTag, blogId.value);
        } else {
          tagIds.map(async (tagId) => {
            const tag = tags.value.find((tag) => tag.id === tagId);
            if (blogId.value && !tag.blog_id.find((_blogId) => _blogId === blogId.value)) {
              tag.blog_id.push(blogId.value);
            }
            if (tag) {
              await store.save(tag);
            }
          });
        }
        await store.load();
        await nextTick(() => {
          tagsOptions.value = [];
          tags.value.forEach((tag) => {
            tagsOptions.value.push({
              value: tag.id,
              label: tag.title
            });
            selectedTags.value = blogId.value
              ? filterBlogsTags(blogId.value)
              : tags.value.map(tag => tag.id);
          });
        })
      }
    }
  }
}
</script>
<style lang="scss">
.tag-input {
  position: relative;
  ul{
    li {
      height: 38px;
      z-index: 100;
    }
  }
  ul li:not(:first-child) {
    cursor: pointer;
  }
  .tag-list {
    li {
      padding: 0;
      .btn-close {
        width: 0.1em;
        height: 0.1em;
      }
    }
  }
}

</style>