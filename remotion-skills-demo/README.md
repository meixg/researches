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

This project has been updated to include a more complex, multi-scene brand promotional video, showcasing a wider range of animation and transition effects.

### Composition

This project contains a single video composition: **BrandVideo**, a complex, multi-scene brand promotional video.

### Skills Demonstrated in the Brand Video

*   **Complex Multi-scene Composition:** The video uses `<TransitionSeries>` to orchestrate a narrative flow with an intro, three feature showcases, and an outro.
*   **Advanced Transitions:** It employs a variety of transitions (`slide`, `wipe`) to create a dynamic viewing experience.
*   **Component-Based Scenes:** Each scene (`Intro`, `FeatureScene`, `Outro`) is a reusable React component.
*   **Prop-driven Content:** The `FeatureScene` component is reused with different props (icon, title, description) to showcase different brand features.
*   **Complex Animation:** The video includes spring animations for logos, staggered text animations, and coordinated slide-ins for icons.

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
    In the Studio, you can switch between the `SkillsDemo` and `BrandVideo` compositions.
    ```bash
    npm start
    ```
4.  **Render the Brand Video to a file:**
    The `render` script is configured to render the `BrandVideo` composition by default.
    ```bash
    npm run render
    ```
    This will create an `out.mp4` file in the project directory.
