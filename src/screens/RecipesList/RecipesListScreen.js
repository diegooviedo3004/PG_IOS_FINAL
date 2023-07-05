import React, { useLayoutEffect } from "react";
import {  Text, View, TouchableHighlight, Image, Dimensions } from "react-native";

import {  useRef, useState } from "react";
import {
  ScrollView,
  Linking,
} from "react-native";
import styles from "./styles";
import Carousel from "react-native-snap-carousel";
import ViewIngredientsButton from "../../components/ViewIngredientsButton/ViewIngredientsButton";
import { baseUrl } from "../../utils/login";
import { getCategoryById, getCategoryName } from "../../data/MockDataAPI";
import loginStore from "../../utils/store";

const { width: viewportWidth } = Dimensions.get("window");

export default function RecipesListScreen(props) {

  const { item } = props;
  item.photosArray =  [
    item.image,
  ]
  const category = getCategoryById(1);
  const title = getCategoryName(1);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: props.title,
      headerRight: () => <View />,
    });
  }, []);

  const { code } = loginStore();

  const slider1Ref = useRef();


  return (
    <View>
      <ScrollView style={styles.container}>
        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <Carousel
              ref={slider1Ref}
              data={item.photosArray}
              renderItem={renderImage}
              sliderWidth={viewportWidth}
              itemWidth={viewportWidth}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              firstItem={0}
              loop={false}
              autoplay={false}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={(index) => setActiveSlide(0)}
            />
            {/* <Pagination
            dotsLength={item.photosArray.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotColor="rgba(255, 255, 255, 0.92)"
            dotStyle={styles.paginationDot}
            inactiveDotColor="white"
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={slider1Ref.current}
            tappableDots={!!slider1Ref.current}
          /> */}
          </View>
        </View>
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.nombre}</Text>
          <View style={styles.infoContainer}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() =>
                navigation.navigate("RecipesList", { category, title })
              }
            >
              <Text style={styles.category}>
                {item.raza}
              </Text>
            </TouchableHighlight>
          </View>

          <View style={styles.infoContainer}>
            <Image
              style={styles.infoPhoto}
              source={require("../../../assets/icons/time.png")}
            />
            <Text style={styles.infoRecipe}>{item.fecha_nacimiento}</Text>
          </View>

          <View style={styles.infoContainer}>
            <ViewIngredientsButton
              nombre={item.nombre}
              onPress={() => {
                Linking.openURL(`${baseUrl}/descargar/?code=${code}&paciente=${item.id}`);
              }}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}>{item.peso}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
