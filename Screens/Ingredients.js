import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const Ingredients = ({navigation}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://8b648f3c-b624-4ceb-9e7b-8028b7df0ad0.mock.pstmn.io/dishes/v1/1',
      );
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderIngredient = item => (
    <View style={styles.ingredientItem}>
      <Text style={styles.text1}>{item.name}</Text>
      <Text style={styles.text1}>{item.quantity}</Text>
    </View>
  );

  const renderAppliance = item => (
    <View style={styles.applianceItem}>
      <Image
        source={require('.././assets/images/Refrigde.png')}
        style={styles.applianceImage}
      />
      <Text style={styles.text1}>{item.name}</Text>
    </View>
  );

  if (!data) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{width: 40}}>
          <Image
            resizeMode="contain"
            style={{height: 20}}
            source={require('.././assets/images/back.png')}
          />
        </TouchableOpacity>
        <View style={styles.heroSection}>
          <View style={{gap: 5}}>
            <View
              style={{flexDirection: 'row', gap: 5, alignItems: 'flex-end'}}>
              <Text style={styles.dishName}>{data.name}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>4.2</Text>
                <Image source={require('.././assets/images/star.png')} />
              </View>
            </View>
            <Text style={styles.heroText}>
              Mughlai Masala is a style of cookery developed in the Indian
              Subcontinent by the imperial kitchens of the Mughal Empire.
            </Text>
          </View>

          {/* add image in text clock */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              resizeMode="contain"
              style={{height: 20}}
              source={require('.././assets/images/clock.png')}
            />
            <Text style={styles.timeToPrepare}>{data.timeToPrepare}</Text>
          </View>
          {/* rightImage  */}
          <View style={styles.bannerImage}>
            <Image
              resizeMode="contain"
              style={{height: 180}}
              source={require('.././assets/images/veggies.png')}
            />
            <Image
              resizeMode="contain"
              style={{height: 210, position: 'absolute', left: 100}}
              source={require('.././assets/images/bowl.png')}
            />
          </View>
        </View>

        <View
          style={{
            paddingVertical: 10,
            borderBottomColor: '#F2F2F2',
            borderBottomWidth: 2,
          }}>
          <Text style={styles.heading}>Ingredients:</Text>
          <Text style={styles.heroText}>For 2 people</Text>
        </View>
        {/* Veg */}
        <View style={styles.dropdown}>
          <Text style={styles.heading2}>Vegetables (05)</Text>
          <Image
            resizeMode="contain"
            style={{height: 8}}
            source={require('.././assets/images/dropdown.png')}
          />
        </View>
        {data.ingredients.vegetables.map((item, index) => (
          <View key={index}>{renderIngredient(item)}</View>
        ))}
        {/* Spices */}
        <View style={styles.dropdown}>
          <Text style={styles.heading2}>Spices (10)</Text>
          <Image
            resizeMode="contain"
            style={{height: 8}}
            source={require('.././assets/images/dropdown.png')}
          />
        </View>
        {data.ingredients.spices.map((item, index) => (
          <View key={index}>{renderIngredient(item)}</View>
        ))}

        {/* appliances */}
        <Text style={styles.heading}>Appliances:</Text>
        <FlatList
          data={data.ingredients.appliances}
          keyExtractor={item => item.name}
          renderItem={({item}) => renderAppliance(item)}
          horizontal
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },

  // Hero
  heroSection: {
    borderBottomWidth: 3,
    borderBottomColor: '#F2F2F2',
    gap: 20,
    zIndex: 1000,
  },
  heroText: {
    width: '70%',
    color: '#A3A3A3',
    lineHeight: 22,
    fontSize: 12,
  },
  timeToPrepare: {
    color: '#1c1c1c',
  },

  // banner

  bannerImage: {
    position: 'absolute',
    zIndex: -20,
    left: 60,
    bottom: -50,
  },
  dishName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#242424',
    marginTop: 25,
  },

  heading: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'OpenSans-Bold',
    marginTop: 20,
    color: '#1c1c1c',
  },
  heading2: {
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    color: '#1c1c1c',
  },

  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  applianceItem: {
    alignItems: 'center',
    margin: 10,
  },
  applianceImage: {
    resizeMode: 'contain',
    height: 70,
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

  dropdown: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  text1: {
    color: '#1c1c1c',
  },
});

export default Ingredients;
