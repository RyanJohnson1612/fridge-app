import {  useEffect, useRef } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';
import useCamera from '../../hooks/useCamera/useCamera';
import './Camera.scss';


function Camera(props) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { takePicture, requestUserMedia } = useCamera(videoRef, canvasRef);

  useEffect(() => {
    requestUserMedia(() => {
      videoRef.current.play();
    });
  }, []);

  return (
    <div className="camera">
      <video className="camera__video" ref={videoRef}></video>
      <canvas className="camera__canvas" ref={canvasRef}></canvas>
      <button className="camera__button" onClick={() => takePicture(props.cb)}>
        <BsFillCameraFill />
      </button>
    </div>
  );
}

export default Camera;
