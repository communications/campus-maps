import React, { useState, useEffect } from 'react'

import Api from './components/Api'
import Map from './components/Map'
import Sidebar from './components/Sidebar'
import metaData from './app.json';
import Axios from 'axios';

const App = () => {

  const [selectedArea, setselectedArea] = useState({ 'area': '' })
  const [activeData, setActiveData] = useState({})
  const [mapData, setMapData] = useState(metaData);

  const app = document.getElementById('campus-map');

  useEffect( () => {

    const getMapData = async () => {
      try {
        const response = await Api.get( Axios.get( "https://www.ulster.ac.uk/_web_services/ulster/json/campus-maps/magee.json" ) )
        setMapData( response.data )
      } catch(err) {
        console.log(err)
      }
    }

    getMapData()

  }, [])

  const setActiveArea = ( area, target ) => {

    if ( target != null ) {

        setselectedArea({
            ...selectedArea,
            [area]: target.id
        })

        mapData.map( data => {
            if ( data.id == target.id ) {
                setActiveData(data);
            }
        })

        app.classList.add( "sidebar--active" );

    } else {

      setselectedArea({
        ...selectedArea,
        [area]: ''
      })

      setActiveData({});

      app.classList.remove( "sidebar--active" )

    }

  }

  return (
    <>
      <Map
        mapData={ mapData }
        setActiveArea={ setActiveArea }
        data={ activeData }
      />
      <Sidebar
        setActiveArea={ setActiveArea }
        activeArea={ selectedArea.area }
        data={ activeData }
      />
    </>
  )

}

export default App