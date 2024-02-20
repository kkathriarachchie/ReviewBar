import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'; // Import Vue Router

// Import your components
import BarcodeScanner from './components/BarcodeScanner.vue';
import ReviewDisplay from './components/ReviewDisplay.vue'; // Import the ReviewDisplay component
import Home from './components/Home.vue'; // Import the ReviewDisplay component

// Create a Vue Router instance
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/review/:productId',
            name: 'review-display',
            component: ReviewDisplay,
            props: true, // Pass route params as props
        },
    ],
});

createApp(App)
    .use(router) // Use the Vue Router instance
    .component('BarcodeScanner', BarcodeScanner) // Register BarcodeScanner globally
    .component('ReviewDisplay', ReviewDisplay) // Register ReviewDisplay globally
    .mount('#app');
