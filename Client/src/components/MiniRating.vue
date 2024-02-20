<template>
  <div class="rating-bar">
    <span
        v-for="star in 5"
        :key="star"
        @click="setRating(star)"
        :class="{ 'star-filled': star <= rating, 'star-empty': star > rating }"
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
};
</script>


<style scoped>

#star{
  font-size: 14px;

}

.rating-bar {
  display: inline-flex;
  cursor: pointer;
  pointer-events: none;
}



.star-filled {
  color: #facf3a; /* Yellow color for filled stars */
}

.star-empty {
  color: #919191; /* Gray color for empty stars */
}
</style>
