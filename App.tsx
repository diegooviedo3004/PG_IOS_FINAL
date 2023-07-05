import { StatusBar } from "expo-status-bar";
import {  StyleSheet, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
import RootNavigator from "./src/navigators/RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useMemo } from "react";
import loginStore from "./src/utils/store";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import AppContainer from './src/navigations/AppNavigation';
import { PaperProvider } from 'react-native-paper';

const queryClient = new QueryClient()

export default function App() {
  // Let's add dark mode
  const colorScheme = useColorScheme();
  const theme: Theme = useMemo(
    () =>
      colorScheme === "dark"
        ? {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            primary: "#fff",
          },
        }
        : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: "#000",
          },
        },
    [colorScheme]
  );
  // Not Working

  const { code } = loginStore()

  return (
    <QueryClientProvider client={queryClient}>
        <PaperProvider>

      {code ? (
         <AppContainer />
      ) : (
        <SafeAreaProvider style={styles.container}>
          <NavigationContainer theme={theme}>
            <RootNavigator/>
          </NavigationContainer>
          <StatusBar style="auto" />
        </SafeAreaProvider>
      )}
        </PaperProvider>

    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
