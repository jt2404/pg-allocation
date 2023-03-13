import React from "react";
import GoogleMap from "google-map-react";
import { Modal } from "antd";
import { useStore } from "./../../context/pg_store";

function MapModal({ mapPGModalVisible, setMapPGModalVisible }) {
  const { state, methods } = useStore();
  console.log(state.pgList);
  function renderMarkers(map, maps, lat = 22.6916, long = 72.8634) {
    let marker = new maps.Marker({
      position: { lat: lat, lng: long },
      map,
      title: "Hello World!",
    });
    return marker;
  }
  return (
    <Modal
      open={mapPGModalVisible}
      footer={null}
      closable={false}
      maskClosable={true}
      onCancel={() => setMapPGModalVisible(false)}
    >
      <div style={{ height: "50vh", width: "100%" }}>
        <GoogleMap
          yesIWantToUseGoogleMapApiInternals={true}
          bootstrapURLKeys={{ key: "AIzaSyCQ2VQrTCKMMzEM23i8MpWwywh5ePYzUEU" }}
          defaultZoom={10}
          onGoogleApiLoaded={({ map, maps }) =>
            state?.pgList?.map(
              (pg) =>
                pg.longitude &&
                renderMarkers(map, maps, pg.latitude, pg.longitude)
            )
          }
          center={[22.6916, 72.8634]}
        ></GoogleMap>
      </div>
    </Modal>
  );
}

export default MapModal;
