import { defineStore } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";

import type { PublicCategoryCollectionCollectibleDto } from "@/types";
import { useLoaderStore } from "@/stores/loader/store";

export const useCollectibleStore = defineStore("collectible", () => {
  const loader = useLoaderStore();
  const _likes: Ref<{ [id: string]: { [tokenId: string]: number } }> = ref({});

  const likes = function (collectible: PublicCategoryCollectionCollectibleDto) {
    if (
      !_likes.value[collectible.attributes.collectionId] ||
      !_likes.value[collectible.attributes.collectionId][
        collectible.attributes.itemId
      ]
    ) {
      return 0;
    }
    return _likes.value[collectible.attributes.collectionId][
      collectible.attributes.itemId
    ];
  };

  async function load(collectible: PublicCategoryCollectionCollectibleDto) {
    const { data } = await loader.loadCollectibleLikes(collectible);

    if (!_likes.value[collectible.attributes.collectionId]) {
      _likes.value[collectible.attributes.collectionId] = {};
    }
    if (
      !_likes.value[collectible.attributes.collectionId][
        collectible.attributes.itemId
      ]
    ) {
      _likes.value[collectible.attributes.collectionId][
        collectible.attributes.itemId
      ] = 0;
    }
    _likes.value[collectible.attributes.collectionId][
      collectible.attributes.itemId
    ] = data.likes ? data.likes : 0;
  }

  return {
    likes,
    load,
  };
});
