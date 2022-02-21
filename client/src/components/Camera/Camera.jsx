import {  useRef, useState } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import useCamera from '../../hooks/useCamera/useCamera';
import axios from 'axios';
import './Camera.scss';
import FormData from 'form-data';

function Camera(props) {
  const [predictions, setPredictions] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useCamera(videoRef, () => {
    videoRef.current.play();
  });

  const takePicture = () => {
    const canvas = canvasRef.current
    canvas.width = 640;
    canvas.height = 480;
    const context = canvas.getContext('2d')
    const video = document.getElementsByClassName("camera__video")[0];
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(img => {
      let data = new FormData();
      data.append('file', img, 'img.png');
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/images`, data, { headers: {
          'Content-Type': img.type
        }})
        .then(res => {
          console.log(res);
          context.clearRect(0, 0, canvas.width, canvas.height);
          document.getElementById('new-image').setAttribute('src', res.data.image);
          setPredictions(res.data.predictions);
        })
        .catch(err => {
          console.log(err);
        })
    })
  }

  const parsedPredictions = predictions.map(prediction => <li>{prediction.name} - {prediction.value}</li>)

  return (
    <>
      <div className="camera">
        <video className="camera__video" ref={videoRef}></video>
        <canvas className="camera__canvas" ref={canvasRef}></canvas>
        <button className="camera__button" onClick={() => takePicture()}>
          <BsFillCameraFill />
        </button>
      </div>

      <ul className="prediction-list">
        {parsedPredictions}
      </ul>
      {/* <input type="file" accept="image/*" capture="camera" name="file" onChange={(e) => handleChange(e)}/> */}


      <img id="new-image"/>
    </>
  );
}

export default Camera;
