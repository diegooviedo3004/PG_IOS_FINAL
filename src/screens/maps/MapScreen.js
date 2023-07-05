import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = (props) => {
 const { lat, lon, nombre_clinica } = props;
 const mapRef = useRef(null);
 useEffect(() => {
    if (mapRef.current) {
      const region = {
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.02, // Ajusta este valor para el nivel de zoom (más pequeño = más zoom)
        longitudeDelta: 0.02, // Ajusta este valor para el nivel de zoom (más pequeño = más zoom)
      };

      mapRef.current.animateToRegion(region, 5000); // 1000 es la duración de la animación en milisegundos
    }
  }, []);

  return (
      <MapView
         ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 100,
          longitudeDelta: 100,
        }}
      >
        <Marker
          coordinate={{ latitude: lat, longitude: lon }}
          title={nombre_clinica}
          description="Clínica veterinaria"
        />
      </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;