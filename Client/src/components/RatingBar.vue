<template>
  <div class="rating-bar">
    <span
        v-for="star in maxStars"
        :key="star"
        @click="setRating(star)"
        :class="{ 'star-filled': star <= rating, 'star-empty': star > rating }"
    >
      <span id="star" class="material-symbols-outlined">star</span>
    </span>
    <p id="rate">Average Rating : {{rating}} out of {{ maxStars }} Stars</p>
  </div>
</template>

<script>
export default {
  props: {
    maxStars: {
      type: Number,
      default: 5,
    },
    initialRating: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      rating: this.initialRating,
    };
  },
  methods: {
    setRating(star) {
      this.rating = star;
    },
  },
  watch: {
    initialRating(newInitialRating) {
      // Update the rating when the initialRating prop changes
      this.rating = newInitialRating;
    },
  },
};
</script>


<style scoped>

#star{
  font-size: 40px;
  pointer-events: none;
  padding: 10px;
  cursor: none;

}

.rating-bar {
  display: block;
  cursor: pointer;
}


#rate{
  font-family: 'Baloo Bhaijaan 2', sans-serif;
  color: #919191; /* Gray color for empty stars */
  font-size: 14px;
  font-weight: 600;
}

.star-filled {
  color: #facf3a; /* Yellow color for filled stars */
}

.star-empty {
  color: #919191; /* Gray color for empty stars */
}
</style>
