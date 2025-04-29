/**
 * Scroll utilities for the application
 */

/**
 * Scroll to a specific element with smooth behavior
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional offset from the top of the element (default: 0)
 * @param duration - Optional duration of the scroll animation in ms (default: 500)
 */
export const scrollToElement = (elementId: string, offset: number = 0, duration: number = 500): void => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Scroll to a specific position with smooth behavior
 * @param position - The position to scroll to (in pixels)
 * @param duration - Optional duration of the scroll animation in ms (default: 500)
 */
export const scrollToPosition = (position: number, duration: number = 500): void => {
  window.scrollTo({
    top: position,
    behavior: 'smooth'
  });
};

/**
 * Scroll to the top of the page with smooth behavior
 * @param duration - Optional duration of the scroll animation in ms (default: 500)
 */
export const scrollToTop = (duration: number = 500): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * Scroll to the bottom of the page with smooth behavior
 * @param duration - Optional duration of the scroll animation in ms (default: 500)
 */
export const scrollToBottom = (duration: number = 500): void => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
};
