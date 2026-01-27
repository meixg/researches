# Remotion Skills: Research and Demonstration

This project combines research on the `@remotion/skills` repository with a practical demonstration of its key concepts.

## Part 1: Research Findings

### Purpose

The `@remotion/skills` repository is not a traditional software library, but rather a knowledge base of best practices for creating videos with [Remotion](https://www.remotion.dev/). It provides a set of "skills" that codify the recommended patterns and techniques for various aspects of video creation.

### Skills Overview

The repository covers a wide range of skills, which can be categorized as follows:

*   **Animations:** The core principle is that all animations must be driven by the `useCurrentFrame()` hook.
*   **Transitions:** It demonstrates how to use the `@remotion/transitions` library to create seamless transitions between scenes.
*   **Styling:** It shows how to use TailwindCSS for styling, with the caveat that animation-related classes should not be used.
*   **Data Visualization:** The repository provides examples of how to create charts and other data visualizations.
*   **Assets & Typography:** The repository covers how to import and use various assets like images, videos, audio, and fonts.

### Potential for AI Agents

This repository has significant potential for training AI agents to generate high-quality Remotion code. The clear and concise rules, along with the code examples, provide a perfect dataset for an AI to learn from, enabling it to adhere to best practices and generate complex animations and transitions.

---

## Part 2: Practical Demonstration

This project demonstrates the concepts and best practices learned from the research. It showcases a multi-scene animation with a transition, a text animation, and a data visualization.

### Skills Demonstrated in this Project

*   **Multi-scene composition:** The project uses the `@remotion/transitions` library to create a multi-scene composition with a slide transition.
*   **Text animation:** Scene 1 demonstrates a simple text fade-in animation using `useCurrentFrame` and `interpolate`.
*   **Data visualization:** Scene 2 demonstrates a staggered bar chart animation, applying the pattern from the `charts.md` skill.
*   **Best practices:** The project adheres to the best practice of using `useCurrentFrame` for all animations.

### How to Run the Demo

1.  **Navigate to the project directory:**
    ```bash
    cd remotion-skills-demo
    ```
2.  **Install the dependencies:**
    ```bash
    npm install
    ```
3.  **Start the Remotion Studio for a live preview:**
    ```bash
    npm start
    ```
4.  **Render the video to a file:**
    ```bash
    npm run render
    ```
    This will create an `out.mp4` file in the project directory.
