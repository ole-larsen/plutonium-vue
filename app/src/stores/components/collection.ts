import { defineStore } from "pinia";
import axios from "axios";

export const useCollectionStore = defineStore({
  id: "collection",
  state: () => ({
    _collection: null,
  }),
  getters: {
    collection: (state) => state._collection,
  },
  actions: {
    getData(collectionNumber: number) {
      switch (collectionNumber) {
        case 1:
        default:
          return axios.get(
            "http://localhost:1337/api/popular-collection?populate=Collection.imgAuthor,Collection.imgCollection1,Collection.imgCollection2,Collection.imgCollection3,Collection.imgCollection4",
            {
              headers: {
                Authorization:
                  "Bearer 90869d41891af733d3e073ae38876c95e06f7835a3df5c09c6456ce2ead077d3332af4a8e2b0ccf2e36f2daaa31f2212702545cc3e8491d1beb93b3a8b573a834a108e43d98913687e7c7f54000a5b373c8b8c0c7b3c201332b153465f5e295e3a71112b8febdc1e9a53316c2540a51034c9d2224bb1b08d649b442ed4949533",
              },
            }
          );
        case 2:
          return axios.get(
            "http://localhost:1337/api/popular-collection-2?populate=Collection.imgAuthor,Collection.img1,Collection.img2,Collection.img3,Collection.img4,Collection.img5",
            {
              headers: {
                Authorization:
                  "Bearer 90869d41891af733d3e073ae38876c95e06f7835a3df5c09c6456ce2ead077d3332af4a8e2b0ccf2e36f2daaa31f2212702545cc3e8491d1beb93b3a8b573a834a108e43d98913687e7c7f54000a5b373c8b8c0c7b3c201332b153465f5e295e3a71112b8febdc1e9a53316c2540a51034c9d2224bb1b08d649b442ed4949533",
              },
            }
          );
        case 3:
          return axios.get(
            "http://localhost:1337/api/popular-collection-3?populate=Collection.imgAuthor,Collection.imgCollection1,Collection.imgCollection2,Collection.imgCollection3,Collection.imgCollection4",
            {
              headers: {
                Authorization:
                  "Bearer 90869d41891af733d3e073ae38876c95e06f7835a3df5c09c6456ce2ead077d3332af4a8e2b0ccf2e36f2daaa31f2212702545cc3e8491d1beb93b3a8b573a834a108e43d98913687e7c7f54000a5b373c8b8c0c7b3c201332b153465f5e295e3a71112b8febdc1e9a53316c2540a51034c9d2224bb1b08d649b442ed4949533",
              },
            }
          );
      }
    },
    async load(collectionNumber: number) {
      const response = await this.getData(collectionNumber);
      const {
        data: { attributes },
      } = response.data;
      this._collection = attributes;
    },
  },
});
