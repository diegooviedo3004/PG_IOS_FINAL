import React, { useLayoutEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  Linking,
} from "react-native";
import styles from "./styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  getIngredientName,
  getCategoryName,
  getCategoryById,
} from "../../data/MockDataAPI";
import BackButton from "../../components/BackButton/BackButton";
import ViewIngredientsButton from "../../components/ViewIngredientsButton/ViewIngredientsButton";
import { baseUrl, getCitas } from "../../utils/login";
import loginStore from "../../utils/store";
import { useQuery } from "react-query";
import DataTablePaper from "./ListPaper";

const { width: viewportWidth } = Dimensions.get("window");

export default function RecipeScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.item;
  const category = getCategoryById(1);
  const title = getCategoryName(1);
  item.photosArray =  [
    item.foto,
   
  ]

  const [activeSlide, setActiveSlide] = useState(0);

  const slider1Ref = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: "true",
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const { code, logout } = loginStore();

  const query = useQuery({
    queryFn: () => getCitas({ code }, item.id), // Envuelve la función en otra función
    queryKey: ["getCitas"],
    refetchInterval: 2000,
  });

  if (query.isLoading) return <Text>Cargando</Text>

  if (query.isError) {
    logout()
    return;
  }

  const { citas } = query.data;

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  return (
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
              //navigation.navigate("IngredientsDetails", { ingredients, title });
            }}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>
            <Text style={{textAlign: "center", marginVertical:10}}>Citas pendientes</Text>
            <DataTablePaper data={citas}></DataTablePaper>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
