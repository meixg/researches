# Research on @remotion/skills

This document summarizes the findings from researching the `@remotion/skills` repository.

## Purpose

The `@remotion/skills` repository is not a traditional software library, but rather a knowledge base of best practices for creating videos with [Remotion](https://www.remotion.dev/). It provides a set of "skills" that codify the recommended patterns and techniques for various aspects of video creation.

## Skills

The repository covers a wide range of skills, which can be categorized as follows:

*   **Animations:** The core principle is that all animations must be driven by the `useCurrentFrame()` hook. The repository provides examples of how to create various animations, such as fades, slides, and wipes.
*   **Transitions:** The repository demonstrates how to use the `@remotion/transitions` library to create seamless transitions between scenes.
*   **Styling:** The repository shows how to use TailwindCSS for styling, with the caveat that animation-related classes should not be used.
*   **Data Visualization:** The repository provides examples of how to create charts and other data visualizations, again with the emphasis on using `useCurrentFrame()` for animations.
*   **Assets:** The repository covers how to import and use various assets, such as images, videos, audio, and fonts.
*   **Typography:** The repository provides guidance on how to work with text, including how to measure text dimensions and fit text to containers.

## Potential for AI Agents

This repository has significant potential for training AI agents to generate high-quality Remotion code. The clear and concise rules, along with the code examples, provide a perfect dataset for an AI to learn from. By training on this repository, an AI agent could learn to:

*   **Adhere to best practices:** The agent would learn to use the `useCurrentFrame()` hook for all animations, which is a critical aspect of Remotion development.
*   **Generate complex animations and transitions:** The agent would be able to generate code for a wide variety of animations and transitions, based on the examples in the repository.
*   **Create data visualizations:** The agent would be able to generate code for charts and other data visualizations.
*   **Work with various assets:** The agent would be able to generate code for importing and using various assets.

In conclusion, the `@remotion/skills` repository is a valuable resource for both human developers and AI agents. It provides a clear and concise set of best practices for creating videos with Remotion, and it has the potential to significantly improve the quality of AI-generated Remotion code.
