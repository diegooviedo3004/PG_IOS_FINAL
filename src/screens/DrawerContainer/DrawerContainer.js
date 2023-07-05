import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import MenuButton from "../../components/MenuButton/MenuButton";
import loginStore from "../../utils/store";

export default function DrawerContainer(props) {
  const { navigation } = props;
  const {logout} = loginStore()
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="HOME"
          source={require("../../../assets/icons/home.png")}
          onPress={() => {
            navigation.navigate("Home");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="PRODUCTOS"
          source={require("../../../assets/icons/category.png")}
          onPress={() => {
            navigation.navigate("Productos");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="SEARCH"
          source={require("../../../assets/icons/search.png")}
          onPress={() => {
            navigation.navigate("Search");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="TU VETERINARIO"
          source={require("../../../assets/icons/maps.png")}
          onPress={() => {
            navigation.navigate("Tu veterinario");
            navigation.closeDrawer();
          }}
        />
         <MenuButton
          title="LOGOUT"
          source={require("../../../assets/icons/search.png")}
          onPress={() => {
            logout()
          }}
        />
      </View>
    </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
