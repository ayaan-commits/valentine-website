# Valentine Website - Development Plan

## Current Status
Basic template working with 4 pages:
- [x] Envelope (tap to open)
- [x] Hello (typewriter effect)
- [x] Question (Yes/No with runaway button)
- [x] Celebration (confetti)

---

## Target Flow (8 pages)

```
Envelope → Hello → Reasons → Question → Celebration → Surprise → Final Letter
```

| # | Page | Status | Description |
|---|------|--------|-------------|
| 1 | Envelope | ✅ Done | Tap to open animation |
| 2 | Hello | ✅ Done | "Hey You..." typewriter |
| 3 | Reasons | ✅ Done | "I like you because..." animated list |
| 4 | Question | ✅ Done | "Will you be my Valentine?" |
| 5 | Celebration | ✅ Done | "YAYYYY!" with confetti |
| 6 | Surprise | ❌ TODO | Suspense → reveal (date plan/gift) |
| 7 | Final Letter | ❌ TODO | Personal message + photos |

---

## Pages to Build

### Page 3: Reasons Page
**Purpose:** Show why you like/love them

**Elements:**
- [x] Cute GIF at top
- [x] Title: "I like you because..."
- [x] 5 reasons that slide in one by one
- [x] Continue button (appears after all reasons show)

**Content needed:**
```
Reason 1: _______________
Reason 2: _______________
Reason 3: _______________
Reason 4: _______________
Reason 5: _______________
```

---

### Page 6: Surprise Reveal
**Purpose:** Build suspense then reveal something special

**Elements:**
- [ ] Suspense animation (loading hearts)
- [ ] 3 second delay
- [ ] Reveal: date plan / gift / trip / special message
- [ ] Yes button to continue

**Content needed:**
```
Surprise title: _______________
Surprise details: _______________
Date (if applicable): _______________
```

---

### Page 7: Final Letter
**Purpose:** Personal heartfelt message with photos

**Elements:**
- [ ] Photo gallery (2-3 polaroid frames)
- [ ] Long typewriter message
- [ ] Signature
- [ ] Big animated heart

**Content needed:**
```
Photos: (upload 2-3 photos)
Message: _______________
Signature name: _______________
```

---

## Assets Needed

### GIFs (one per page)
| Page | GIF | Status |
|------|-----|--------|
| Hello | cat.gif | ✅ Have |
| Reasons | ? | ❌ Need |
| Question | cat.gif | ✅ Have (need different?) |
| Celebration | rizz.gif | ✅ Have |
| Surprise | ? | ❌ Need |
| Final | ? | ❌ Need |

### Photos
- [ ] Photo 1: ___
- [ ] Photo 2: ___
- [ ] Photo 3: ___

---

## Content to Fill

### Hello Page
- Title: "Hey You..." ✅
- Subtitle: "I have something to ask you..." ✅

### Reasons Page
- Title: "I like you because..."
- Reasons: (USER TO PROVIDE)

### Question Page
- Title: "Will you be my Valentine?" ✅

### Celebration Page
- Title: "YAYYYY!" ✅
- Text: "I knew you'd say yes!" ✅

### Surprise Page
- Suspense text: "I have something special..."
- Reveal: (USER TO PROVIDE)

### Final Letter Page
- Message: (USER TO PROVIDE)
- Signature: (USER TO PROVIDE)

---

## Technical Tasks

- [x] Floating hearts background
- [x] Glassmorphism cards
- [x] Envelope animation
- [x] Typewriter effect
- [x] Runaway No button
- [x] Growing Yes button
- [x] Confetti celebration
- [x] Animated list items (slide in)
- [ ] Suspense loading animation
- [ ] Photo gallery with polaroid frames
- [ ] Different GIF per page

---

## Next Steps

1. **NOW:** Build Reasons page structure
2. **THEN:** User provides content (reasons, messages, photos)
3. **THEN:** Build Surprise + Final Letter pages
4. **THEN:** Add different GIFs
5. **FINAL:** Test full flow & deploy
