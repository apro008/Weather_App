import React, {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  ScrollView,
  TextInput,
  StyleSheet,
  ImageBackground,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {ImgArr} from './component/ImageArr';

import {API} from './Config';

const {height, width} = Dimensions.get('window');

const HideKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);

  console.log(query);
  console.log(weather);

  const search = event => {
    if (query) {
      fetch(`${API.baseUrl}/current.json?key=${API.key}&q=${query}&aqi=yes`)
        .then(response => response.json())
        .then(response => {
          console.log(response);
          setWeather(response);
          setQuery('');
        });
    }
  };

  const Current_date = d => {
    let months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let date = d.getDate();
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${date} ${month} ${year} - ${day}`;
  };

  React.useEffect(() => {
    //getLocalTime();
  }, []);

  // const bg = () => {
  //   if()
  // }

  const cTime = async () => {
    const localtime = await weather.location.localtime;
    const time = localtime.split(' ').pop();
    const a = `0${time}`;
    const timeWithAmPm = () => {
      if (time.length < 5) {
        return a;
      } else {
        return time;
      }
    };
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        style={styles.image}
        source={require('./asset/sunny.jpg')}
      />
      <View style={styles.searchBar}>
        <Feather
          name="search"
          size={23}
          style={{marginLeft: 10, paddingLeft: 7, paddingRight: 7}}
          color="#aeafb0"
        />
        <TextInput
          placeholder="Search Here..."
          placeholderTextColor="#808080"
          style={styles.SearchBar}
          value={query}
          onChangeText={text => setQuery(text)}
          onEndEditing={search}
        />
      </View>

      {weather != undefined || null ? (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.weatherContainer}>
            <View style={{marginTop: height * 0.12}}>
              <Text
                style={[
                  styles.textShadow,
                  styles.placeText,
                ]}>{`${weather?.location?.name}`}</Text>
              <Text
                style={[
                  styles.textShadow,
                  styles.countryText,
                ]}>{`${weather?.location?.country}`}</Text>
            </View>
            <View>
              <Text style={styles.dayText}>{weather?.location?.localtime}</Text>
            </View>
            <View style={styles.tempBox}>
              <TouchableOpacity>
                <Text
                  style={
                    styles.tempText
                  }>{`${weather?.current?.temp_c}°C`}</Text>
                <Text style={[styles.tempText, styles.aiqText]}>
                  {`AQI-${Math.round(weather?.current?.air_quality?.no2)}`}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={[styles.textShadow, styles.weatherText]}>
                {`'${weather?.current?.condition?.text}'`}
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  aiqText: {
    fontSize: 35,
  },
  countryText: {
    fontFamily: 'Squad-SemiBoldItalic',
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  placeText: {
    //fontFamily: 'CodeNext-SemiBold',
    fontSize: 28,
    color: '#fff',
    textAlign: 'center',
    //marginBottom: 10,
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.65)',
    textShadowOffset: {width: 2, height: 5},
    textShadowRadius: 10,
  },
  weatherContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherText: {
    //fontFamily: 'Squad-SemiBoldItalic',
    fontSize: 50,
    color: '#fff',
    marginBottom: 10,
    marginTop: 10,
  },
  dayText: {
    fontFamily: 'Squad-SemiBoldItalic',
    fontSize: 24,
    color: '#fff',
    alignItems: 'center',
    textAlign: 'center',
    margin: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 2, height: 5},
    textShadowRadius: 10,
  },
  tempText: {
    fontSize: 70,
    color: '#fff',
    fontFamily: 'Acme-Regular',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -2, height: 5},
    textShadowRadius: 10,
    textAlign: 'center',
  },
  tempBox: {
    height: height * 0.35,
    width: width - 30,
    backgroundColor: '#ffffff70',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: -5,
      height: 3,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4.65,
    //elevation: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: width * 0.11,
    width: width / 1.3,
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    backgroundColor: '#e0e1e3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    //backgroundColor: '#fff',
  },
  SearchBar: {
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
