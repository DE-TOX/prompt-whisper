import React, { useState, useEffect } from 'react';

const TextType = ({
  text = ["Text typing effect"],
  typingSpeed = 75,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "|"
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentString = text[currentIndex];

    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        if (currentCharIndex > 0) {
          setDisplayText(currentString.substring(0, currentCharIndex - 1));
          setCurrentCharIndex(currentCharIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentIndex((currentIndex + 1) % text.length);
          setCurrentCharIndex(0);
        }
      } else {
        if (currentCharIndex < currentString.length) {
          setDisplayText(currentString.substring(0, currentCharIndex + 1));
          setCurrentCharIndex(currentCharIndex + 1);
        } else {
          setIsPaused(true);
        }
      }
    }, isPaused ? pauseDuration : isDeleting ? typingSpeed / 2 : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, currentCharIndex, isDeleting, isPaused, text, typingSpeed, pauseDuration]);

  return (
    <span className="inline-block">
      {displayText}
      {showCursor && (
        <span className={`inline-block ${showCursor ? 'animate-pulse' : ''}`}>
          {cursorCharacter}
        </span>
      )}
    </span>
  );
};

export default TextType;