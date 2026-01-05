#!/bin/bash
# PySceneDetect Command-Line Demo

if [ $# -lt 1 ]; then
    echo "Usage: ./cli_demo.sh <video_path> [output_dir]"
    echo ""
    echo "Examples:"
    echo "  ./cli_demo.sh video.mp4"
    echo "  ./cli_demo.sh video.mp4 output"
    echo "  ./cli_demo.sh ../py_scene_detect/test-video.mp4 output"
    exit 1
fi

VIDEO="$1"
OUTPUT_DIR="${2:-output}"

echo "PySceneDetect Command-Line Examples"
echo "===================================="
echo "Video: $VIDEO"
echo "Output: $OUTPUT_DIR"
echo "===================================="

mkdir -p "$OUTPUT_DIR"

# Example 1: Detect content-based scenes and save as CSV
echo ""
echo "Example 1: Detect content-based scenes and save as CSV"
echo "-------------------------------------------------------"
scenedetect -i "$VIDEO" detect-content list-scenes -o "$OUTPUT_DIR"

# Example 2: Detect scenes and save images
echo ""
echo "Example 2: Detect scenes and save boundary images"
echo "-------------------------------------------------"
scenedetect -i "$VIDEO" detect-content save-images -o "$OUTPUT_DIR"

# Example 3: Detect scenes and generate HTML report
echo ""
echo "Example 3: Detect scenes and generate HTML report"
echo "--------------------------------------------------"
scenedetect -i "$VIDEO" -o "$OUTPUT_DIR" detect-content save-html

# Example 4: Detect adaptive scenes
echo ""
echo "Example 4: Detect scenes using adaptive detector"
echo "-------------------------------------------------"
scenedetect -i "$VIDEO" detect-adaptive list-scenes -o "$OUTPUT_DIR/adaptive"

# Example 5: Detect with threshold detector (for fades)
echo ""
echo "Example 5: Detect scenes using threshold detector"
echo "-------------------------------------------------"
scenedetect -i "$VIDEO" detect-threshold list-scenes -o "$OUTPUT_DIR/threshold"

# Example 6: Detect and split video
echo ""
echo "Example 6: Detect scenes and split into clips"
echo "---------------------------------------------"
scenedetect -i "$VIDEO" detect-content split-video -o "$OUTPUT_DIR/clips"

echo ""
echo "All examples completed. Check the $OUTPUT_DIR directory for results."
