<template>

  <div id="view_reviews" >
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

    <div style="display: flex; position: sticky; top: 0;  background-color: white; padding: 20px 0 20px 0" >
      <span @click="goBack" id="back" class="material-symbols-outlined">arrow_back</span>

      <p class="upc">Product UPC : {{ productId }}</p>

    </div>

    <RatingBar :maxStars="5" :initialRating= Math.round(averageRating) />
    <p v-show="showParagraph" id="status">There are no reviews for this product yet. Feel free to add yours and contribute to the community.</p>

    <br>
    <div style="display: flex; height: calc(100% - 160px); flex-direction: column">
      <ReviewList :reviews="reviewsFromApi" style="flex: 1; margin-bottom: 50px"/>
      <br>
      <button @click="openAddReview" id="add-review" >Add Your Review</button>
    </div>
  </div>

  <vue-bottom-sheet ref="myBottomSheet" :max-height="700" >
    <div class="vbs">
      <h1>Add Your Review</h1>

      <StarRating :initialRating="selectedRating" @rating-selected="updateSelectedRating" />
      <p id="your_rate">Selected Rating: {{ selectedRating }} Stars</p>
      <br>
      <input type="email" id="email" name="email" v-model="email" placeholder="youremail@email.com" required>
      <br><br>
      <textarea id="comment" name="comment" rows="3"  v-model="comment" placeholder="Write your review for this product here." required></textarea>
      <br><br>
      <button id="submit-review" @click="submitRating">Submit Your Review</button>
    </div>
  </vue-bottom-sheet>

</template>

<script>

import RatingBar from "@/components/RatingBar.vue";
import ReviewList from "@/components/ReviewList.vue";
import AddReview from "@/components/AddReview.vue";
import  VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import  "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { v4 as uuid } from 'uuid';
import axios from "axios";
import StarRating from "@/components/StarRating.vue";
import addReview from "@/components/AddReview.vue";

export default {
  components: {StarRating, AddReview, ReviewList, RatingBar, VueBottomSheet},
  props: {
    productId: String, // This should match the prop definition
  },
  data() {
    return {
      reviewsFromApi: [],
      averageRating: 0, // Initialize the average rating
      showAddReview: false, // Initially, the AddReview component is hidden
      selectedRating: 0, // Initialize selectedRating
      email: '',   // Data property to store the email input value
      comment: '', // Data property to store the comment textarea value
      showParagraph: false, // Initially, the paragraph is hidden

    };
  },
  mounted() {
    console.log("ReviewDisplay component mounted");
    console.log("Product ID:", this.productId);
  },
  methods: {
    fetchReviews() {
      // Replace 'http://localhost:3000/api/reviews/12345' with your API endpoint
      axios
          .get('http://localhost:3000/api/reviews/'+this.productId)
          .then((response) => {
            this.reviewsFromApi = response.data;

            // Calculate the average rating
            const totalRatings = this.reviewsFromApi.reduce((sum, review) => sum + parseInt(review.rating), 0);
            this.averageRating = totalRatings / this.reviewsFromApi.length;
            console.log(parseInt(this.averageRating))
            this.showParagraph = false;

          })
          .catch((error) => {
            //console.error('Error fetching reviews:', error);
            this.showParagraph = true;
          });
    },
    goBack() {
      // Use this method to go back to the previous page
      this.$router.go(-1); // Assumes you're using Vue Router
    },
    openAddReview() {
      this.$refs.myBottomSheet.open();
      },

    submitRating() {
      if(this.selectedRating < 1){
        alert("You must select a rating to continue.")
      }else{
        if(this.email === ''){
          alert("You must enter your email to continue.")
        }else{
          if(this.comment === ''){
            alert("You must provide a review to continue.")
          }else{

            this.addReview()
            // Submit..
          }
        }
      }
    },

      async addReview() {
        const reviewId = uuid(); // Generate a random UUID for the review ID

        const newReview = {
          review_id: reviewId,
          rating: this.selectedRating,
          email: this.email,
          comment: this.comment,
        };

        try {
          // Replace 'http://localhost:3000/api/add-review/12345' with your API endpoint
          const response = await axios.post('http://localhost:3000/api/add-review/'+this.productId, newReview, {
            headers: { 'Content-Type': 'application/json' },
          });

          // Handle success or provide feedback to the user
          console.log('Review added successfully:', response.data);
          this.$refs.myBottomSheet.close();
          this.fetchReviews();


        } catch (error) {
          // Handle errors, e.g., show an error message to the user
          console.error('Error adding review:', error);
        }
      },

    updateSelectedRating(rating) {
      this.selectedRating = rating;
    },

  },
  created() {
    this.fetchReviews();
  },
};
</script>

<style>

.vbs{
  padding: 0 20px 20px 20px;
  bottom: 0;
}

.vbs h1{
  font-family: 'Baloo Bhaijaan 2', sans-serif;

}

#status{
  font-family: 'Baloo Bhaijaan 2', sans-serif;
  color: #6BCB77; /* Gray color for empty stars */
  font-size: 20px;
  margin-top: 30px;
  background-color: #f3f3f3;
  font-weight: 700;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.vbs h1{
  color: #333333;
  font-weight: 600;
  text-align: center;
  font-size: 20px;
}

.vbs p {
  color: #333333;
}

#your_rate{
  font-family: 'Baloo Bhaijaan 2', sans-serif;
  color: #919191; /* Gray color for empty stars */
  font-size: 14px;
  font-weight: 600;
  text-align: center;
}

input, textarea{
  background-color: white;
  border: 5px solid #6BCB77;
  border-radius: 10px;
  width: 100%;
  font-family: 'Baloo Bhaijaan 2', sans-serif;
  font-size: 16px;
  text-decoration: none;
  padding: 10px;
}

#add-review , #submit-review{
  background-color: #6BCB77;
  font-size: 20px;
  color: white;
  width: 100%;
  border-radius: 20px;
  border: none;
  font-family: 'Baloo Bhaijaan 2', sans-serif;
  font-weight: 600;
  padding: 10px;
}

#add-review{
  position: sticky;
  bottom: 20px;
  left: 0;
  width: 100%;
}

.upc{
  font-family: 'Baloo Bhaijaan 2', sans-serif;
  margin-top: 2px;
  margin-left: 10px;
  font-weight: 600;
  font-size: 20px;
  text-align: left
}

#back{

  border: 0;
  border-radius: 20px;
  color: #6BCB77;
  font-size: 30px;
  font-weight: 600;
  display: inline-block;
  position: relative;
}
.material-symbols-outlined {
  font-variation-settings:
      'FILL' 1,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24
}
#view_reviews{
  height: 100vh;
  width: 100vw;
  top: 0;
  background-color: white;
  z-index: 99;
  position: absolute;
  padding: 0 20px 20px 20px;
  ;
}


</style>
