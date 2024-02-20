<template>
  <div>
    <div style="margin-bottom: 20px; overflow: auto">
      <div class="item" v-for="review in reviews" :key="review._id" @click="showReviewDetails(review)">

        <div class="top">
          <MiniRating :initialRating= parseInt(review.rating) />

          <p id="email">{{ review.email }}</p>
        </div>

        <p id="comment">{{ review.comment }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import MiniRating from "@/components/MiniRating.vue";
import RatingBar from "@/components/RatingBar.vue";

export default {
  components: {RatingBar, MiniRating},
  props: {
    reviews: Array, // An array of review objects passed from the parent component
  },
  methods: {
    showReviewDetails(review) {
      // Handle what happens when a review is clicked
      // You can display the review details or perform any other action here
      console.log('Review clicked:', review);
    },
  },
};
</script>

<style scoped>
/* Add your CSS styling for the list here */
.top{display: flex}

#email{
  color: #444444;
  font-weight: 600;
  flex: 1;
  border-radius: 5px;
  text-align: right;
  font-size: 14px;
  padding: 3px 0;
  font-family: 'Baloo Bhaijaan 2', sans-serif;

}

#comment{
  text-align: left;
  font-family: 'Baloo Bhaijaan 2', sans-serif;
  font-size: 16px;
  margin-bottom: 10px;
}

.item{
  background-color: rgba(238, 238, 238, 0.89);
  border-radius: 5px;
  margin-top: 10px;
  padding: 2px 10px;
}
</style>
