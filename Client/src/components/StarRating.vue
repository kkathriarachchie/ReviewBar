<template>
  <div class="star-rating">
    <span
        v-for="star in maxStars"
        :key="star"
        @click="setRating(star)"
        :class="{ 'star-filled': star <= selectedRating, 'star-empty': star > selectedRating }"
    >
      <span id="star" class="material-symbols-outlined">star</span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    initialRating: {
      type: Number,
      default: 0,
    },
    maxStars: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      selectedRating: this.initialRating,
    };
  },
  methods: {
    setRating(rating) {
      this.selectedRating = rating;
      this.$emit("rating-selected", rating); // Emit a custom event to the parent component
    },
  },
};
</script>

<style scoped>
/* StarRating.vue styles */
.star-rating {
  display: block;
  text-align: center;
}

.star-filled {
  color: #facf3a; /* Change the color of filled stars as needed */
  cursor: pointer;
  display: inline-block;

}

.star-empty {
  color: #919191; /* Change the color of empty stars as needed */
  cursor: pointer;
  display: inline-block;
}


#star{
  font-size: 40px;
  pointer-events: none;
  padding: 10px;
  cursor: none;
  text-align: center;
}
</style>
