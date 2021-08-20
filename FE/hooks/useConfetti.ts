import { useEffect, useRef } from 'react';
import JSConfetti from 'js-confetti';

export default function useConfetti() {
  const confetti = useRef<JSConfetti | null>(null);

  const popEmoji = () =>
    confetti.current?.addConfetti({
      emojis: ['✨', '💫', ' 🎉'],
      emojiSize: 128,
      confettiNumber: 30,
      confettiRadius: 6,
    });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      confetti.current = new JSConfetti();
    }
  }, []);

  return {
    popEmoji,
  };
}
