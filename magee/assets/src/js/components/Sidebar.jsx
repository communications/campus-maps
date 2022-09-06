import React from 'react'
import ReactHtmlParser from 'react-html-parser';

const Sidebar = ( props ) => {

    const { data } = props;

    return(
        <div id="campus-map-sidebar" className="campus-map-sidebar">

            <div className="campus-map-sidebar__wrapper">

                { data.image != null &&
                    <figure className="campus-map-sidebar__thumbnail">
                        <img src={ data.image } alt={ data.title } />
                    </figure>
                }

                { data.title && <span className="campus-map-sidebar__title">{ data.title }</span> }
                { data.content && <span className="campus-map-sidebar__content">{ ReactHtmlParser(data.content) }</span> }

                { data.link && <a className="campus-map-sidebar__link" rel="link" target="_blank" href={ 'https://' + data.link }>{ data.link }</a> }

                <button className="campus-map-sidebar--close">
                    <span className="screen-reader-text">{ "Close" }</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

            </div>

        </div>
    )

}

export default Sidebar;