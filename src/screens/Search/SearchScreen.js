import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableHighlight, Pressable } from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName, getRecipesByRecipeName, getRecipesByCategoryName, getRecipesByIngredientName, getProductByName } from "../../data/MockDataAPI";
import { TextInput } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import { loginServer } from "../../utils/login";
import loginStore from "../../utils/store";
import { Alert } from 'react-native';

export default function SearchScreen(props) {
  const { navigation } = props;

  const [value, setValue] = useState("");
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerTitle: () => (
        <View style={styles.searchContainer}>
          <Image style={styles.searchIcon} source={require("../../../assets/icons/search.png")} />
          <TextInput
            style={styles.searchInput}
            onChangeText={handleSearch}
            value={value}
          />
          <Pressable onPress={() => handleSearch("")}>
            <Image style={styles.searchIcon} source={require("../../../assets/icons/close.png")} />
          </Pressable>
        </View>
      ),
      headerRight: () => <View />,
    });
  }, [value]);

  useEffect(() => { }, [value]);

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

  
  const { productos } = query.data;

  const handleSearch = (text) => {
    setValue(text);
    var recipeArray1 = getProductByName(productos, text );

    if (text == "") {
      setData([]);
    } else {
      setData(recipeArray1);
    }
  };

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const mostrarAlertaMultilinea = ({ nombre, image, descripcion, precio, descuento }) => {
    Alert.alert(
      'Descripción',
      `${nombre}\n${descripcion}\nPrecio sin descuento: ${precio}.\n\nPrecio con descuento: ${precio - (precio * descuento) / 100} (${descuento}%).`,
      [
        { text: 'Aceptar', onPress: () => console.log('Aceptar presionado') }
      ],
      { cancelable: false }
    );
  }

  const renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor="transparent" onPress={() => mostrarAlertaMultilinea(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.image }} />
        <Text style={styles.title}>{item.nombre}</Text>
        <Text style={styles.category}>Precio: {item.precio}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={3} data={data} renderItem={renderRecipes} keyExtractor={(item) => `${item.id}`} />
    </View>
  );
}
