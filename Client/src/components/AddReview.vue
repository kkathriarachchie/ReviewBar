<template>
  <transition name="bottom-sheet">
    <div v-if="isOpen" class="bottom-sheet">
      <div class="bottom-sheet-content">
        <h2>Add Review</h2>
        <form @submit.prevent="submitReview">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="comment">Comment:</label>
            <textarea id="comment" v-model="comment" required></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
        <button @click="close">Close</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isOpen: Boolean, // Prop to control the visibility of the component
  },
  data() {
    return {
      email: "",
      comment: "",
    };
  },
  methods: {
    close() {
      this.$emit("close"); // Emit a close event to notify the parent component
    },
    submitReview() {
      // Handle form submission here
      this.close(); // Close the bottom sheet after submission
    },
  },
};
</script>

<style scoped>
/* AddReview.vue styles */
.bottom-sheet {
  position: fixed;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.2);
}

.bottom-sheet-content {
  padding: 20px;
}

/* Define a transition for sliding up */
.bottom-sheet-enter-active,
.bottom-sheet-leave-active {
  transition: transform 0.3s ease-in-out;
}

.bottom-sheet-enter,
.bottom-sheet-leave-to {
  transform: translateY(100%);
}
</style>
