# Tarot Cards - Fixed Issues Summary

## Issues Fixed

### 1. ✅ Unique Card Selection
**Problem:** Cards could potentially be selected multiple times from the fan.

**Solution:**
- Already implemented `usedCardIds` tracking in `TarotTable.svelte`
- Cards are added to `usedCardIds` array when placed (line 130)
- `FanDeck.svelte` checks if a card is already used before allowing selection (line 55)
- Used cards are visually disabled and cannot be clicked

### 2. ✅ Visual Highlighting of Selected Cards

**Problem:** Selected cards in the fan deck weren't visually distinct enough.

**Solution:**
- Enhanced `.used` class styling in `FanDeck.svelte`:
  - Opacity reduced to 0.2 (from 0.3)
  - Full grayscale filter applied
  - Brightness reduced to 50%
  - Scaled down to 95% size
  - Pointer events disabled
  - Border color changed to darker gray (#444)

**Placed cards on table:**
- Added `.selected` class to slots with placed cards
- Blue glow effect applied to selected slots

### 3. ✅ Content Only Shows When Flipped

**Problem:** Card content sometimes appeared immediately when selected.

**Solution:**
- Updated `TarotCard.svelte` to only show card details when BOTH conditions are met:
  1. Card is placed (`card` exists)
  2. Card is face up (`faceUp` is true)
- When card is face down, front face shows only "—" placeholder
- Content rendering logic simplified:
  ```svelte
  {#if card && faceUp}
    <!-- Show full card details -->
  {:else}
    <!-- Show blank placeholder -->
  {/if}
  ```

### 4. ✅ Fixed Reversed Card Display

**Problem:** Reversed cards showed content upside down after flipping.

**Solution:**
- Fixed CSS transform logic in `TarotCard.svelte`:
  - Normal flip: `rotateY(180deg)` (shows front)
  - Reversed flip: `rotateY(180deg) rotateZ(180deg)` (shows front upside down)
  - **Key fix:** Reversed rotation only applies when card is BOTH `.rev` AND `.flipped`
  - Face-down cards always show the same back regardless of reversed status

### 5. ✅ Fixed "Flip All" Functionality

**Problem:** "Flip All" might have been flipping already flipped cards.

**Solution:**
- Updated `flipAll()` function to only flip cards that are:
  1. Placed in a slot
  2. Not already face up
- Code now checks both conditions before flipping:
  ```javascript
  if (placed[p.id] && !faceUp[p.id]) {
    faceUp[p.id] = true;
  }
  ```
- Prevents unnecessary re-flipping and state issues

## User Experience Improvements

### Card Selection Flow
1. **Select from fan** → Card becomes heavily dimmed, grayscaled, and slightly smaller
2. **Card placed on table** → Slot gets subtle blue glow indicating it's filled
3. **Card face down** → Shows only card back with "TAROT" badge
4. **Click to flip** → Card rotates 180° to reveal content
5. **Reversed cards** → Content appears upside down when flipped

### Visual Feedback
- **Unselected cards in fan**: Full color, normal size
- **Selected/used cards in fan**: 20% opacity, grayscale, 95% size, darker border
- **Empty slots**: Dashed border with position label
- **Armed slots** (ready for placement): Gold glow
- **Filled slots**: Blue glow
- **Face-down cards**: Show decorative back
- **Face-up cards**: Show name, arcana, keywords
- **Reversed cards**: Have "reversed" badge and show reversed keywords

## Testing Checklist

✅ Select a card from fan → Should become dimmed and unclickable  
✅ Select same card again → Should be prevented (already used)  
✅ Place card on table → Should appear face down  
✅ Click card → Should flip and reveal content  
✅ Click reversed card → Should flip and show content upside down (with correct orientation)  
✅ Click "Flip All" → All placed face-down cards should flip  
✅ Click "Flip All" again → Should not cause issues (already flipped cards remain flipped)  
✅ Reset → All cards return to fan, tracking resets  

## Code Files Modified

1. **`src/lib/tarot/TarotCard.svelte`**
   - Fixed reversed card CSS transform logic
   - Fixed content visibility logic (only show when faceUp)

2. **`src/lib/tarot/TarotTable.svelte`**
   - Improved `flipAll()` to check if cards are already flipped
   - Added visual `selected` class to filled slots

3. **`src/lib/tarot/FanDeck.svelte`**
   - Enhanced visual styling for used/selected cards
   - Already had proper prevention logic for re-selection

## Notes

- The `usedCardIds` tracking was already implemented and working correctly
- Main issues were visual feedback and the reversed card display bug
- All fixes maintain the existing reactive state management
- No breaking changes to the component API or props

