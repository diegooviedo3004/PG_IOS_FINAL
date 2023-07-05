import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import loginStore from "../../utils/store";
import { useQuery } from "react-query";
import { loginServer } from "../../utils/login";

export default function CategoriesScreen(props) {
  const { navigation } = props;
  const { code, logout } = loginStore();
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

  const { productos_5 } = query.data;
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View></View>,
    });
  }, []);

  const onPressCategory = (item) => {
    const title = item.nombre;
    console.log(item)
    navigation.navigate("RecipesList", { item, title });
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight    underlayColor="transparent" onPress={() => alert(item.precio)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.image }} />
        <Text style={styles.categoriesName}>{item.nombre}</Text>
        <Text style={styles.categoriesInfo}>{item.precio}$ (Descuento: {item.descuento}%) </Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList data={productos_5} renderItem={renderCategory} keyExtractor={(item) => `${item.id}`} />
    </View>
  );
}
