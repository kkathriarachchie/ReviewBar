<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import BarcodeScanner from "@/components/BarcodeScanner.vue";

export default {
  name: "App",
  components: {
    BarcodeScanner,
  },
  methods: {
    viewReviews() {
      // Ensure that you have Vue Router properly set up and available here
      this.$router.push({ name: "review-display", params: { productId: '12345' } });
    },
  },
};
</script>


<style>

@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@400;600;700&display=swap');


#app {
  font-family: 'Baloo Bhaijaan 2', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
  height: 100vh;
  padding: 0;

}

body {
  background-color: white;
}

</style>
