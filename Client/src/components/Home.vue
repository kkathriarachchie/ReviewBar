<template>
  <div id="app">
    <h1 id="header">ReviewBar</h1>
    <p id="tag">Find Product Reviews From Barcodes!</p>
   <BarcodeScanner @scanned="handleScannedText" />
    <button id="demo" @click="viewDemo">Show Demo Product</button>
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
    viewDemo() {
      // Ensure that you have Vue Router properly set up and available here
      this.$router.push({ name: "review-display", params: { productId: '12345' } });
    },
    handleScannedText(text) {
      console.log('Scanned Text:', text); // Handle the scanned text here
      this.$router.push({ name: "review-display", params: { productId: text } });
    },
  },
};
</script>


<style>

@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@400;600;700&display=swap');

#header {
  top: 0;
  color: #6BCB77;
  font-family: 'Baloo Bhaijaan 2', sans-serif;
  font-weight: 700;
  font-size: 30px;
  padding: 20px 20px 0 20px;
}

#demo{
  background-color: #6BCB77;
  border: none;
  border-radius: 10px;
  font-family: 'Baloo Bhaijaan 2', sans-serif;
  padding: 5px 15px;
  font-weight: 600;
  font-size: 16px;
  color: white;
}

#tag {
  font-family: 'Baloo Bhaijaan 2', sans-serif;
  font-weight: 600;
  padding-bottom: 20px;
  color: #444444;
}


#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
  height: 100vh;
  padding: 0;

}

.laser {
  background-color: #6BCB77;
}

body {
  background-color: white;
}

</style>
