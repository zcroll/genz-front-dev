<script setup>
import { ref } from 'vue';
import IsometricCardStack from './components/IsometricCardStack.vue'; // Adjust path

const playingCards = ref([
    {
        id: 'qh', // Queen of Hearts
        rank: 'Q',
        suit: 'hearts',
        descriptionTitle: 'Queen of Hearts',
        descriptionText: 'Often associated with love, beauty, and sometimes seen as a depiction of figures like Judith or Helen of Troy. Represents emotional depth and intuition.',
        style: {
            // Position this card slightly higher and more forward
            inset: '10% 12.5%', // Smaller inset = larger card visually
            zIndex: 4,
        }
    },
    {
        id: 'kd', // King of Diamonds
        rank: 'K',
        suit: 'diamonds',
        descriptionTitle: 'King of Diamonds',
        descriptionText: 'Represents wealth, business, and authority. Often depicted as Julius Caesar. Symbolizes leadership in material matters and practical achievements.',
        style: {
            inset: '15% 12.5%',
            zIndex: 3,
            // Slightly offset via transform if needed
            // transform: 'translateZ(-5px) translateX(5px)'
        }
    },
    {
        id: '10s', // 10 of Spades
        rank: '10',
        suit: 'spades',
        descriptionTitle: 'Ten of Spades',
        descriptionText: 'Often considered an ill omen in cartomancy, representing grief, ruin, or worry. In standard play, it\'s simply a high-ranking spade card.',
        style: {
            inset: '20% 12.5%',
            zIndex: 2,
        }
    },
    {
        id: 'ac', // Ace of Clubs
        rank: 'A',
        suit: 'clubs',
        descriptionTitle: 'Ace of Clubs',
        descriptionText: 'Symbolizes new beginnings, particularly related to work, ideas, or inspiration. Represents potential, energy, and the start of a venture.',
        style: {
            inset: '25% 12.5%',
            zIndex: 1, // Bottom-most card
        }
    }
]);

</script>

<template>
    <div>
        <h1>Playing Card Stack</h1>

        <IsometricCardStack
            :cards="playingCards"
            containerWidth="220px"
        containerHeight="300px"
        perspective="1000px"
        rotateX="55deg"
        rotateZ="-42deg"
        layerHoverLift="50px"
        />
    </div>
</template>

<style>
/* Optional global styles */
body { margin: 0; padding: 10px; font-family: sans-serif; background-color: #eef; }
h1 { text-align: center; margin-bottom: 1rem; color: #334; }
</style>
