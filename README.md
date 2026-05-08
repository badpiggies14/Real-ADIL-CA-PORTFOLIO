# ADIL CA Portfolio

Animated personal portfolio built with React, Vite, Tailwind CSS, Framer Motion, GSAP ScrollTrigger, and Lenis.

## Run

```bash
npm install
npm run dev
```

## Hero Frames

Drop the scroll-video frames into:

```text
public/images/herosection/
```

Supported filename patterns include:

```text
frame_0001.jpg
frame_001.jpg
frame_1.jpg
0001.jpg
001.jpg
1.jpg
```

The app probes the first frame, detects the working pattern, then preloads the sequence until the first missing frame.

## Ambient Audio

Place the background audio at:

```text
public/audio/ambient.mp3
```

The navbar sound button controls this file and fails gracefully if it is not present.
