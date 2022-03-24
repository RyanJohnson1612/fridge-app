import { useState } from 'react';

const defaultConstraints = {
  audio: false,
  video: true,
  width: { ideal: 1920 },
  height: { ideal: 1080 }
}

export default function useCamera(videoRef, canvasRef, constraints = defaultConstraints) {
  const [picture, setPicture] = useState();
  const [loading, setLoading] = useState(false);

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
        .catch(err => err);
    }
  };

  const takePicture = (cb) => {
    setLoading(true);
    const canvas = canvasRef.current;
    canvas.width = 640;
    canvas.height = 480;
    const context = canvas.getContext('2d');
    const video = document.getElementsByClassName("camera__video")[0];
    context.drawImage(video, 0, 0);
    canvas.toBlob(img => {
      setPicture(img);
      context.clearRect(0, 0, canvas.width, canvas.height);
      if(cb) {
        cb(img);
      }
      setLoading(false);
    })
  };

  return { picture, loading, takePicture, requestUserMedia }
}
