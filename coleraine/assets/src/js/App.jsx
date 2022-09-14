import React, { useState } from 'react'

import ZoomControls from './components/Zoom'
import Map from './components/Map'
import Sidebar from './components/Sidebar'
import metaData from './app.json';

const App = () => {

  const [selectedArea, setselectedArea] = useState({ 'area': '' })
  const [activeData, setActiveData] = useState({})

  const app = document.getElementById('campus-map');

  const setActiveArea = ( area, target ) => {

    if ( target != null ) {

        setselectedArea({
            ...selectedArea,
            [area]: target.id
        })

        metaData.map( data => {
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