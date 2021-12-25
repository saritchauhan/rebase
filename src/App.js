import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import randomColor from 'randomcolor';

export const mod = (v)=>{
  return v < 0 ? -1*v : v
}

export const meanArray = (array)=>{
  const newArray = [];
  const len = array.length
  array.forEach(sub => {
     sub.forEach((num, index) => {
        if(newArray[index]){
           newArray[index] += num/len;
        }else{
           newArray[index] = num/len;
        }
     });
  });
  return newArray;
}

var likedColors = []
var unLikedColors = []

function App() {

  const [displayColor, setDisplayColor] = useState(null)
  const [colorArray, setColorArray] = useState([])
  const [testColor, setTestColor] = useState(null)
  const [result, setResult] = useState(null)

  const changeColor=()=>{
    const color = randomColor({
      luminosity: 'bright',
      format: 'rgb' // e.g. 'rgb(225,200,20)'
    })
    const colorValues = color.match(/\d+/g).map(i=>Number(i))
    setDisplayColor(color)
    setColorArray(colorValues)

  }

  const predict = (value)=>{

    const likedMean = meanArray(likedColors)
    const unLikedMean = meanArray(unLikedColors)

    const rwa = value[0] - likedMean[0]
    const gwa = value[1] - likedMean[1]
    const bwa = value[2] - likedMean[2]
    const rwr = value[0] - unLikedMean[0]
    const gwr = value[1] - unLikedMean[1]
    const bwr = value[2] - unLikedMean[2]

    let c= 0

    c = mod(rwa)>mod(rwr) ? c+1 : c-1
    c = mod(gwa)>mod(gwr) ? c+1 : c-1
    c = mod(bwa)>mod(bwr) ? c+1 : c-1

    setResult(c>0 ? "True" : "False")

  }

  const handleLikeClick =()=>{
    likedColors.push(colorArray)
    changeColor()
  }
  
  const handleUnlikeClick=()=>{
    unLikedColors.push(colorArray)
    changeColor()

  }

  const handlePredictClick=()=>{
    const color = randomColor({
      luminosity: 'bright',
      format: 'rgb' // e.g. 'rgb(225,200,20)'
    })
    const colorValues = color.match(/\d+/g).map(i=>Number(i))
    setTestColor(color)
    predict(colorValues)
  }

  useEffect(() => {
    changeColor()
  }, [])
 
  return (
    <div className="App">

      <div style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
      }}>
        <div style={{
          margin:"4rem 0 1rem 0",
          backgroundColor:displayColor,
          height:"24rem",
          width:"24rem"
          
        }}></div>

        <div>
          <button
            onClick={handleLikeClick}>
            Like
          </button>

          <button
            onClick={handleUnlikeClick}>
            Dislike
          </button>
        </div>

      </div>

      <div style={{
        marginTop:"3rem",
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
      }}>
        <h> Predict for next random color</h>
        <button onClick={handlePredictClick}>
          Predict 
        </button>

        {
          result && (
            <div style={{
              backgroundColor:testColor,
              height:"14rem",
              width:"14rem"
              
            }}></div>
          )
        }
        {
          result && <h> Result -  <strong>{result}</strong></h>
        }

      </div>
    
    </div>
  );
}

export default App;
