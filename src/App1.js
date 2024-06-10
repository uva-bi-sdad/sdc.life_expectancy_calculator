import './App.css';
import Slider from './Slider';
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'
import { useState } from 'react';
import Leaflet from './Leaflet';

function App() {
  const [sliderValues, setSliderValues] = useState({
    id1: 20,
    id2: 20,
    id3: 20,
    id4: 20,
    id5: 20,
    id6: 20,
    id7: 20,
    id8: 20,
    id9: 20,
    id10: 20,
    id11: 20,
    id12: 20,
    id13: 20,
    id14: 20,
  });

  const handleSliderChange = (id, value) => {
    setSliderValues(prevValues => ({
      ...prevValues,
      [id]: value,
    }));
    calculateSum();
  };

  const calculateSum = () => {
    const sum = (((sliderValues.id6-0)/(5-0)) * 0.097) +
      (((sliderValues.id10- (-2.15))/(2.58-(-2.15))) * 0.096) +
      (((sliderValues.id11-1.32)/(48.38-1.32)) * 0.041) +
      (((sliderValues.id3-1530)/(130244-1530)) * 0.015) +
      (((sliderValues.id4-37)/(78.90-37)) * 0.06) +
      (((sliderValues.id8-0.36)/(0.62-0.36)) * 0.002) +
      (((sliderValues.id14-27)/(1787-27)) * 0.347) +
      (((sliderValues.id2-11.90)/(16.26-11.90)) * 0.160) +
      (((sliderValues.id7-0.09)/(316.67-0.09)) * 0.050) +
      // (sliderValues.id1*0) +
      (((sliderValues.id13-0)/(100-0)) * 0.030) +
      (((sliderValues.id9-29)/(76-29)) * 0.001) +
      // (sliderValues.id5*0) +
      (((sliderValues.id12-0)/(1)) * 0.101)

    setCalculatedValue(sum.toFixed(1))
  };

  const [caluclatedValue, setCalculatedValue] = useState('');
  // return (<><Leaflet /></>)
  return (
    <div className='App'>
      <div style={{ paddingTop: '10px' }} />
      <Tooltip id="my-tooltip" />
      <button className="button-27" role="button" onClick={calculateSum}>{`Life Expectancy Calculator`}</button>
      <div className='grid-container'>
        {/* <Slider feature={"Access to Care Indicator"} text={"Access to Care Indicator"} id="id1" value={sliderValues.id1} onChange={handleSliderChange} /> */}
        <Slider feature={"Average Years of Schooling"} text={"Average Years of Schooling"} id="id2" value={sliderValues.id2} onChange={handleSliderChange} />
        <Slider feature={"Employment Access Index"} text={"Employment Access Index"} id="id3" value={sliderValues.id3} onChange={handleSliderChange} />
        <Slider feature={"Labor Force Participation Rate"} text={"Labor Force Participation Rate"} id="id4" value={sliderValues.id4} onChange={handleSliderChange} />
        {/* <Slider feature={"Population Density"} text={"Population Density"} id="id5" value={sliderValues.id5} onChange={handleSliderChange} /> */}
        <Slider feature={"Walkability Index"} text={"Walkability Index"} id="id6" value={sliderValues.id6} onChange={handleSliderChange} />
        <Slider feature={"Segregation Indicator"} text={"Segregation Indicator"} id="id7" value={sliderValues.id7} onChange={handleSliderChange} />
        <Slider feature={"Gini Index (Income Inequality)"} text={"Gini Index (Income Inequality)"} id="id8" value={sliderValues.id8} onChange={handleSliderChange} />
        <Slider feature={"Affordability Index"} text={"Affordability Index provides a comprehensive view of affordability, one that includes the cost of housing and transportation at the neighborhood level."} id="id9" value={sliderValues.id9} onChange={handleSliderChange} />
        <Slider feature={"Environmental Hazard Index"} text={"Environmental Hazard Index"} id="id10" value={sliderValues.id10} onChange={handleSliderChange} />
        <Slider feature={"Food Access Percentage"} text={"food access percentage is the precentage of the population with low access income to the nearest food store within a 1-mile radius for Urban residuals) and 10 -mile radius for rural residuals"} id="id11" value={sliderValues.id11} onChange={handleSliderChange} />
        <Slider feature={"Townsend"} text={"Townsend"} id="id12" value={sliderValues.id12} onChange={handleSliderChange} />
        <Slider feature={"Mobility (Percentage of People Moving)"} text={"Mobility (Percentage of People Moving)"} id="id13" value={sliderValues.id13} onChange={handleSliderChange} />
        <Slider feature={"Incarceration Rate per 100,000"} text={"Incarceration Rate per 100,000"} id="id14" value={sliderValues.id14} onChange={handleSliderChange} />
        {/* <Leaflet /> */}
        <div className='map-container'>
          <Leaflet />
        </div>
      </div>
      <button className="button-27" role="button" onClick={calculateSum} style={{ textAlign: 'center', display: 'block', marginLeft: 'auto', width: '20%', paddingRight: '50px' }}>{`Life Expectancy: ${caluclatedValue}`}</button>
    </div>
  );
}

export default App1;

