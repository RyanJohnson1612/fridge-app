import { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';

function usePrediction(canvasRef, videoRef) {
  const [predictions, setPredictions] = useState([]);
  const [image, setImage] = useState();

  const getPredictions = (img) =>  {
    let data = new FormData();
      data.append('file', img, 'img.png');
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/images`, data, { headers: {
          'Content-Type': img.type
        }})
        .then(res => {
          console.log(res);

          setPredictions(res.data.predictions);
          setImage(res.data.image)
        })
        .catch(err => {
          console.log(err);
        })
  }

  return {image, setImage, predictions, getPredictions};
}

export default usePrediction;
