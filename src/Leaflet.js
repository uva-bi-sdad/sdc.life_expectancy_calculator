import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import VirginiaGeoJson from './components/VACountiesJson';
import VirginiaCensusTracks from './components/VACensusTracks';
import { useEffect, useState } from 'react';




// Fix default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});



const fetchData = async (id, onDataFetch) => {
    console.log(id)
    try {
        const response = await fetch(`http://localhost:3001/dataCounties?id=${id}`)
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json()
        onDataFetch(data)
        console.log('Fetched data:', data);

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }

}
let clickedLayer = null;

const onEachFeature = (feature, layer, onDataFetch, vadivisions) => {
    layer.on({
        click: (e) => {
            console.log("vadivisions",vadivisions);
            const currentLayer = e.target;

            // Check if there's a previously clicked layer
            if (clickedLayer && clickedLayer !== currentLayer) {
                // Revert the style of the previously clicked layer
                clickedLayer.setStyle({
                    stroke: '#000000',
                    color: 'green',
                    weight: 1.5,
                    fillOpacity: 0
                });
                // Remove the tooltip from the previously clicked layer
                clickedLayer.unbindTooltip();
            }

            // Set the clicked layer as the current layer
            clickedLayer = currentLayer;

            // Apply the new style to the clicked layer
            currentLayer.setStyle({
                stroke: '#000000',
                color: "#72A26E",
                fill: '#72A26E', // Change fill color on click
                strokeWidth: 1,
                fillOpacity: 1
            });

            // Bind and open tooltip
            currentLayer.bindTooltip(feature.properties.name, {
                permanent: true,
                direction: "auto"
            }).openTooltip();

            if (feature.properties && feature.properties.id) {
                fetchData(feature.properties.id, onDataFetch);
            }

            // Prevent event propagation to avoid triggering mouseout event
            e.originalEvent.stopPropagation();
        },
        mouseout: (e) => {
            // Don't change style if this layer is the currently clicked layer
            if (e.target === clickedLayer) return;

            const layer = e.target;
            layer.setStyle({
                stroke: "#000000",
                color: 'green',
                weight: 1.5,
                fillOpacity: 0
            });
        },
        mouseover: (e) => {
            const layer = e.target;
            // Only change the style if the layer is not the currently clicked layer
            if (layer !== clickedLayer) {
                layer.setStyle({
                    stroke: "#000000",
                    color: 'blue', // Change color on mouseover
                    weight: 2,
                    fillOpacity: 0.5
                });
            }
        }
    });
};


const Leaflet = ({ onDataFetch }) => {
    const [vadivisions, updateVadivisions] = useState('counties')
    const [mapData, updateMapData] = useState(VirginiaGeoJson)
    const handleFilter = (event) => {
        const selectedValue = event.target.value
        updateVadivisions(selectedValue)
        updateMapData(selectedValue === "counties" ? VirginiaGeoJson : VirginiaCensusTracks)
        console.log(mapData)
    }

    useEffect(()=>{

        const preFetchData = async() =>{
            await Promise.all([
                fetchData('counties', () => {}),
                fetchData('censusTracks', () => {}),
            ]);
        };
        preFetchData();
    },[]);

    return (
        <div>
            <div>
                <label htmlFor="mapFilter"></label>
                <select id="mapFilter"  value={vadivisions} onChange={handleFilter} >
                    <option value="counties">Counties</option>
                    <option value="censusTracks">Census Tracks</option>
                </select>
            </div>
            <div style={{ paddingBottom: '50px' }} />

            <MapContainer center={{ lat: 37.4, lng: -78.6 }} zoom={6} scrollWheelZoom={false} style={{ height: "50vh", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON
                    key={JSON.stringify(mapData)} data={mapData} style={{ stroke: "#000000", color: 'green', weight: 0.5, fillOpacity: 0 }} onEachFeature={(feature, layer) => onEachFeature(feature, layer, onDataFetch, vadivisions)} />
                {/* <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker> */}
            </MapContainer>
            <div style={{ paddingTop: '50px' }} />
        </div>
    );
}

export default Leaflet;
