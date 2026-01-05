#!/usr/bin/env python3
"""
PySceneDetect Demo Script

This script demonstrates how to use PySceneDetect to detect scene changes in videos.
It supports multiple detection methods and outputs results in various formats.

Usage:
    python demo.py <video_path> [output_dir]

Examples:
    python demo.py video.mp4
    python demo.py video.mp4 output
"""

import sys
import os
from scenedetect import VideoManager, SceneManager
from scenedetect.detectors import ContentDetector, AdaptiveDetector, ThresholdDetector
from scenedetect.scene_manager import save_images


def detect_scenes(video_path, output_dir='output'):
    """Detect scenes in the given video using multiple methods."""

    if not os.path.exists(video_path):
        print(f"Error: Video file not found: {video_path}")
        sys.exit(1)

    os.makedirs(output_dir, exist_ok=True)

    print(f"\n{'='*60}")
    print(f"Processing video: {os.path.basename(video_path)}")
    print(f"{'='*60}\n")

    # Method 1: Content-Aware Detection
    print("Method 1: Content-Aware Detection")
    print("-" * 60)
    video_manager = VideoManager([video_path])
    video_manager.set_downscale_factor()
    scene_manager = SceneManager()
    scene_manager.add_detector(ContentDetector(threshold=30.0))
    video_manager.start()
    scene_manager.detect_scenes(frame_source=video_manager)

    scene_list = scene_manager.get_scene_list()
    print(f"Number of scenes detected: {len(scene_list)}")

    for i, scene in enumerate(scene_list[:5]):
        print(f"Scene {i + 1}: Start {scene[0].get_timecode()}, End {scene[1].get_timecode()}, "
              f"Duration: {scene[1].get_frames() - scene[0].get_frames()} frames")

    if len(scene_list) > 5:
        print(f"... and {len(scene_list) - 5} more scenes")

    video_manager.release()

    # Method 2: Adaptive Detection
    print("\nMethod 2: Adaptive Detection")
    print("-" * 60)
    video_manager = VideoManager([video_path])
    video_manager.set_downscale_factor()
    scene_manager = SceneManager()
    scene_manager.add_detector(AdaptiveDetector())
    video_manager.start()
    scene_manager.detect_scenes(frame_source=video_manager)

    scene_list = scene_manager.get_scene_list()
    print(f"Number of scenes detected: {len(scene_list)}")

    for i, scene in enumerate(scene_list[:5]):
        print(f"Scene {i + 1}: Start {scene[0].get_timecode()}, End {scene[1].get_timecode()}, "
              f"Duration: {scene[1].get_frames() - scene[0].get_frames()} frames")

    if len(scene_list) > 5:
        print(f"... and {len(scene_list) - 5} more scenes")

    video_manager.release()

    # Method 3: Threshold-Based Detection
    print("\nMethod 3: Threshold-Based Detection")
    print("-" * 60)
    video_manager = VideoManager([video_path])
    video_manager.set_downscale_factor()
    scene_manager = SceneManager()
    scene_manager.add_detector(ThresholdDetector(threshold=12, min_scene_len=15))
    video_manager.start()
    scene_manager.detect_scenes(frame_source=video_manager)

    scene_list = scene_manager.get_scene_list()
    print(f"Number of scenes detected: {len(scene_list)}")

    for i, scene in enumerate(scene_list[:5]):
        print(f"Scene {i + 1}: Start {scene[0].get_timecode()}, End {scene[1].get_timecode()}, "
              f"Duration: {scene[1].get_frames() - scene[0].get_frames()} frames")

    if len(scene_list) > 5:
        print(f"... and {len(scene_list) - 5} more scenes")

    video_manager.release()

    # Method 4: Content-Aware with Image Saving
    print("\nMethod 4: Content-Aware Detection with Image Saving")
    print("-" * 60)
    video_manager = VideoManager([video_path])
    video_manager.set_downscale_factor()
    scene_manager = SceneManager()
    scene_manager.add_detector(ContentDetector(threshold=30.0))

    image_output_dir = os.path.join(output_dir, 'images')
    os.makedirs(image_output_dir, exist_ok=True)

    video_manager.start()
    scene_manager.detect_scenes(frame_source=video_manager)
    scene_list = scene_manager.get_scene_list()

    print(f"Saving scene images to: {image_output_dir}")
    save_images(
        scene_list,
        video_manager,
        output_dir=image_output_dir,
        num_images=1,
        image_name_template='scene-$SCENE_NUMBER-$IMAGE_NUMBER'
    )

    print(f"Saved {len(scene_list)} scene boundary images")

    video_manager.release()

    # Summary
    print("\n" + "="*60)
    print("Summary")
    print("="*60)
    print(f"Video processed successfully!")
    print(f"Output directory: {output_dir}")
    print(f"Scene images saved to: {image_output_dir}")
    print("="*60 + "\n")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python demo.py <video_path> [output_dir]")
        print("\nExamples:")
        print("  python demo.py video.mp4")
        print("  python demo.py video.mp4 output")
        sys.exit(1)

    video_path = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else 'output'

    detect_scenes(video_path, output_dir)
