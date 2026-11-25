import React, { useState, useEffect } from 'react';

/**
 * TypewriterHeading component
 * Spec:
 * - Font: Urbanist, 64px, weight 600, line-height 64px, letter-spacing -1.5px
 * - Text: "Unlock Top Marketing Talent You Thought Was Out of Reach -- Now Just One Click Away!"
 * - First 67 characters colored #000000, remainder colored #ffffff
 * - Blinking electric blue cursor (#00A6FF) appears during typing
 * - Typing speed: 35ms per character, starts after 400ms delay
 */
export default function TypewriterHeading({
  text = "Unlock Top Marketing Talent You Thought Was Out of Reach -- Now Just One Click Away!",
  cutoffIndex = 67,
  speed = 35,
  delay = 400,
  onComplete
}) {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStarted(true);
      setIsTyping(true);

      let currentLength = 0;
      const interval = setInterval(() => {
        currentLength++;
        setDisplayedLength(currentLength);

        if (currentLength >= text.length) {
          clearInterval(interval);
          setIsTyping(false);
          if (onComplete) onComplete();
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [text, speed, delay, onComplete]);

  // Portion of text that is currently displayed
  const currentText = text.slice(0, displayedLength);

  // Split into dark part (<= 67) and white part (> 67)
  const darkPart = currentText.slice(0, cutoffIndex);
  const whitePart = currentText.length > cutoffIndex ? currentText.slice(cutoffIndex) : '';

  return (
    <h1 className="hero-typewriter-heading">
      <span className="text-dark-slice">{darkPart}</span>
      {whitePart && <span className="text-white-slice">{whitePart}</span>}
      {isTyping && <span className="typewriter-cursor" aria-hidden="true" />}
    </h1>
  );
}
