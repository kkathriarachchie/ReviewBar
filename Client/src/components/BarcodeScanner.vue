<template>
  <div class="hello">
    <StreamBarcodeReader id="scanner"
        @decode="(a, b, c) => onDecode(a, b, c)"
        @loaded="() => onLoaded()"
    ></StreamBarcodeReader>
    <div id="scan-text">{{ text || "Scan a product barcode to continue" }}</div>
  </div>
</template>

<script>
import {StreamBarcodeReader} from "vue-barcode-reader";

export default {
  name: "BarcodeScanner",
  components: {
    StreamBarcodeReader,
  },
  data() {
    return {
      text: "",
      id: null,
    };
  },
  props: {
    msg: String,
  },
  methods: {
    handleScannedText(text) {
      this.$emit('scanned', text); // Emit an event with the scanned text
    },
    onDecode(a, b, c) {
      console.log(a, b, c);
      this.text = a;
      this.handleScannedText(a)
      if (this.id) clearTimeout(this.id);
      this.id = setTimeout(() => {
        if (this.text === a) {
          this.text = "";
        }
      }, 5000);
    },
    onLoaded() {
      console.log("load");
    },
  },
};
</script>
<style scoped>


#scanner {
  width: calc(100% - 40px);
  margin: 20px;
  height: 280px;
  overflow: hidden;
  top: -10px;

  border-radius: 20px;
  padding-bottom: -20px;
}

#scan-text{
  bottom: 0;
  background-color: #6BCB77;
  position: absolute;
  width: 100vw;
  display: block;
  color: white;
  font-weight: 600;
  font-size: 20px;
  font-family: 'Baloo Bhaijaan 2', sans-serif;
  padding: 20px;
  border-radius: 20px 20px 0 0;
}
</style>
