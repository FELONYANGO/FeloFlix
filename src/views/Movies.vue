<script setup>
import { ref } from 'vue'

const message = ref('Hello World!')
// method to get all movies from the API
const getMovies = async () => {
    try {
        const response = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=ac13cacbd635a127599a00e738323997')
        const data = await response.json()
        
        console.log(data)  
        return data 
    } catch (error) {
        console.error(error)
    }
}
const movies= getMovies()
</script>
<template>
    
        <h1>this is the movies page</h1>
        <p>{{ message }}</p>
        <p>{{ movies }}</p>
        <button @click="getMovies">Get Movies</button>
    
</template>
<style scoped>

</style>