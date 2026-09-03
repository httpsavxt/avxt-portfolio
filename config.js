/*
Normal workflow:
1. Change text/links below.
2. Put images/videos in assets/projects/
3. Upload the folder to GitHub.
4. GitHub Pages will serve the site.
*/

const CONFIG = {

  // ---------------- PERSONAL ----------------
  personal: {
    name: "Advaith Santhosh",
    role: "Game Designer & Developer",
    heroEyebrow: "GAME DESIGNER · DEVELOPER · CREATIVE",
    heroDescription:
      "Hi, I'm Advaith — a B.S.c game design & development student who loves creating mechanics, worlds, characters and experiences that make people want to play.",
    aboutOne:
      "I enjoy taking an idea from a rough sketch to a playable experience. I like thinking about game loops, player motivation, level flow, interaction, visual language and the small details that make a game feel alive.",
    aboutTwo:
      "Currently studying Game Design & Development, I am constantly experimenting, prototyping and learning."
  },

  // ---------------- CONTACT ----------------
  contact: {
    email: "httpsavxt@gmail.com",
    socials: {
      LinkedIn: "https://www.linkedin.com/in/avxt/",
      Artstation: "https://www.artstation.com/avxt",
      GitHub: "https://github.com/httpsavxt"
    }
  },

  // ---------------- MINI GAME ----------------
  // Set enabled:false if you don't want the mini-game.
  miniGame: {
    enabled: true,
    title: "SKETCH DODGER",
    hint: "MOVE WITH ← → / A D",
    canvasWidth: 520,
    canvasHeight: 340,

    // Difficulty
    playerSpeed: 7,
    obstacleSpeed: 2.7,
    spawnRate: 45,
    maxLives: 3,

    // Visual settings
    background: "#f1efe6",
    ink: "#111111",
    playerFill: "#fffef8"
  },

  // ---------------- PROJECTS ----------------
  // Duplicate a project object to add more games.
  projects: [
    {
      title: "Catch It!",
      category: "2D · Casual Game",
      year: "2025",
      description:
        "A 2D arcade-style game based on catching falling apples while identifying and avoiding russet apples.",
      image: "assets/projects/catch-it.png",
      video: "",
      playStore: "https://drive.google.com/file/d/1uCPX_OB3CK7xIILTLFL5KgxTGOTUZ_8e/view?usp=drive_link",
      tags: ["Game Design", "2D", "UI / UX"]
    },

    {
      title: "Eggsplosive Duck",
      category: "2D · Hypercasual",
      year: "2025",
      description:
        "A humorous time-based 2D game where the player controls a flying duck and attempts to drop eggs on people travelling to work and students travelling to school.",
      image: "assets/projects/eggsplosive-duck.png",
      video: "",
      playStore: "https://drive.google.com/file/d/1CJbaJ-GqRc5RYYrpmRwkQ3jqGQLwXub7/view?usp=drive_link",
      tags: ["Game Design", "Prototype", "Mechanics"]
    },

  
  ],

  // ---------------- SKILLS ----------------
  skills: [
    "Game Design",
    "Game Mechanics",
    "Level Design",
    "3D Modelling",
    "Game Documentation",
    "Concept Development",
    "Prototyping",
    "Prompt Engineering"
  ],

  // ---------------- VISUAL ----------------
  theme: {
    paper: "#f7f6f0",
    ink: "#111111",
    paperDark: "#ebe9e0",
    muted: "#68665f"
  }
};