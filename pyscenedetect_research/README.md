# PySceneDetect Video Splitting Principles

PySceneDetect is a library for detecting scene changes in videos. It can also be used to split a video into individual scenes. This document outlines the core principles behind how PySceneDetect achieves this.

## 1. Scene Detection

The fundamental principle behind PySceneDetect is **scene detection**. The library analyzes a video frame by frame to identify the boundaries between scenes. A scene is defined as a continuous sequence of frames shot from a single camera. A "scene cut" or "scene transition" marks the boundary between two scenes.

PySceneDetect detects these cuts by comparing the content of consecutive frames. When a significant difference is detected, it marks that point as a scene boundary.

## 2. Detection Algorithms

PySceneDetect offers several algorithms for scene detection, each suited for different types of scene transitions:

*   **`ContentDetector`**: This is the most common detector, designed to find fast, abrupt cuts between scenes. It works by calculating a difference metric between consecutive frames, typically based on changes in color and luminance. If this difference exceeds a certain threshold, a cut is detected.

*   **`ThresholdDetector`**: This detector is used to find gradual transitions, such as fades in and out. It works by monitoring the average brightness (or color intensity) of each frame. When the frame's brightness crosses a specified threshold (e.g., fades to black), it marks a scene boundary.

*   **`AdaptiveDetector`**: This is an extension of the `ContentDetector`. It's designed to be more robust in videos with high motion or rapid changes in lighting that are not actual scene cuts. It adapts its threshold based on the content of the video, making it less likely to produce false positives.

## 3. Generating a Scene List

After analyzing the video, PySceneDetect generates a **scene list**. This is a list of tuples, where each tuple represents a scene and contains the start and end timecodes (or frame numbers) for that scene.

This scene list is the primary output of the detection process and serves as the input for the video splitting step.

## 4. Video Splitting

PySceneDetect itself does not contain the logic for splitting video files. Instead, it leverages powerful, external command-line tools to perform this task. The most common tools used are:

*   **`ffmpeg`**
*   **`mkvmerge`**

By providing the scene list (start and end times) to these tools, PySceneDetect can automate the process of cutting the original video into a set of smaller video clips, with each clip corresponding to a detected scene. The `split_video_ffmpeg` and `split_video_mkvmerge` functions in the library are wrappers around these command-line tools.
