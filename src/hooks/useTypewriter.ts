import { useState, useEffect } from 'react';

export function useTypewriter(
  text: string,
  speed: number = 50,
  startDelay: number = 0
): { displayText: string; isTyping: boolean } {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!text) {
      setDisplayText('');
      setIsTyping(false);
      return;
    }

    setDisplayText('');
    setIsTyping(true);
    let i = 0;

    const startTimeout = setTimeout(() => {
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, speed);

      return () => clearInterval(timer);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
    };
  }, [text, speed, startDelay]);

  return { displayText, isTyping: isTyping || displayText.length < (text?.length || 0) };
}
