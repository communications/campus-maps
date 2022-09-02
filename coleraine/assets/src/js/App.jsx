import React, { useState } from 'react'

import ZoomControls from './components/Zoom'
import Map from './components/Map'
import Sidebar from './components/Sidebar'
import metaData from './app.json';

const App = () => {

  const [selectedArea, setselectedArea] = useState({ 'area': '' })
  const [activeData, setActiveData] = useState({})
  const [zoomLevel, setZoomLevel] = useState(1)
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({x: 0, y:0})

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
        zoom={ zoomLevel }
        scale={ scale }
        translate={ translate }
        data={ activeData }
      />
      <ZoomControls
        setZoomLevel={ setZoomLevel }
        zoomLevel={ zoomLevel }
        setScale={ setScale }
        setTranslate={ setTranslate }
        translate={ translate }
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