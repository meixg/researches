#!/usr/bin/env python3
"""
PySceneDetect Detector Comparison Script

This script compares different detection methods on a video and provides
recommendations based on the results.

Usage:
    python compare_detectors.py <video_path> [output_dir]

Examples:
    python compare_detectors.py video.mp4
    python compare_detectors.py video.mp4 output
"""

import sys
import os
from scenedetect import VideoManager, SceneManager
from scenedetect.detectors import ContentDetector, AdaptiveDetector, ThresholdDetector


def compare_detectors(video_path, output_dir='output'):
    """Compare different detection methods on the same video."""

    if not os.path.exists(video_path):
        print(f"Error: Video file not found: {video_path}")
        sys.exit(1)

    os.makedirs(output_dir, exist_ok=True)

    print(f"\n{'='*60}")
    print(f"Analyzing: {os.path.basename(video_path)}")
    print(f"{'='*60}\n")

    results = {}

    # Method 1: Content Detector
    print("Method 1: Content Detector")
    print("-" * 60)
    video_manager = VideoManager([video_path])
    video_manager.set_downscale_factor()
    scene_manager = SceneManager()
    scene_manager.add_detector(ContentDetector(threshold=30.0))
    video_manager.start()
    scene_manager.detect_scenes(frame_source=video_manager)

    scene_list = scene_manager.get_scene_list()
    total_frames = scene_list[-1][1].get_frames() if scene_list else 0
    duration = total_frames / 30.0  # Assuming 30 FPS

    print(f"Duration: {duration:.2f} seconds ({total_frames} frames)")
    print(f"Number of scenes detected: {len(scene_list)}")
    print(f"Average shot length: {duration / len(scene_list):.2f} seconds")

    for i, scene in enumerate(scene_list[:5]):
        duration_sec = (scene[1].get_frames() - scene[0].get_frames()) / 30.0
        print(f"  Scene {i + 1}: {scene[0].get_timecode()} - {scene[1].get_timecode()} "
              f"({duration_sec:.2f}s)")

    if len(scene_list) > 5:
        print(f"  ... and {len(scene_list) - 5} more scenes")

    results['content'] = {
        'scenes': len(scene_list),
        'avg_shot': duration / len(scene_list)
    }
    video_manager.release()

    # Method 2: Adaptive Detector
    print("\nMethod 2: Adaptive Detector")
    print("-" * 60)
    video_manager = VideoManager([video_path])
    video_manager.set_downscale_factor()
    scene_manager = SceneManager()
    scene_manager.add_detector(AdaptiveDetector())
    video_manager.start()
    scene_manager.detect_scenes(frame_source=video_manager)

    scene_list = scene_manager.get_scene_list()
    print(f"Number of scenes detected: {len(scene_list)}")
    print(f"Average shot length: {duration / len(scene_list):.2f} seconds")

    for i, scene in enumerate(scene_list[:5]):
        duration_sec = (scene[1].get_frames() - scene[0].get_frames()) / 30.0
        print(f"  Scene {i + 1}: {scene[0].get_timecode()} - {scene[1].get_timecode()} "
              f"({duration_sec:.2f}s)")

    if len(scene_list) > 5:
        print(f"  ... and {len(scene_list) - 5} more scenes")

    results['adaptive'] = {
        'scenes': len(scene_list),
        'avg_shot': duration / len(scene_list)
    }
    video_manager.release()

    # Method 3: Threshold Detector
    print("\nMethod 3: Threshold Detector (for fades)")
    print("-" * 60)
    video_manager = VideoManager([video_path])
    video_manager.set_downscale_factor()
    scene_manager = SceneManager()
    scene_manager.add_detector(ThresholdDetector(threshold=12, min_scene_len=15))
    video_manager.start()
    scene_manager.detect_scenes(frame_source=video_manager)

    scene_list = scene_manager.get_scene_list()
    print(f"Number of scenes detected: {len(scene_list)}")
    if len(scene_list) > 0:
        avg_shot = duration / len(scene_list)
        print(f"Average shot length: {avg_shot:.2f} seconds")

        for i, scene in enumerate(scene_list[:5]):
            duration_sec = (scene[1].get_frames() - scene[0].get_frames()) / 30.0
            print(f"  Scene {i + 1}: {scene[0].get_timecode()} - {scene[1].get_timecode()} "
                  f"({duration_sec:.2f}s)")

        if len(scene_list) > 5:
            print(f"  ... and {len(scene_list) - 5} more scenes")
    else:
        avg_shot = 0
        print("No scenes detected (no fades found)")

    results['threshold'] = {
        'scenes': len(scene_list),
        'avg_shot': avg_shot
    }
    video_manager.release()

    # Summary
    print("\n" + "="*60)
    print("Summary")
    print("="*60)
    print(f"Video duration: {duration:.2f} seconds")
    print(f"\nDetection Results:")
    print(f"  Content Detector:  {results['content']['scenes']:2d} scenes "
          f"({results['content']['avg_shot']:.2f}s avg)")
    print(f"  Adaptive Detector: {results['adaptive']['scenes']:2d} scenes "
          f"({results['adaptive']['avg_shot']:.2f}s avg)")
    if results['threshold']['scenes'] > 0:
        print(f"  Threshold Detector:{results['threshold']['scenes']:2d} scenes "
              f"({results['threshold']['avg_shot']:.2f}s avg)")
    else:
        print(f"  Threshold Detector:  0 scenes (no fades detected)")

    print(f"\nRecommendation:")
    if results['content']['scenes'] >= 15:
        print("  - This video has frequent scene changes")
        print("  - Content or Adaptive detectors work best")
        print("  - Threshold detector is less suitable for hard cuts")
    elif results['content']['scenes'] >= 5:
        print("  - This video has moderate scene changes")
        print("  - Content detector provides good balance")
        print("  - Adaptive detector may detect additional boundaries")
    else:
        print("  - This video has few scene changes")
        print("  - All detectors perform reasonably well")
        print("  - Choose based on your specific needs")

    print("="*60 + "\n")

    return results


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python compare_detectors.py <video_path> [output_dir]")
        print("\nExamples:")
        print("  python compare_detectors.py video.mp4")
        print("  python compare_detectors.py video.mp4 output")
        sys.exit(1)

    video_path = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else 'output'

    compare_detectors(video_path, output_dir)
