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
<img width="1866" height="965" alt="image" src="https://github.com/user-attachments/assets/99838606-e442-4764-a57b-e924aacccb44" />

<img width="1841" height="980" alt="image" src="https://github.com/user-attachments/assets/ff94a69b-2a84-4f37-bd06-c4fbdf142ed8" />

<img width="1898" height="969" alt="image" src="https://github.com/user-attachments/assets/593cad25-1a4d-436a-81e4-68dd560bbd43" />


<img width="1899" height="978" alt="image" src="https://github.com/user-attachments/assets/4337391b-7f00-4ba2-b6c2-db27c4a92ed4" />


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
