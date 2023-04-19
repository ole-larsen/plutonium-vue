<script lang="ts" setup>
import type { Ref, ComputedRef } from "vue";
import { computed, onBeforeMount, toRaw, ref } from "vue";
import { useBlogStore } from "@/stores/template/blog";
import type {BlogItem, BlogItemTag} from "@/types";

const store = useBlogStore();
const blogs: ComputedRef<{[id: string]: BlogItem}> = computed(() => store.getBlogs());

const recent: Ref<BlogItem[]> = ref([]);
const blog: ComputedRef<BlogItem> = computed(() => store.getBlog(String(store.getPath())));
const hashtags = computed(() => blog.value['tags'] ?? [].map((tag: BlogItemTag) => tag['title']).join(','));

onBeforeMount(async () => {
  for (const b of Object.values((blogs.value))) {
    recent.value.push(toRaw(b));
  }
  if (recent.value.length > 4) {
    recent.value.splice(0,4);
  }
});

</script>
<template>
  <div class="tf-section sc-card-blog post-details">
    <div class="themesflat-container">
      <div class="wrap-flex-box style" v-if="blog">
        <div class="post">
          <div class="inner-content">
            <h2 class="title-post" v-if="blog['title']">{{blog['title']}}</h2>
            <div class="divider"></div>
            <div class="meta-post flex mg-bt-31">
              <div class="box">
                <div class="inner sc-card-article">
                  <div class="meta-info">
                    <div class="author">
                      <div class="avatar" v-if="blog['author']['attributes']['image']['attributes']['url']">
                        <img :src="blog['author']['attributes']['image']['attributes']['url']" alt="image">
                      </div>
                      <div class="info">
                        <span>Author</span>
                        <h6>  <router-link :to="'/blog/' + blog['link']">{{blog['author']['attributes']['name']}} </router-link> </h6>
                      </div>
                    </div>
                    <div class="date">{{blog['date']}}</div>
                  </div>
                </div>
              </div>
              <div class="box left">
<!--                <div class="inner boder pad-r-50">-->
<!--                  <h6 class="desc">WRITER</h6>-->
<!--                  <p>DWINAWAN</p>-->
<!--                </div>-->
                <div class="inner mg-l-39 mg-r-1">
                  <h6 class="desc">DATE</h6>
                  <p>{{blog['date']}}</p>
                </div>
              </div>
            </div>
            <div class="image" v-if="blog['image']">
              <img :src="blog['image']['attributes']['url']" alt="image">
            </div>

            <div class="inner-post mg-t-40">
              <div v-html="blog['description']"></div>
              <br/>
              <br/>
              <div class="image-box">
                <img :src="blog['image1']['attributes']['url']" alt="image">
                <img :src="blog['image2']['attributes']['url']" alt="image">
              </div>
            </div>
            <div class="inner-post mg-t-22 mg-bt-22">
              <div v-html="blog['description2']"></div>
              <div class="image">
               <img :src="blog['image3']['attributes']['url']" alt="image">
              </div>
            </div>
            <div class="inner-post mg-t-24 mg-bt-24">
              <div v-html="blog['description3']"></div>
            </div>

            <div class="sc-widget style-1">
              <div class="widget widget-tag style-2" v-if="blog['tags'] && blog['tags'].length > 0">
                <h4 class="title-widget">Tags</h4>
                <ul v-for="tag in blog['tags']">
                  <li><router-link :to="tag['link']" v-html="tag['title']"></router-link></li>
                </ul>
              </div>
              <div class="widget widget-social style-2">
                <h4 class="title-widget">Share:</h4>
                <ul>
                  <li>
                    <ShareNetwork
                      network="facebook"
                      url="https://news.vuejs.org/issues/180"
                      :title="blog['title']"
                      :description="blog['description']"
                      quote="The hot reload is so fast it\'s near instant. - Evan You"
                      :hashtags="hashtags"
                    >
                      Share on Facebook
                    </ShareNetwork>
                  </li>
                  <li><router-link to="#" class="icon-fl-facebook"></router-link></li>
                  <li class="style-2"><router-link to="#" class="icon-fl-coolicon"></router-link></li>
                  <li class="mgr-none"><router-link to="#" class="icon-fl-mess"></router-link></li>
                </ul>
              </div>
            </div>
            <div class="divider d2"></div>
            <div id="comments">
                <h3 class="heading mg-bt-23">Leave A Comment</h3>
                <form action="#" method="post" id="commentform" class="comment-form" >
                  <fieldset class="name">
                    <input type="text" id="name" placeholder="Name" class="tb-my-input" name="name" tabIndex="2" aria-required="true" required />
                  </fieldset>
                  <fieldset class="email">
                    <input type="email" id="email" placeholder="Email *" class="tb-my-input" name="email" tabIndex="2" aria-required="true" required />
                  </fieldset>
                  <fieldset class="message">
                    <textarea id="message" name="message" rows="4" placeholder="Message" tabIndex="4" aria-required="true" required />
                  </fieldset>
                  <div class="btn-submit mg-t-36">
                    <button class="tf-button-submit" type="submit">Send comment</button>
                  </div>
                </form>
              </div>
          </div>
        </div>
        <div class="side-bar details">
          <div class="widget widget-recent-post mg-bt-43">
            <h3 class="title-widget mg-bt-23">Recent Post</h3>
            <ul  v-if="recent">
              <li
                class="box-recent-post"
                v-for="_blog in recent"
                :key="_blog['id']">
                <div class="box-feature"><router-link :to="'/blog/' + _blog['link']">
                  <img :src="_blog['image']['attributes']['url']" alt="image">
                </router-link></div>
                <div class="box-content">
                  <router-link :to="'/blog/' + _blog['link']" class="title-recent-post">
                    {{_blog['title']}}
                  </router-link>
                  <div>
                    <span class="sub-recent-post" v-html="_blog['description']"></span>
                    <router-link to="/blog" class="day-recent-post">{{_blog['date']}}</router-link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="widget widget-tag style-1">
            <h3 class="title-widget mg-bt-23">Popular Tag</h3>
            <ul v-if="blog['popularTags']">
              <li v-for="tag in blog['popularTags']">
                <router-link class="box-widget-tag" :to="tag['link']" v-html="tag['title']"></router-link>
              </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>