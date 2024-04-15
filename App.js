import React, { useState, useEffect } from "react";
import {
  TextInput,
  Button,
  View,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import serviceWeather from "./services/index.js";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { weatherImages } from "./constants/index.js";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    getWeatherByCountry("Mexico");
  }, []);

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleSubmit = () => {
    // Si inputText está vacío, establece "Mexico" como valor por defecto
    const country = inputText.trim() === "" ? "Mexico" : inputText.trim();
    getWeatherByCountry(country);
  };

  const getWeatherByCountry = async (country) => {
    try {
      const response = await serviceWeather.getWeather(country);
      setWeatherData(response);
    } catch (error) {
      console.error("Error obteniendo el clima:", error);
      Alert.alert(
        "Error",
        "Hubo un error al obtener el clima. Por favor, intenta nuevamente."
      );
    }
  };

  return (
    <LinearGradient colors={["#2EAEBF", "#A7E1E9"]} style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          placeholder="Ingresa el nombre de la ciudad..."
          onChangeText={handleInputChange}
          value={inputText}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
      {weatherData && (
        <View style={styles.weatherData}>
          <View>
            <Text style={styles.country}>{weatherData.Ubicacion}</Text>
          </View>
          <View style={styles.weatherToday}>
            <Text style={styles.today}>Clima Hoy:</Text>
            <Image
              style={styles.TodayWea}
              source={weatherImages[weatherData.CondicionClimaticaActual]}
            />
            <View style={styles.row}>
              <Text>Temperatura: {weatherData.TemperaturaActual}° </Text>
              <Text>|</Text>
              <Text>Humedad: {weatherData.HumedadActual}</Text>
            </View>
          </View>
          
          <View style={styles.rows}>
            {weatherData.Pronostico.map((pronos, index) => (
              <View style={styles.otherDay} key={index}>
                <Image
                  style={styles.otherWea}
                  source={weatherImages[pronos.CondicionClimatica]}
                />
              </View>
            ))}
          </View>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  search: {
    flexDirection: "row",
    marginBottom: 40,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#33B4FF",
    borderRadius: 10,
  },
  button: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  country: {
    fontWeight: "bold",
    fontSize: 36,
  },
  weatherData: {
    display: "flex",
    width: 350,
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    gap: 20,
  },
  TodayWea: {
    width: 150,
    height: 150,
  },
  weatherToday: {
    width: 350,
    height: 300,
    backgroundColor: "#fff",
    display: "flex",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  today: {
    fontSize: 24,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    gap: 20,
  },
  pronos: {
    backgroundColor: "red",
  },
  rows: {
    flexDirection: "row",
    gap: 10,
  },
  otherWea: {
    width: 50,
    height: 50,
  },
  otherDay: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10
  }
});
