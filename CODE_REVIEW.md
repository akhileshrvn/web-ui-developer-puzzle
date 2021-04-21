# Code Review

## Code

- Check for outdated packages and `npm update`
- Fixed Tests `reading-list.reducer` by adding fail actions in reducer
- Date Pipe

## Lighthouse Accessibility check

- **_Buttons do not have an accessible name_**
  - Failing item the icon buttons
    - Added `aria-label` to icon buttons: search, reading list close, remove from reading list

### Contrast

- **_Background and foreground colors do not have a sufficient contrast ratio_**
  - Reading List button
    - Change Navbar color
      - Changed `$pink-accent` color to `#e20074`
  - `Try searching for a topic, for example` text Too light (barely visible)
    - changed text to use darker gray `$gray60`, Increased Font Weight
