# Mindful Watching Prototype

This prototype was built for the 'Mindful Watching' design challenge. The break-taking feature includes a full-screen 2-minute timer, gentle breathing animation, and session-based logic. Ideal for matching flows in Figma prototyping tools using Web-to-Figma design translation.

## Features

### Visual Components

The application includes the following key visual components and states:

1. **Normal Watch Mode**
   - Video player with thumbnail and controls
   - Progress ring surrounding play button (shifts color based on watch duration)
   - Timer badge (gradually fades as watch time increases)
   - Related videos section with subtle animations

2. **Break Prompt**
   - Non-intrusive snackbar that appears after 20 minutes of viewing
   - Contains actionable buttons: "Later" and "Take Break"
   - Subtle entrance and exit animations

3. **Active Break Timer**
   - Full-screen overlay with glass morphism effect
   - Circular countdown timer with progress ring
   - Pulsing "breathing" animation to encourage mindful breathing
   - Timer display showing remaining break time

4. **Resume State**
   - "Resume Watching" button becomes active after break completion
   - "Skip Break" option for users who want to continue immediately
   - Smooth transitions between states

### Interaction Flow

1. User begins watching video content
2. After 20 minutes of continuous viewing:
   - Break prompt appears, suggesting a short pause
3. If user selects "Take Break":
   - Break timer screen appears with 2-minute countdown
   - Breathing animation guides mindful breathing
4. After 2 minutes:
   - "Resume Watching" button becomes active
   - User returns to content with fresh watch timer

## Technical Implementation

### Component Structure

- `AppHeader.tsx`: Navigation and theme toggle
- `VideoPlayer.tsx`: Main video player with progress indicators
- `ProgressRing.tsx`: Circular progress indicator for watch time
- `TimerBadge.tsx`: Watch session timer display
- `NextButtonNudge.tsx`: Related video component with expansion animation
- `BreakPrompt.tsx`: Notification suggesting a break
- `BreakTimer.tsx`: Full-screen break timer with breathing animation

### Animation System

The prototype uses Tailwind CSS with custom animations defined in:
- `index.css`: Custom keyframes and utility classes
- `tailwind.config.ts`: Animation durations and timing functions

### Theme Configuration

Colors and styles are defined in:
- `theme.json`: Primary color and theme settings
- `tailwind.config.ts`: Extended color palette and design tokens

## Figma Export Guidelines

For designers recreating this in Figma:

1. Create separate frames for each visual state
2. Use Smart Animate for transitions between states
3. Match the color tokens from theme.json
4. Implement the breathing animation using Figma's Smart Animate feature
5. Ensure all interactive elements have hover/active states
6. Mirror the glass-morphism effect for the break timer overlay

## Running the Project

```
npm run dev
```

The application will be available at http://localhost:5000.