# Remotion Skills Demo

This project is a demonstration of the concepts and best practices learned from the `@remotion/skills` repository. It showcases a multi-scene animation with a transition, a text animation, and a data visualization.

## How to Run

1.  Install the dependencies:
    ```bash
    npm install
    ```
2.  Start the Remotion Studio:
    ```bash
    npm start
    ```
3.  Render the video:
    ```bash
    npm run render
    ```
    This will create an `out.mp4` file in the project directory.

## Skills Demonstrated

*   **Multi-scene composition:** The project uses the `@remotion/transitions` library to create a multi-scene composition with a slide transition.
*   **Text animation:** Scene 1 demonstrates a simple text fade-in animation using `useCurrentFrame` and `interpolate`.
*   **Data visualization:** Scene 2 demonstrates a staggered bar chart animation, applying the pattern from the `charts.md` skill.
*   **Best practices:** The project adheres to the best practice of using `useCurrentFrame` for all animations.
