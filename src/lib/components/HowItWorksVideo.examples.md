# HowItWorksVideo Component - Usage Examples

A fully reusable component for displaying "How It Works" sections with optional video and customizable steps.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"How It Works"` | Main heading text |
| `videoUrl` | `string` | `''` | URL to video file (MP4) |
| `posterUrl` | `string` | `''` | URL to video poster image |
| `placeholderIcon` | `string` | `'🎬'` | Emoji/icon for video placeholder |
| `placeholderText` | `string` | `'Video Demo'` | Primary text for placeholder |
| `placeholderSubtext` | `string` | `'Video coming soon'` | Secondary text for placeholder |
| `showVideo` | `boolean` | `true` | Whether to show video section |
| `steps` | `Step[]` | `[]` | Array of step objects |

## Step Type

```typescript
export type Step = {
  title: string;
  description: string;
  icon: string;
};
```

---

## Example 1: Basic Usage (Default Steps)

```svelte
<script>
  import HowItWorksVideo from '$lib/components/HowItWorksVideo.svelte';
</script>

<HowItWorksVideo />
```

This will display with default title and 3 generic steps.

---

## Example 2: Custom Title Only

```svelte
<HowItWorksVideo 
  title="How Tarot Reading Works"
/>
```

---

## Example 3: With Custom Steps

```svelte
<script>
  import HowItWorksVideo, { type Step } from '$lib/components/HowItWorksVideo.svelte';

  const tarotSteps: Step[] = [
    {
      title: "Choose Your Spread",
      description: "Select from Celtic Cross, Three Card, or custom spreads.",
      icon: "🃏"
    },
    {
      title: "Shuffle & Draw",
      description: "Focus on your question while the cards are shuffled.",
      icon: "✨"
    },
    {
      title: "Interpret Results",
      description: "Receive detailed interpretations for each card position.",
      icon: "🔮"
    }
  ];
</script>

<HowItWorksVideo 
  title="How Tarot Reading Works"
  steps={tarotSteps}
/>
```

---

## Example 4: With Video

```svelte
<HowItWorksVideo 
  title="How Numerology Works"
  videoUrl="/videos/numerology-demo.mp4"
  posterUrl="/images/numerology-poster.jpg"
  steps={numerologySteps}
/>
```

---

## Example 5: Custom Placeholder

```svelte
<HowItWorksVideo 
  title="How I Ching Works"
  placeholderIcon="☯️"
  placeholderText="I Ching Consultation Demo"
  placeholderSubtext="Interactive demo coming soon"
  steps={iChingSteps}
/>
```

---

## Example 6: Without Video Section

```svelte
<HowItWorksVideo 
  title="How Palmistry Works"
  showVideo={false}
  steps={palmistrySteps}
/>
```

---

## Example 7: More Than 3 Steps

The grid automatically adjusts for different numbers of steps:

```svelte
<script>
  const astrologysteps: Step[] = [
    {
      title: "Birth Chart",
      description: "Enter your birth date, time, and location.",
      icon: "🌟"
    },
    {
      title: "Planetary Positions",
      description: "Calculate exact positions of celestial bodies.",
      icon: "🪐"
    },
    {
      title: "House Analysis",
      description: "Analyze the 12 houses of your chart.",
      icon: "🏛️"
    },
    {
      title: "Aspects",
      description: "Interpret planetary relationships.",
      icon: "🔗"
    },
    {
      title: "Reading",
      description: "Receive your personalized interpretation.",
      icon: "📜"
    }
  ];
</script>

<HowItWorksVideo 
  title="How Vedic Astrology Works"
  steps={astrologysteps}
/>
```

The grid will automatically create a responsive layout for any number of steps.

---

## Example 8: Shell Casting (Full Configuration)

```svelte
<script>
  import HowItWorksVideo, { type Step } from '$lib/components/HowItWorksVideo.svelte';

  const shellCastingSteps: Step[] = [
    {
      title: "Cast the Shells",
      description: "Tap or shake to cast the sacred shells. Each shell carries its own meaning and energy.",
      icon: "🐚"
    },
    {
      title: "Read the Pattern",
      description: "Our AI interprets the pattern using traditional divination wisdom combined with your question.",
      icon: "✨"
    },
    {
      title: "Receive Guidance",
      description: "Get specific, actionable insights with timing windows and clear next steps.",
      icon: "🔮"
    }
  ];
</script>

<HowItWorksVideo 
  title="How Shell Casting Works"
  videoUrl="/videos/shell-casting.mp4"
  posterUrl="/images/shell-casting-poster.jpg"
  placeholderIcon="🐚"
  placeholderText="Shell Casting Video Demo"
  placeholderSubtext="Video coming soon"
  steps={shellCastingSteps}
/>
```

---

## Tips

1. **Icons**: Use emojis for cross-platform compatibility, or use icon components if needed.
2. **Step Count**: The component works best with 2-5 steps. More than 5 will create a scrollable grid on mobile.
3. **Video Format**: MP4 is recommended for best browser compatibility.
4. **Accessibility**: The component maintains semantic HTML with proper heading hierarchy.

---

## Responsive Behavior

- **Desktop**: Steps display in a grid (3 columns by default, adjusts for more/fewer steps)
- **Mobile**: Steps stack vertically (1 column)
- **Video**: Always scales to 100% width with max-width of 900px

