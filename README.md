# Advaith Santhosh — Game Designer Portfolio

A professional black-and-white **paper / sketchbook inspired game designer portfolio** made with HTML, CSS and JavaScript.

## Features

- Responsive GitHub Pages website
- Sketch / paper visual style
- Animated scroll reveals
- Handwritten typography
- Custom cursor on desktop
- Game project showcase
- Project image support
- Gameplay video support
- Google Play button per game
- Animated project modal
- Built-in playable hero mini-game
- Keyboard, mouse and touch controls
- Score + lives + restart
- Mobile navigation
- No backend required

## 100% configuration

The main file you edit is:

`config.js`

You can change:

- Name
- Role
- Hero text
- About text
- Email
- LinkedIn
- Instagram
- GitHub
- Mini-game settings
- Mini-game difficulty
- Mini-game title
- Projects
- Project descriptions
- Project screenshots
- Project videos
- Play Store links
- Project tags
- Skills
- Website colors

You normally do not need to edit `index.html`.

---

# Add a game

Open `config.js` and add another object inside `projects`.

Example:

```js
{
  title: "My New Game",
  category: "3D · Action",
  year: "2026",
  description: "This is my game. I designed the mechanics, levels and player experience.",
  image: "assets/projects/my-new-game.jpg",
  video: "assets/projects/my-new-game.mp4",
  playStore: "https://play.google.com/store/apps/details?id=YOUR_GAME_ID",
  tags: ["Game Design", "Unity", "Level Design"]
}
```

## Add the image

Put the image here:

`assets/projects/my-new-game.jpg`

## Add gameplay video

Put the MP4 here:

`assets/projects/my-new-game.mp4`

Then set:

```js
video: "assets/projects/my-new-game.mp4"
```

If you do not have a video, use:

```js
video: ""
```

## Add Play Store link

```js
playStore: "https://play.google.com/store/apps/details?id=YOUR_GAME_ID"
```

If the game is not published yet:

```js
playStore: ""
```

---

# Mini-game configuration

The hero mini-game is also controlled from `config.js`.

```js
miniGame: {
  enabled: true,
  title: "SKETCH DODGER",
  hint: "MOVE WITH ← → / A D",
  canvasWidth: 520,
  canvasHeight: 340,

  playerSpeed: 7,
  obstacleSpeed: 2.7,
  spawnRate: 45,
  maxLives: 3
}
```

### Make it harder

Increase:

```js
obstacleSpeed: 4
```

and decrease:

```js
spawnRate: 25
```

### Make the player faster

```js
playerSpeed: 10
```

### Disable the mini-game

```js
enabled: false
```

---

# GitHub Pages setup

## 1. Create repository

Create a GitHub repository such as:

`advaith-game-portfolio`

## 2. Upload these files

Upload the complete contents:

```text
index.html
style.css
script.js
config.js
README.md
assets/
```

Do not upload only the ZIP.

## 3. Add your media

Put your game screenshots/videos inside:

```text
assets/projects/
```

## 4. Edit config.js

Change your:

- Email
- Social links
- Games
- Images
- Videos
- Play Store links
- Skills

## 5. Enable GitHub Pages

Repository:

**Settings → Pages**

Under deployment:

**Deploy from a branch**

Select:

**main**

Select:

**/ (root)**

Press:

**Save**

GitHub will give you your portfolio URL.

---

# Recommended project media

For the best visual result:

### Images

- JPG / PNG / WebP
- 16:10 or 16:9
- 1600px+ wide
- Gameplay screenshots
- Game cover art
- Character art
- Level screenshots

### Videos

- MP4
- H.264
- 1080p recommended
- Keep individual videos reasonably compressed

---

# Important

This is a static website.

There is:

- No database
- No server
- No login
- No PHP
- No Node.js required

It works directly on GitHub Pages.
