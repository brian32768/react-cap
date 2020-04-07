import React, {useState, useEffect} from 'react';  // eslint-disable-line no-unused-vars
import InventoryForm from './inventory';
//import {Map, control, layer, source} from '../src' // eslint-disable-line no-unused-vars
//import {Container, Row, Col, Button} from 'reactstrap' // eslint-disable-line no-unused-vars
//import {MapProvider} from '../src/map-context' // eslint-disable-line no-unused-vars
//import {CollectionProvider} from '../src/collection-context' // eslint-disable-line no-unused-vars
//import {Map as olMap, View as olView, Collection} from 'ol'
//import {fromLonLat} from 'ol/proj'
//import {defaultOverviewLayers as ovLayers} from '../src/map-layers'
//import {OpenLayersVersion} from '../src' // eslint-disable-line no-unused-vars

//import {DEFAULT_CENTER, MINZOOM} from './constants'
//import {wgs84} from '../src/constants'

const Home = () => {
/*     const [mapLayers] = useState(new Collection());
    const [theMap] = useState(new olMap({
        view: new olView({ center: fromLonLat(DEFAULT_CENTER), zoom: MINZOOM}),
        //controls: [],
        layers: mapLayers,
    }));
    const [zoom, setZoom] = useState(theMap.getView().getZoom());
    const updateZoom = (step=0) => {
        const view = theMap.getView();
        const newZoom = view.getZoom() + step
        setZoom(newZoom)
        view.setZoom(newZoom);
    }
    const decZoom = () => {updateZoom(-1);}
    const incZoom = () => {updateZoom(1);}
    const onMove = () => {
        const newZoom = theMap.getView().getZoom();
        if (newZoom !== zoom) {
            setZoom(Math.round(newZoom));
        }
    }
 */    
    return (
    <>
        <h2>Simple database table</h2>
            <InventoryForm/>
    </>
    );
}
export default Home;
