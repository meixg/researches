# PySceneDetect Demo

This project demonstrates the usage of [PySceneDetect](https://github.com/Breakthrough/PySceneDetect), a Python library for detecting scene changes in videos.

## Overview

PySceneDetect is a powerful tool for automatic scene detection and video splitting. It supports multiple detection algorithms and can export results in various formats.

## Installation

```bash
# Create a virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install scenedetect opencv-python
```

Or use the provided requirements file:

```bash
pip install -r requirements.txt
```

## Usage

### Python API (demo.py)

Basic scene detection:

```python
from scenedetect import VideoManager, SceneManager
from scenedetect.detectors import ContentDetector, ThresholdDetector
from scenedetect.scene_manager import save_images

# Load video and detect scenes
video_manager = VideoManager(['video.mp4'])
scene_manager = SceneManager()
scene_manager.add_detector(ContentDetector(threshold=30.0))
video_manager.start()
scene_manager.detect_scenes(frame_source=video_manager)
scene_list = scene_manager.get_scene_list()

# Save scene boundary images
save_images(scene_list, video_manager, output_dir='output/images')
```

**Run the Python demo:**
```bash
source venv/bin/activate
python demo.py video.mp4
python demo.py video.mp4 output
```

### Detector Comparison (compare_detectors.py)

Compare different detection methods:

```bash
source venv/bin/activate
python compare_detectors.py video.mp4
python compare_detectors.py video.mp4 output
```

### Command-Line Interface (cli_demo.sh)

Run multiple examples at once:

```bash
chmod +x cli_demo.sh
./cli_demo.sh video.mp4
./cli_demo.sh video.mp4 output
```

Individual CLI commands:

```bash
# Detect scenes and save as CSV
scenedetect -i video.mp4 detect-content list-scenes -o output/

# Detect scenes and save images
scenedetect -i video.mp4 detect-content save-images -o output/

# Detect scenes and split video into clips
scenedetect -i video.mp4 detect-content split-video -o output/clips/

# Detect scenes and generate HTML report
scenedetect -i video.mp4 -o output/ detect-content save-html

# Use adaptive detector
scenedetect -i video.mp4 detect-adaptive list-scenes -o output/adaptive/

# Use threshold detector (for fades)
scenedetect -i video.mp4 detect-threshold list-scenes -o output/threshold/
```

## Detection Methods

### ContentDetector
- **Purpose**: Detect fast cuts based on HSL color differences
- **Best for**: Videos with hard scene cuts
- **Parameters**: threshold (default 30.0), min_scene_len
- **Performance**: Good accuracy, fast processing (~2000 FPS)

### AdaptiveDetector
- **Purpose**: Detect fast cuts using rolling average of HSL color differences
- **Best for**: Videos with varying lighting conditions
- **Performance**: Slightly more sensitive than ContentDetector

### ThresholdDetector
- **Purpose**: Detect fade in/out transitions
- **Best for**: Videos with gradual transitions
- **Parameters**: threshold (default 12), min_scene_len
- **Performance**: Designed for fades, not hard cuts

## Recommendations

Choose detector based on video content:

```
Video Type                    | Recommended Detector | Reason
------------------------------|-------------------|--------
Videos with hard cuts          | ContentDetector   | Best balance
Fast-paced content            | AdaptiveDetector  | More sensitive
Videos with fade transitions   | ThresholdDetector | Designed for fades
Videos with mixed transitions  | ContentDetector   | Most versatile
```

## Output Formats

1. **CSV**: Detailed scene list with timestamps and frame numbers
2. **Images**: JPG images at scene boundaries (start, middle, end)
3. **HTML**: Interactive HTML report with embedded scene images
4. **Video Clips**: Split video files for each scene
5. **EDL**: Edit Decision List format for video editing software
6. **OTIO**: Open Timeline IO format

## File Structure

```
pyscenedetect_demo/
├── demo.py                  # Python API demo
├── compare_detectors.py      # Detector comparison script
├── cli_demo.sh              # Command-line examples
├── notes.md                 # Investigation notes
├── README.md                # This file
├── requirements.txt          # Python dependencies
├── .gitignore              # Ignore output and venv
├── venv/                   # Virtual environment (not committed)
└── output/                 # Generated output (not committed)
```

## Performance

- **Detection Speed**: ~2000-2600 FPS
- **Video Splitting Speed**: ~550 FPS
- **Total Processing Time**: <0.2 seconds per 10 seconds of video

## Key Features

1. Multiple detection algorithms for different video types
2. Fast processing (can handle long videos quickly)
3. Multiple output formats for different use cases
4. Both Python API and CLI interface
5. Integrates with FFmpeg for video splitting
6. Configurable parameters for fine-tuning

## Scripts

### demo.py
Basic scene detection with multiple methods:
- ContentDetector
- AdaptiveDetector
- ThresholdDetector
- Image saving

Run: `python demo.py <video_path> [output_dir]`

### compare_detectors.py
Compare detection methods with recommendations:
- Runs all three detectors
- Displays comparative results
- Provides detector recommendations
- Shows first 5 scenes from each method

Run: `python compare_detectors.py <video_path> [output_dir]`

### cli_demo.sh
Command-line interface examples:
- CSV export
- Image generation
- HTML report
- Adaptive detection
- Threshold detection
- Video splitting

Run: `./cli_demo.sh <video_path> [output_dir]`

## Notes

- VideoManager is deprecated and will be removed in future versions
- ContentDetector generally works best for most videos with hard cuts
- ThresholdDetector is specifically designed for fade transitions
- AdaptiveDetector is more sensitive and may detect additional scenes
- The library requires OpenCV for video processing
- All output files are generated in the `output/` directory (not committed)
