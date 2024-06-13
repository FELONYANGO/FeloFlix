<template>
  <div class="">
    <swiper :slides-per-view="4" :space-between="10" :pagination >
      <swiper-slide v-for="item in fetchedData.results" :key="item.id">
        <img
          :src="getFullBackdropPath(item.backdrop_path)"
          alt="Backdrop Image"
          v-if="item.backdrop_path"
        />
        <p class="">{{ getTitle(item) }}</p>
        <p>{{ item.id }}</p>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      API_BASE: import.meta.env.VITE_APP_API_URL,
      API_KEY: import.meta.env.VITE_APP_API_KEY,
      API_URL: '',
      fetchedData: null,
    };
  },
  created() {
    this.API_URL = `${this.API_BASE}trending/all/day?language=en-US&api_key=${this.API_KEY}`;
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(this.API_URL, {
          headers: {
            'Authorization': `Bearer ${this.API_KEY}`
          }
        });

        // Check if the response is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const data = await response.json();
          this.fetchedData = data;
        } else {
          // If not JSON, log the response text for debugging
          const text = await response.text();
          console.error('Response is not JSON:', text);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    // get title
    getTitle(item) {
      return item.title || item.name || item.original_title || item.original_name;
    },
    // get buckdroppath
    getFullBackdropPath(backdropPath) {
      return `https://image.tmdb.org/t/p/w300${backdropPath}`;
    },
  },
};
</script>
