import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, Linking, StyleSheet, Button } from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import loginStore from "../../utils/store";
import { useQuery } from "react-query";
import { loginServer } from "../../utils/login";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapScreen from "./MapScreen";

export default function Maps(props) {
    const { navigation } = props;
    const { code, logout } = loginStore();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <MenuImage
                    onPress={() => {
                        navigation.openDrawer();
                    }}
                />
            ),
            headerRight: () => <View />
        });
    }, []);



    const query = useQuery({
        queryFn: () => loginServer({ code }), // Envuelve la función en otra función
        queryKey: ["getProductos"],
        refetchInterval: 2000,
    });

    if (query.isLoading) return <Text>Cargando</Text>

    if (query.isError) {
        logout()
        return;
    }

    const { id_vet, lat, lon, nombre_clinica } = query.data;

    return (
        <View> 
            <MapScreen nombre_clinica={nombre_clinica} lat={ parseFloat(lat) } lon={ parseFloat(lon) }></MapScreen>
        </View>
    );
}

