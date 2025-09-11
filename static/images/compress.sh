ffmpeg -i LightsOut.mp4 -c:v libx264 -preset slow -crf 24 -an -movflags +faststart LightsOut_no_audio.mp4
