# Arena Survival AI – Initial Project Plan

## Overview

This project is a small game developed as part of a university course (voluntary) assignment.

The goal is to:

- build a simple real-time game
- implement an AI agent that can play it automatically

---

## Idea

- 2D top-down arena game
- Player survives against continuously spawning enemies
- Score is based on survival time

Two modes:

- Human-controlled player
- AI-controlled player

---

## Required Features (Course Requirements)

The game will include:

- Random elements (enemy spawning, events)
- Timed events
- An AI agent that plays the game automatically

---

## AI player

The AI player will:

- observe the game state
- decide movement/actions
- react to dynamic situations

Possible approach (to be tested):

- simple heuristic-based movement
- potential field–style navigation

---

## Technical Approach

The game is developed as a web-based production version to ensure cross-platform accessibility.

- **Engine:** **Phaser 3** (HTML5 Game Framework) for 2D rendering and physics.
- **Language:** **TypeScript** to ensure robust state management for the AI agent.
- **Bundler:** **Vite** for fast development and optimized production builds.
- **AI Implementation:** Vector-based movement and **Potential Field Navigation** for dynamic obstacle avoidance.
- **Hosting:** Automated deployment via **GitHub Pages** or **Vercel**.

---

## Development Plan (High-Level)

1. Create basic window and rendering
2. Implement player movement
3. Add enemies and spawning
4. Add game logic (health, score)
5. Implement AI player
6. Improve AI behavior
7. Add polish (UI, tweaks)

---

## Documentation of AI Usage

AI tools (such as ChatGPT/Claude) are used in this project as allowed in the course assignment and general university guidelines:

- brainstorming ideas
- "vibe coding" the game
- generating documentation tempates, like this one (used for internal project management, not as a graded course deliverable)

AI tools will not be used for creating the AI player in the game.

---
