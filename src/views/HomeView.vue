<template>
  <div>
    <h1 class="text-2xl text-[#E50914] py-1">Trending Movies</h1>
    <div class="flex flex-wrap items-center" v-if="fetchedData != null && fetchedData.results.length">
      <div v-for="item in fetchedData.results" :key="item.id" class="item">
        <img
          :src="getFullBackdropPath(item.backdrop_path)"
          alt="Backdrop Image"
          v-if="item.backdrop_path"
          class="w-full h-auto"
        />
        <p class="text-sm font-bold underline">{{ getTitle(item) }}</p>
        <p>{{ item.id }}</p>
      </div>
      <hr>
      <rated-movies />
      <upcoming />
    </div>
  </div>
</template>

<script>
import RatedMovies from '../components/RatedMovies.vue';
import Upcoming from '../components/Upcoming.vue';

export default {
  components: {
    RatedMovies,
    Upcoming,
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
        const response = await fetch(this.API_URL);
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const data = await response.json();
          this.fetchedData = data;
        } else {
          const text = await response.text();
          console.error('Response is not JSON:', text);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    getTitle(item) {
      return item.title || item.name || item.original_title || item.original_name;
    },
    getFullBackdropPath(backdropPath) {
      return `https://image.tmdb.org/t/p/w300${backdropPath}`;
    },
  },
};
</script>

<style>
.item {
  flex: 1 1 calc(20% - 10px);
  margin: 5px;
}

@media (max-width: 1024px) {
  .item {
    flex: 1 1 calc(25% - 10px);
  }
}

@media (max-width: 768px) {
  .item {
    flex: 1 1 calc(33.33% - 10px);
  }
}

@media (max-width: 640px) {
  .item {
    flex: 1 1 calc(50% - 10px);
  }
}

@media (max-width: 480px) {
  .item {
    flex: 1 1 calc(100% - 10px);
  }
}
</style>
