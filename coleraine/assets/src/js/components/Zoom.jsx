import React from 'react'

const ZoomControls = ( props ) => {

    const { setZoomLevel, zoomLevel, setScale, setTranslate } = props;

    function handleZoom( level ) {

        const zoomIn = document.getElementById('zoom-in');
        const zoomOut = document.getElementById('zoom-out');
        const app = document.getElementById('campus-map');
        const wrapper = app.getElementsByClassName('campus-map')[0];
        const component = app.getElementsByClassName('campus-map-component')[0];

        const svg = wrapper.querySelector('svg');

        setZoomLevel( level );

        if (level == 10) {
            zoomIn.classList.add( "disabled" );
        } else if (level == 1) {
            zoomOut.classList.add( "disabled" );
        } else {
            zoomIn.classList.remove( "disabled" );
            zoomOut.classList.remove( "disabled" );
        }

        let scaleChange = (level > 1) ? level * 0.6 : 1;
        setScale( scaleChange );

    }

    function handleReset() {

        setZoomLevel( 1 );
        setScale( 1 );
        setTranslate({x:0,y:0})

    }

    return(
        <div id="campus-map-zoom" className="campus-map-zoom">

            <button id="zoom-in" className="zoom-button zoom-button--in" onClick = { () => { if (zoomLevel < 10) { handleZoom( zoomLevel + 1 ) } }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>

            <button id="zoom-out" className="zoom-button zoom-button--out disabled" onClick = { () => { if (zoomLevel > 1) { handleZoom( zoomLevel - 1 ) } }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>

            <button id="reset" className="reset-button" onClick = { () => { handleReset() }}>
                Reset
            </button>

        </div>
    )

}

export default ZoomControls;