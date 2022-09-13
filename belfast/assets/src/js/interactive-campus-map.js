( function( $ ) {

    $(document).ready( function () {

        const app = document.getElementById('campus-map');
        const sidebar = document.getElementById('campus-map-sidebar');
        const wrapper = app.getElementsByClassName('campus-map')[0];
        const component = app.getElementsByClassName('campus-map-component')[0];
        const areas = app.querySelectorAll('[data-area]');

        const zoomOut = document.getElementById('zoom-out');
        const resetBtn = document.getElementById('reset');
        const closeBtn = sidebar.getElementsByClassName("campus-map-sidebar--close")[0];

        const svg = wrapper.querySelector('svg');

        // This variable will be used later for move events to check if pointer is down or not
        let isPointerDown = false;

        // This variable will contain the original coordinates when the user start pressing the mouse or touching the screen
        let pointerOrigin = { x: 0, y: 0 };
        let transform = { x: 0, y: 0, z: 0 }
        let newTransform = { x: 0, y: 0, z: 0 }

        let scale = 1;

        // Function called by the event listeners when user start pressing/touching
        function onPointerDown(event) {

            isPointerDown = true; // We set the pointer as down
            scale = wrapper.dataset.zoom;

            // We get the pointer position on click/touchdown so we can get the value once the user starts to drag
            let pointerPosition = getPointFromEvent(event);

            pointerOrigin.x = pointerPosition.x;
            pointerOrigin.y = pointerPosition.y;

        }

        // This function returns an object with X & Y values from the pointer event
        function getPointFromEvent (event) {

            let point = {x:0, y:0};

            // If event is triggered by a touch event, we get the position of the first finger
            if (event.targetTouches) {
                point.x = event.targetTouches[0].clientX;
                point.y = event.targetTouches[0].clientY;
            } else {
                point.x = event.clientX;
                point.y = event.clientY;
            }

            return point;
        }

        // Function called by the event listeners when user start moving/dragging
        function onPointerMove (event) {

            // Only run this function if the pointer is down
            if ( ! isPointerDown ) {
                return;
            }

            // This prevent user to do a selection on the page
            event.preventDefault();
            event.stopPropagation();

            // Get the pointer position
            let pointerPosition = getPointFromEvent(event);

            // We calculate the distance between the pointer origin and the current position
            // The viewBox x & y values must be calculated from the original values and the distances
            newTransform.x = transform.x + (pointerPosition.x - pointerOrigin.x);
            newTransform.y = transform.y + (pointerPosition.y - pointerOrigin.y);

            setTransform( newTransform.x, newTransform.y );

        }

        function onPointerUp() {

            // The pointer is no longer considered as down
            isPointerDown = false;

            // Multiply the scale level to get the number to multiply the SVG by
            let scaleChange = (scale > 1) ? scale * 0.6 : 1;

            // Get width and height of the SVG multiplied by the scale. This gives the correct zoomed in size of the SVG
            const svgWidth = svg.width.baseVal.value * scaleChange;
            const svgHeight = svg.height.baseVal.value * scaleChange;

            // Get the bounds of the SVG. Takes the width/height minus the width/height of the component.
            // The remaining amount of the size outside of the bounds. Divided by 2 gives the amount each side is allowed to move.
            const boundsLeft = (svgWidth - component.offsetWidth) / 2;
            const boundsTop = (svgHeight - component.offsetHeight) / 2;
            const boundsRight = (component.offsetWidth - svgWidth) / 2;
            const boundsBottom = (component.offsetHeight - svgHeight) / 2;

            // Set the transform X value
            if ( newTransform.x > 0 && scale == 1 ) {
                transform.x = 0;
            } else if ( newTransform.x > boundsLeft ) {
                transform.x = boundsLeft;
            } else if ( newTransform.x < boundsRight ) {
                transform.x = boundsRight;
            } else {
                transform.x = newTransform.x;
            }

            // Set the transform Y value
            if ( newTransform.y > 0 && scale == 1 ) {
                transform.y = 0;
            } else if ( newTransform.y > boundsTop ) {
                transform.y = boundsTop;
            } else if ( newTransform.y < boundsBottom ) {
                transform.y = boundsBottom;
            } else {
                transform.y = newTransform.y;
            }

            setTransform( transform.x, transform.y );

        }

        function setTransform( x, y ) {

            let transformString = `${x}px, ${y}px, 0`;

            // We apply the new viewBox values onto the SVG
            component.style.transform = "translate3d(" + transformString + ")";

        }

        // If browser supports pointer events
        if (window.PointerEvent) {
            svg.addEventListener('pointerdown', onPointerDown); // Pointer is pressed
            svg.addEventListener('pointerup', onPointerUp); // Releasing the pointer
            svg.addEventListener('pointerleave', onPointerUp); // Pointer gets out of the SVG area
            svg.addEventListener('pointermove', onPointerMove); // Pointer is moving
        } else {
            // Add all mouse events listeners fallback
            svg.addEventListener('mousedown', onPointerDown); // Pressing the mouse
            svg.addEventListener('mouseup', onPointerUp); // Releasing the mouse
            svg.addEventListener('mouseleave', onPointerUp); // Mouse gets out of the SVG area
            svg.addEventListener('mousemove', onPointerMove); // Mouse is moving

            // Add all touch events listeners fallback
            svg.addEventListener('touchstart', onPointerDown); // Finger is touching the screen
            svg.addEventListener('touchend', onPointerUp); // Finger is no longer touching the screen
            svg.addEventListener('touchmove', onPointerMove); // Finger is moving
        }

        const closesidebar = () => {

            svg.classList.remove( "selected" );
            app.classList.remove("sidebar--active");

            for ( let index = 0; index < areas.length; index++ ) {

                const area = areas[index];

                area.classList.remove( "area--selected" );

            }
        }

        closeBtn.addEventListener( "click", function() {
            closesidebar();
        });

        zoomOut.addEventListener( "click", function() {

            scale = wrapper.dataset.zoom;
            let scaleChange = (scale > 1) ? scale * 0.6 : 1;
            let positionX, positionY;

            positionX = newTransform.x - ( newTransform.x / scaleChange );
            positionY = newTransform.y - ( newTransform.y / scaleChange );

            transform = { x: positionX, y: positionY, z: 0 }
            newTransform = { x: positionX, y: positionY, z: 0 }

            setTransform( transform.x, transform.y );

        })

        resetBtn.addEventListener( "click", function() {

            transform = { x: 0, y: 0, z: 0 }
            newTransform = { x: 0, y: 0, z: 0 }
            setTransform( 0, 0 );

            zoomOut.classList.add( "disabled" );

        });

        document.addEventListener( 'keydown', event => {
            if( 'Escape' == event.code ) {
                closesidebar();
            }
        });

    });

})( jQuery );