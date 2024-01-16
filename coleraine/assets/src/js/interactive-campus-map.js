( function( $ ) {

    $(document).ready( function () {

        const app = document.getElementById('campus-map');
        const sidebar = document.getElementById('campus-map-sidebar');
        const wrapper = app.getElementsByClassName('react-transform-component')[0];
        const areas = app.querySelectorAll('[data-area]');
        const closeBtn = sidebar.getElementsByClassName("campus-map-sidebar--close")[0];

        const svg = wrapper.querySelector('svg');

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

        document.addEventListener( 'keydown', event => {
            if( 'Escape' == event.code ) {
                closesidebar();
            }
        });

    });

})( jQuery );
