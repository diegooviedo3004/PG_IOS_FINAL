import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, Linking } from "react-native";
import styles from "./styles";
import { recipes } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";
import loginStore from "../../utils/store";
import { useQuery } from "react-query";
import { baseUrl, loginServer } from "../../utils/login";
import DownloadImage from "../../components/MenuImage/DownloadImage";

export default function HomeScreen(props) {
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
      headerRight: () => <DownloadImage 
      onPress={() => {
        Linking.openURL(`${baseUrl}/descargar/?code=${code}`);
      }}/>,
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

  const { pacientes } = query.data;
  
  

  const onPressRecipe = (item) => {
    navigation.navigate("Detalles", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight    underlayColor="transparent" onPress={() => onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.foto }} />
        <Text style={styles.title}>{item.nombre}</Text>
        <Text style={styles.category}>{item.raza}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={pacientes} renderItem={renderRecipes} keyExtractor={(item) => `${item.id}`} />
    </View>
  );
}
