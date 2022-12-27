import { defineStore } from "pinia";
import axios from "axios";

export const useItemDetailsStore = defineStore({
  id: "itemDetails",
  state: () => ({
    _itemDetails: null
  }),
  getters: {
    itemDetails: (state) => state._itemDetails
  },
  actions: {
    getData() {
      return axios.get('http://localhost:1337/api/item-detail?populate=*', {
        headers: {
          Authorization:
            'Bearer 90869d41891af733d3e073ae38876c95e06f7835a3df5c09c6456ce2ead077d3332af4a8e2b0ccf2e36f2daaa31f2212702545cc3e8491d1beb93b3a8b573a834a108e43d98913687e7c7f54000a5b373c8b8c0c7b3c201332b153465f5e295e3a71112b8febdc1e9a53316c2540a51034c9d2224bb1b08d649b442ed4949533',
        }
      });
    },
    async load() {
      try {
        const response = await this.getData();
        const { data: {attributes} } = response.data;
        this._itemDetails = attributes;
      } catch (e) {
        throw e;
      }
    }
  }
});