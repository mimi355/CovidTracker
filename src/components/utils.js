import React from "react"
import {Circle,Popup} from "react-leaflet"
import numeral from "numeral"

const casesTypeColors = {
  cases: {
    hex: "#fb4443",
    
    multiplier: 800,
  },
  recovered: {
    hex: "#5aa469",
    multiplier: 1200,
  },
  deaths: {
    hex: "#af2d2d",
    multiplier: 2000,  // size of the circle 
  },
};


export const sortData =(data)=>{
    const sortedData=[...data]
  return sortedData.sort((a,b)=>(a.cases > b.cases ? -1 : 1))
}




//
export const showDataOnMap = (data,casesType="cases") => (
  data.map(country=>(

<Circle
center ={[country.countryInfo.lat, country.countryInfo.long]}
fillOpacity ={0.4}
color={casesTypeColors[casesType].hex}
fillColor={casesTypeColors[casesType].hex}
radius={Math.sqrt(country[casesType])*casesTypeColors[casesType].multiplier}
>

<Popup>
<div className="info-container">
  <div className="info-flag" style={{backgroundImage:`url(${country.countryInfo.flag})`}}></div>
  <div className="info-name">{country.country}</div>
  <div  className="info-cases">Cases: {numeral(country.cases).format("0,0")}</div>
  <div className="info-recovered">Recovered:{numeral(country.recovered).format("0,0")}</div>
  <div className="info-deaths">Deaths:{numeral(country.deaths).format("0,0")}</div>
</div>


</Popup>

</Circle>





))
)









//
export const prettyPrintStat = (stat) =>
stat ? `+${numeral(stat).format("0.0a")}` : "+0";
