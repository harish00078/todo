import confetti from 'canvas-confetti';

export const triggerStars = (x, y) => {
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ['star'],
    colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8']
  };

  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.2,
    shapes: ['star'],
    origin: { x, y }
  });

  confetti({
    ...defaults,
    particleCount: 10,
    scalar: 0.75,
    shapes: ['circle'],
    origin: { x, y }
  });
};

export const triggerFire = (x, y) => {
  // 1. Intense Core (White/Yellow) - fast, narrow, upward
  confetti({
    origin: { x, y },
    colors: ['#FFFFFF', '#FFF700', '#FFCC00'],
    shapes: ['circle'],
    particleCount: 20,
    gravity: 0.5, // Reduced gravity to float up
    spread: 15,
    startVelocity: 45,
    scalar: 0.6,
    drift: 0,
    ticks: 100
  });

  // 2. Main Flames (Orange/Red) - wider, floaty
  confetti({
    origin: { x, y },
    colors: ['#FF4500', '#FF0000', '#E25822'],
    shapes: ['circle'],
    particleCount: 40,
    gravity: 0.3, 
    spread: 40,
    startVelocity: 35,
    scalar: 0.8,
    decay: 0.92,
    ticks: 100
  });

  // 3. Smoke (Dark Grey) - slow, drifts, fades out
  confetti({
    origin: { x, y },
    colors: ['#333333', '#1a1a1a', '#4a4a4a'],
    shapes: ['circle'],
    particleCount: 15,
    gravity: 0.1, // Floats up slowly
    spread: 60,
    startVelocity: 20,
    scalar: 1.2,
    decay: 0.88,
    drift: 0.5, // Drifts to the side
    ticks: 120
  });
};
