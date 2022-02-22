import { useState } from 'react';

const defaultConstraints = {
  audio: false,
  video: true,
  width: { ideal: 1920 },
  height: { ideal: 1080 }
}

export default function useCamera(videoRef, canvasRef, constraints = defaultConstraints) {
  const [picture, setPicture] = useState();

  const requestUserMedia = (onLoad) => {
    // Check if client supports navigator mediaDevices and getUserMedia API
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = function() {
            onLoad();
          };
        })
    }
  };

  const takePicture = (cb) => {
    const canvas = canvasRef.current;
    canvas.width = 640;
    canvas.height = 480;
    const context = canvas.getContext('2d');
    const video = document.getElementsByClassName("camera__video")[0];
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(img => {
      setPicture(img);
      context.clearRect(0, 0, canvas.width, canvas.height);
      if(cb) {
        cb(img);
      }
    })
  };

  return { picture, takePicture, requestUserMedia }
}
