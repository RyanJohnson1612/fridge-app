import { useState, useEffect } from "react";

const defaultConstraints = {
  audio: false,
  video: true,
  width: { ideal: 1920 },
  height: { ideal: 1080 }
}

export default function useCamera(video, onLoad, constraints = defaultConstraints) {



  useEffect(() => {
    // Check if client supports navigator mediaDevices and getUserMedia API
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          video.current.srcObject = stream;
          console.log(video.current);
          video.current.onloadedmetadata = function() {
            onLoad();
          };
        })
    }
  }, [video, onLoad, constraints]);
}
