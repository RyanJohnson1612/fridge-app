import { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';

function usePredictions() {
  const [predictions, setPredictions] = useState([]);
  const [image, setImage] = useState();
  const [predictionsLoading, setPredictionsLoading] = useState();

  const getPredictions = (img) =>  {
    setPredictionsLoading(true);
    let data = new FormData();
      data.append('file', img, 'img.png');
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/images`, data, { headers: {
          'Content-Type': img.type
        }})
        .then(res => {
          setPredictions(res.data.predictions);
          setImage(res.data.image);
          setPredictionsLoading(false);
        })
        .catch(err => {
          console.log(err);
        })
  }

  return {image, setImage, predictions, getPredictions, predictionsLoading, setPredictionsLoading};
}

export default usePredictions;
