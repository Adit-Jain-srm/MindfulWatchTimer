# Mindful Watching Prototype

This prototype was built for the 'Mindful Watching' UI/UX design challenge. It presents a video streaming interface with time-based UI components that subtly encourage breaks during extended viewing sessions, promoting digital wellbeing without interrupting the user experience.

## Challenge Overview

The "Mindful Watching" UI/UX design challenge focuses on creating a more conscious video consumption experience by addressing these key aspects:

- **Problem**: Extended screen time without breaks can lead to eye strain, reduced concentration, and digital fatigue
- **Goal**: Design a video interface that encourages healthier viewing habits without disrupting the viewing experience
- **Approach**: Use subtle, time-based UI changes and gentle nudges rather than forceful interruptions
- **Target Experience**: Create a supportive experience that feels like a mindful companion rather than an authoritarian timer

## Key Design Innovations

The prototype demonstrates several innovative UI/UX approaches to promoting mindful watching:

1. **Progressive Disclosure** - Interface changes gradually reveal themselves as viewing time increases
2. **Non-Disruptive Notifications** - Break suggestions appear as optional prompts without pausing content
3. **Visual Time Indicators** - Color shifts and animations subtly communicate extended viewing time
4. **Guided Break Experience** - Breathing exercise during breaks provides a restorative moment
5. **Content Variety Encouragement** - "Next video" suggestions become more prominent over time

## UI States and User Journey

The application follows a progressive disclosure approach with distinct visual states that guide the user through a mindful watching experience:

### 1. Normal Watch Mode (0-20 minutes)
- **Primary elements**: Video player, play/pause button, progress ring, timer badge
- **Visual characteristics**: Clean interface, minimal distractions
- **Interaction pattern**: Standard video controls with subtle time indicators
- **Key component**: `VideoPlayer.tsx` with embedded `WatchControls.tsx`

### 2. Extended Watch Mode (20+ minutes)
- **Primary elements**: All normal elements + subtly highlighted "next video" suggestion
- **Visual characteristics**: Progress ring begins color shift animation, timer badge fades
- **Interaction pattern**: Gentle suggestion to potentially switch content
- **Key component**: `NextButtonNudge.tsx` with `animate-expand` class

### 3. Break Suggestion (Triggered at 20 minute threshold)
- **Primary elements**: Non-modal notification with action buttons
- **Visual characteristics**: Subtle entrance animation, supportive messaging
- **Interaction pattern**: Optional interaction with two clear choices
- **Key component**: `BreakPrompt.tsx` with entrance animations

### 4. Active Break Mode
- **Primary elements**: Full-screen overlay, breathing circle animation, countdown timer
- **Visual characteristics**: Calming colors, reduced visual complexity, focus on breathing
- **Interaction pattern**: Guided breathing with visual pulsing, minimal interactions
- **Key component**: `BreakTimer.tsx` with `animate-breatheIn`/`animate-breatheOut` classes

### 5. Post-Break Resume State
- **Primary elements**: Same as break mode but with active "Resume Watching" button
- **Visual characteristics**: Visual indication that break is complete 
- **Interaction pattern**: Clear call-to-action to resume content
- **Key component**: `BreakTimer.tsx` with timer completion state

## Design System & Figma Export Notes

### Colors
- **Primary**: `oklch(65% 0.2 180)` - A calming teal that supports the mindfulness theme
- **Progress states**:
  - Early watching: `primary-400` (lighter teal)
  - Mid watching: `primary-500` (medium teal)
  - Extended watching: `primary-600` with hue-shift animation

### Typography
- **Font family**: System font stack through Tailwind's `font-sans`
- **Hierarchy**:
  - Main headings: `font-semibold text-lg`
  - Secondary text: `text-sm text-gray-600 dark:text-gray-400`
  - UI elements: `text-xs font-medium`

### Animations & Timing
- **Time scaling**: For demo purposes, time is accelerated (1 real second = 10 video seconds)
- **Key thresholds**:
  - Break prompt: 20 minutes (1200 seconds)
  - Extended watching UI changes: 30 minutes (1800 seconds)
  - Break duration: 2 minutes (120 seconds)
- **Animation durations**:
  - Breathing cycle: 4 seconds per inhale/exhale
  - Color shifts: 10 seconds
  - UI transitions: 300-500ms

### Layout & Spacing
- **Container width**: `max-w-md` (448px) - Mobile-first design
- **Border radius**: `radius: 0.75` in theme.json
- **Spacing scale**: Standard Tailwind spacing scale

### Figma Implementation Notes

#### Component Structure
Each UI component has been designed to be self-contained for easy Figma replication. Detailed export notes are included as comments in each component file:

```
MindfulWatching/
├── AppHeader.tsx         // App title and theme toggle
├── VideoPlayer.tsx       // Main video container with timing elements
├── WatchControls.tsx     // Play button and progress indicators
├── ProgressRing.tsx      // Color-shifting progress indicator
├── TimerBadge.tsx        // Watch time display with fading
├── NextButtonNudge.tsx   // Expanding "Next" suggestion
├── RelatedVideo.tsx      // Standard video suggestion item
├── BreakPrompt.tsx       // Break suggestion notification
└── BreakTimer.tsx        // Full-screen break experience
```

#### Creating Interactive Prototypes
To recreate the flow in Figma:

1. Create separate frames for each of the 5 major UI states
2. For the time-based animations:
   - Use Smart Animate between variants of the progress ring
   - Create variants for each opacity level of the timer badge
   - Use interactive components with hover/pressed states
3. For the breathing animation:
   - Create two variants of the breathing circle (expanded/contracted)
   - Set up a back-and-forth interaction with Smart Animate
4. For glass-morphism effects:
   - Use a semi-transparent background with blur effect (backdrop-filter in CSS)

#### Special Figma Export Considerations

All components include detailed `FIGMA EXPORT NOTES` comments with specific implementation details:

**VideoPlayer** - Create three states (loading, ready, playing) with thumbnail overlay and proper 16:9 aspect ratio. Metadata section should use line clamping for text.

**ProgressRing** - Create three variant states based on progress percentage with increasingly noticeable visual feedback. Use proper SVG arc implementation with stroke-dasharray/dashoffset.

**BreakPrompt** - Implement as a bottom notification with left accent bar, frosted glass effect, and entrance animation that slides up from bottom.

**BreakTimer** - Create as full-screen overlay with breathing animation using Smart Animate between inhale/exhale states (4s duration). Implement two variants for in-progress and completed states.

**NextButtonNudge** - Create two variants (normal and expanded) that transition when watching time exceeds threshold. Expanded state includes subtle animations and progress indicator.

#### Effects and Animations

For precise animation recreation in Figma:

1. **Breathing animation**:
   - Scale: 0.9 → 1.2 and back
   - Opacity: 0.7 → 0.9 and back
   - Duration: 4 seconds per cycle

2. **Frosted glass effects**:
   - Background: Semi-transparent white/gray (95% opacity)
   - Blur: 12px backdrop blur
   - Border: 1px light gray

3. **Progress indicators**:
   - Circular progress: Arc grows clockwise, color intensifies
   - Linear progress: Gradient-filled bar grows horizontally
   - Color shifts: Use hue-rotate filter animation

## Time-Based Features Implementation

The core timing logic is implemented in `useWatchTimer.ts` which manages:

- Watch time tracking
- Threshold detection for UI changes
- Transition between states (normal → extended → break)
- Break completion and timer reset

## Running the Project

```
npm run dev
```

The application will be available at http://localhost:5000.