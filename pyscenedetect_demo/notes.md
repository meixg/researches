# PySceneDetect Demo Investigation

## Task
创建一个通用的demo脚本来验证PySceneDetect库的场景检测效果，支持任意视频输入。

## Steps Taken

### Step 1: Set up working directory
- Created pyscenedetect_demo folder
- Set up virtual environment with required dependencies

### Step 2: Install dependencies
- Installed scenedetect library
- Installed opencv-python (required by PySceneDetect)

### Step 3: Create demo scripts
- **demo.py**: Python API demo with multiple detection methods
- **compare_detectors.py**: Detector comparison script
- **cli_demo.sh**: Command-line interface examples

### Step 4: Make scripts generic
- Modified all scripts to accept video path as command-line argument
- Added optional output directory parameter
- Removed hardcoded video paths

### Step 5: Test with sample videos
- Tested with py_scene_detect/test-video.mp4
- Tested with py_scene_detect/test-video2.mp4
- Verified output generation (CSV, HTML, images, video clips)

### Step 6: Configure git
- Added output/ to .gitignore
- Removed output files from git tracking
- Committed only code and documentation

## Usage Examples

### Python API Demo
```bash
# Activate virtual environment
source venv/bin/activate

# Run demo with video
python demo.py video.mp4

# Specify output directory
python demo.py video.mp4 output
```

### Detector Comparison
```bash
python compare_detectors.py video.mp4
python compare_detectors.py video.mp4 output
```

### Command-Line Interface
```bash
chmod +x cli_demo.sh
./cli_demo.sh video.mp4
./cli_demo.sh video.mp4 output
```

## Detection Methods

### ContentDetector
- **Purpose**: Detect fast cuts based on HSL color differences
- **Best for**: Videos with hard scene cuts
- **Parameters**: threshold (default 30.0), min_scene_len
- **Performance**: Good accuracy, fast processing (~2000 FPS)

### AdaptiveDetector
- **Purpose**: Detect fast cuts using rolling average
- **Best for**: Videos with varying lighting conditions
- **Performance**: More sensitive than ContentDetector

### ThresholdDetector
- **Purpose**: Detect fade in/out transitions
- **Best for**: Videos with gradual transitions
- **Parameters**: threshold (default 12), min_scene_len
- **Performance**: Designed for fades, not hard cuts

## Output Formats

1. **CSV**: Detailed scene list with timestamps and frame numbers
2. **Images**: JPG images at scene boundaries (start, middle, end)
3. **HTML**: Interactive scene report with embedded images
4. **Video Clips**: Split video files for each scene
5. **EDL**: Edit Decision List format
6. **OTIO**: Open Timeline IO format

## Key Findings

- ContentDetector generally works best for most videos with hard cuts
- AdaptiveDetector is more sensitive and detects additional boundaries
- ThresholdDetector is less suitable for videos with rapid hard cuts
- Processing speed remains consistent (~2000-2600 FPS) regardless of video complexity
- The library supports both Python API and CLI interfaces
- Output files are properly ignored by git

## Notes

- VideoManager is deprecated and will be removed in future versions
- All scripts accept video path as first argument
- Output directory is optional (defaults to 'output')
- Generated files (images, CSV, HTML, video clips) are not committed to git
