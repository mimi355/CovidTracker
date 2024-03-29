import React,{useState,useEffect} from 'react'
import './App.css';
import { MenuItem,Select,FormControl, Card, CardContent} from"@material-ui/core"
import InfoBox from './components/infoBox/InfoBox';
import Map from './components/map/Map';
import Table from './components/table/Table';
import { sortData,prettyPrintStat  } from './components/utils';
import Graph from './components/Graph';
import "leaflet/dist/leaflet.css";



function App() {
const [countries,setCountries] =useState([])
const [country,setCountry] = useState('worldwide')
const [countryInfo, setCountryInfo] = useState({})
const [tableData,setTableData] =useState([])
const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
const [mapCountries, setMapCountries] =useState([])
const [casesType,setCasesType] = useState("cases")
useEffect(()=>{
fetch("https://disease.sh/v3/covid-19/all")
.then(res=>res.json())
.then(data=>{
  setCountryInfo(data)
})

},[])





useEffect(()=>{
 const getCountriesData = async()=> {
 await fetch("https://disease.sh/v3/covid-19/countries")
.then(response=>response.json())
.then(data=> {
  const countries = data.map(country=> ({
    name:country.country,
    value:country.countryInfo.iso2,
  
    
  }))
  const sortedData = sortData(data)
  setTableData(sortedData)
  setMapCountries(data)
  setCountries(countries)

})
 }
 getCountriesData()
},[])

const handleChange= async(e)=>{
  const countryCode= e.target.value

const url = countryCode === "worldwide" ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`

await fetch(url).then(response=>response.json())
.then(data=> {
  setCountry(countryCode);
  setCountryInfo(data);
setMapCenter([data.countryInfo.lat, data.countryInfo.long])
setMapZoom(4)
})

}



  return (
   <div className="app" >
    <div className="app__left">
     <div className='app__header'>
     <h1>COVID-19 TRACKER</h1>
     <FormControl className="app__dropdown">
       <Select variant="outlined" value={country} onChange={handleChange}>
        <MenuItem value="worldwide">{country}</MenuItem>
         {countries.map(country=>
          <MenuItem  value={country.value}> {country.name}</MenuItem>
          
          )}
         
       
       </Select>
     </FormControl>
     </div>
    
<div className="box">
<InfoBox  isRed active={casesType === "cases"} onClick={e=>setCasesType("cases")} title="Coronavirus Cases" total={prettyPrintStat(countryInfo.cases)} cases ={prettyPrintStat(countryInfo.todayCases)} />
<InfoBox  active={casesType === "recovered"}  onClick={e=>setCasesType("recovered")} title="Recovered" total={prettyPrintStat(countryInfo.recovered)} cases={prettyPrintStat(countryInfo.todayRecovered)}/>
<InfoBox isRed active={casesType === "deaths"}   onClick={e=>setCasesType("deaths")} title="Deaths"  total={prettyPrintStat(countryInfo.deaths)} cases={prettyPrintStat(countryInfo.todayDeaths)}  />
</div>

<Map casesType={casesType} countries ={mapCountries} center={mapCenter} zoom={mapZoom} />

</div>
<Card className="app__right">
<CardContent>
  <h3>Cases By Country</h3>
  <Table countries={tableData} />
  <h3 className="app__right__title">WorldWide New {casesType}</h3>
  <Graph  casesType={casesType}/>
</CardContent>
</Card>

   </div>
  
  )
}

export default App;
