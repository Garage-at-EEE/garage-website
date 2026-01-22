import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 1.3483,
  lng: 103.6831,
};

const MAP_ID = "c8b545f909f6471e";

const GoogleMapComponent = () => {
  
  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
      <div style={containerStyle}>
        <Map
        defaultCenter={center} 
        defaultZoom={15}
        mapId={MAP_ID}>
          <AdvancedMarker position={center} title="Garage@EEE, NTU" />
        </Map>
      </div>
    </APIProvider>
  );
};

export default GoogleMapComponent;