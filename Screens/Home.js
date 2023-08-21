import {
  StyleSheet,
  Text,
  View,
  Image,
  Touchable,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const navigation = createNativeStackNavigator();

const CuisineButtons = [
  {name: 'Indian'},
  {name: 'Italian'},
  {name: 'Mexican'},
  {name: 'Chinese'},
  {name: 'Japanese'},
];

const API_URL =
  'https://8b648f3c-b624-4ceb-9e7b-8028b7df0ad0.mock.pstmn.io/dishes/v1/';

const Home = ({navigation}) => {
  const [data, setData] = useState('');
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
    } catch (error) {
      setError('An error occurred while fetching data.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderPopularDishes = ({item}) => {
    return (
      <View style={styles.circleDish}>
        <ImageBackground
          resizeMode="cover"
          source={{uri: item.image}}
          style={styles.circleImage}>
          <Text style={styles.circleText}>{item.name}</Text>
        </ImageBackground>
      </View>
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.lists}>
      <View style={{width: '50%', gap: 10}}>
        <View style={styles.row1}>
          <Text style={styles.heading2}>{item.name}</Text>
          <Image source={require('.././assets/images/veg.png')} />
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Image source={require('.././assets/images/star.png')} />
          </View>
        </View>
        <View style={styles.row2}>
          <View style={{alignItems: 'center'}}>
            <Image source={require('.././assets/images/fridge.png')} />
            <Text style={styles.text3}>Refrigerator</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image source={require('.././assets/images/fridge.png')} />
            <Text style={styles.text3}>Refrigerator</Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 13,
                color: '#1C1C1C',
                fontFamily: 'OpenSans-Bold',
              }}>
              Ingredients
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Ingredients')}>
              <Text style={{color: '#FF8800', fontSize: 12}}>View list > </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
      </View>
      <View>
        <Image source={{uri: item.image}} style={styles.image} />
        <TouchableOpacity activeOpacity={0.9}>
          <View style={styles.addItem}>
            <Text style={styles.addItemText}>Add</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('.././assets/images/back.png')}
            resizeMode="contain"
            style={{height: '60%'}}
          />
          <Text style={styles.heading1}>Select Dishes</Text>
        </View>
        <View style={styles.blackBackground}></View>

        {/* // Date and Time  */}
        <View style={styles.dateTime}>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <Image
                resizeMode="contain"
                source={require('.././assets/images/calendar.png')}
                style={{aspectRatio: 16 / 10}}
              />
              <Text style={styles.heading3}>19 Aug 2023</Text>
            </View>
            <View
              style={[
                styles.rowItem,
                {borderLeftColor: '#D6D6D6CE', borderLeftWidth: 0.5},
              ]}>
              <Image
                resizeMode="contain"
                source={require('.././assets/images/clock.png')}
                style={{aspectRatio: 16 / 11}}
              />
              <Text style={styles.heading3}>10:30 Pm-12:30 Pm</Text>
            </View>
          </View>
        </View>

        {/* Categories  */}
        <View style={styles.hero}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            <View style={styles.cuisine}>
              {CuisineButtons.map(item => (
                <TouchableOpacity style={styles.cuisineBtn}>
                  <Text style={styles.cuisineBtnTxt}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <Text style={styles.heading3}>Popular Dishes</Text>
          {/* Popular Dishes */}
          <FlatList
            horizontal
            data={data.popularDishes}
            keyExtractor={item => item.id.toString()}
            renderItem={renderPopularDishes}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Recommended Section  */}
        <View style={styles.section}>
          <View>
            <View style={styles.sectionRow}>
              <Text style={styles.heading1}>Recommended</Text>
              <Image
                style={{height: 7}}
                resizeMode="contain"
                source={require('.././assets/images/dropdown.png')}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.menuBtn}>
            <Text style={styles.menuBtnTxt}>Menu</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data.dishes}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />

        {/* Items Selected  */}
        <View style={styles.itemSelected}>
          <Image
            resizeMode="contain"
            style={{height: 25}}
            source={require('.././assets/images/burger.png')}
          />
          <Text style={styles.itemText}>3 food items selected</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  // Header
  header: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 20,
    alignItems: 'center',
  },
  heading1: {
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    lineHeight: 22,
    color: '#1C1C1C',
  },
  heading2: {
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    lineHeight: 22,
    color: '#1C1C1C',
  },
  heading3: {
    fontWeight: '600',
    fontFamily: 'OpenSans-Bold',
    fontSize: 14,
    lineHeight: 22,
    color: '#1C1C1C',
  },
  blackBackground: {
    backgroundColor: '#1C1C1C',
    height: 50,
  },

  // Date and Time
  dateTime: {
    marginTop: -22,
    marginHorizontal: '6%',
    padding: 20,
    paddingVertical: 22,
    backgroundColor: '#fff',
    borderRadius: 9,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  // Hero section
  hero: {
    paddingLeft: '6%',
    marginVertical: 20,
    gap: 12,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 4,
    paddingVertical: 10,
  },
  cuisine: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  cuisineBtn: {
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    // borderColor : "#FF941A",
    // width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 7,
  },
  cuisineBtnTxt: {
    // color : "#FF941A",
    color: '#8A8A8A',
    fontSize: 12,
    lineHeight: 14,
    fontFamily: 'OpenSans-Medium',
  },

  circleDish: {
    height: 75,
    width: 75,
    borderRadius: 40,
    borderColor: '#FF941A',
    borderWidth: 2,
    padding: 1,
    overflow: 'hidden',
    marginRight: 15,
  },
  circleImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    color: '#ffffff',
    fontFamily: 'OpenSans-SemiBold',
  },
  // {/* Recommended Section  */}
  section: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  menuBtn: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#1C1C1C',
    borderRadius: 6,
    elevation: 4,
  },
  menuBtnTxt: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'OpenSans-Bold',
  },
  lists: {
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#D6D6D6CE',
    paddingVertical: 20,
    flexDirection: 'row',
  },

  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  text3: {
    color: '#1C1C1C',
    fontSize: 10,
  },
  bold: {},
  image: {
    height: 90,
    width: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  itemDescription: {
    color: '#707070',
    fontSize: 11,
    fontFamily: 'OpenSans-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    padding: 2,
    backgroundColor: '#51C452',
    borderRadius: 2,
  },
  ratingText: {
    color: '#ffffff',
    fontWeight: '600',
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
  },
  addItem: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: -10,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 4,
    borderRadius: 3,
  },
  addItemText: {
    color: '#FF8800',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
  },
  itemSelected: {
    flexDirection: 'row',
    // justifyContent : 'center',
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    marginHorizontal: 50,
    padding: 12,
    borderRadius: 7,
    bottom: 10,
    elevation: 3,
  },
  itemText: {
    color: '#fff',
    fontFamily: 'OpenSans-SemiBold',
    letterSpacing: 0.12,
  },
});
