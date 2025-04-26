# Interactive Card Stack Component

This component provides an interactive 3D isometric card stack that transitions to a detailed view when a card is selected.

## Features

- Isometric 3D card stack with hover effects
- Smooth transitions between stack and detail views
- Detailed card view with color/style options
- Animated price display with NumberFlow
- Currency selection
- Responsive design

## Components

### CardGallery.vue

The main wrapper component that manages state and transitions between views.

**Props:**
- `cards`: Array of card objects (required)

### CardStack.vue

Displays the isometric stack of cards.

**Props:**
- `cards`: Array of card objects (required)

**Events:**
- `select-card`: Emitted when a card is clicked, with the card ID and element reference

### CardDetail.vue

Displays the detailed view for a selected card.

**Props:**
- `card`: The card object to display (required)

**Events:**
- `close`: Emitted when the close button is clicked

## Card Data Structure

Each card object should have the following properties:

```javascript
{
  id: 'unique-id',
  title: 'Card Title',
  imageFront: '/path/to/front-image.jpg',
  imageBack: '/path/to/back-image.jpg',
  description: 'Detailed description of the card',
  dimensions: '2.5in x 3.5in',
  dimensionsMetric: '6.35cm x 8.89cm',
  material: 'Card material description',
  price: 12.99,
  currency: '$',
  colors: [
    {
      id: 'color-id',
      name: 'Color Name',
      hex: '#hexcode',
      image: '/path/to/color-variant-image.jpg',
      price: 12.99,
      material: 'Material for this variant'
    },
    // More color variants...
  ],
  stackStyle: {
    zIndex: 10, // Controls stacking order
    transform: 'translateX(0px) translateY(0px) translateZ(0px)' // Position in the stack
  }
}
```

## Usage

```vue
<template>
  <CardGallery :cards="cards" />
</template>

<script setup>
import { ref } from 'vue';
import CardGallery from '@/components/CardGallery.vue';
import cardsData from '@/data/cardsData';

const cards = ref(cardsData);
</script>
```

## Dependencies

- Vue 3
- Motion One (`motion`)
- Motion One Vue adapter (`@motionone/vue`)
- Motion One for price animations (using the `animate` function)
- Lucide Vue for icons (`lucide-vue-next`)

## Animations

The component uses Motion One for smooth animations:
- Entrance animations for the card stack using `animate` and `stagger`
- Transitions between stack and detail views using sequential `animate` calls
- Sequenced animations for elements in the detail view with delayed animations

Motion One's `animate` function returns a Promise via the `.finished` property, which allows for chaining animations in sequence.

Motion One's `animate` function is also used to animate price changes when different color variants are selected, providing smooth transitions between price values.
