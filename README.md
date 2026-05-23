# 🌸 Flower Memory Game

A browser-based memory card matching game with 3 difficulty levels.

## How to Play

1. Open `index.html` in any browser — no build step or server required.
2. Pick a difficulty: **Easy**, **Medium**, or **Hard**.
3. Click cards to flip them and find matching pairs.
4. Match all pairs before running out of moves to win. Each match awards +2 bonus moves.

## Difficulty Levels

| Level  | Grid  | Pairs | Starting Moves |
|--------|-------|-------|----------------|
| Easy   | 4 × 4 | 8     | 35             |
| Medium | 6 × 4 | 12    | 55             |
| Hard   | 6 × 6 | 18    | 70             |

## Project Structure

```
index.html   — markup and layout
style.css    — all styling
game.js      — game logic
flowers.js   — the 18 flower images (inline SVG data URIs)
```

The flower images are embedded directly in `flowers.js`, so there are no
external image requests — the game loads instantly and works fully offline.

## Hosting on GitHub Pages

1. Push all four files to a GitHub repository (keep them in the same folder).
2. Go to **Settings → Pages**.
3. Set source to **main branch / root**.
4. Your game will be live at `https://<your-username>.github.io/<repo-name>/`
