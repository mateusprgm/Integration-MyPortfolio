import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, RectButton } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';


import api from '../services/api';

export default function HomeScreen() {

  const [profile, setProfile] = useState([]);
  const [received_events, setReceived_events] = useState([]);

  async function loadRepositories() {
    
    try {
      const response = await api.get('');

      setProfile([...profile, response.data]);
      console.log(response.data);
    } catch (error) {

      console.log(error);
    }

    try{
      const response = await api.get(`/received_events`);

      setReceived_events([...received_events, ...response.data]);
      console.log(response.data);
    }catch(error){
      console.log(error);
    }
    
  }

  useEffect(() => {
    loadRepositories();
  },[]);


  return (
    
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {profile.map(item=>(
           
          <View key={`vw${item?.id}`}>
              <Image
                style={styles.imageLarge}
                source={{
                  uri: `${item?.avatar_url}`,
                }}
              />
       
            <Text style={styles.optionTextContainer, styles.center} key={item.id}>Fallowers: {item?.followers}  Following: {item?.following}</Text>
          </View>
      ))}
      
      
        {received_events.map(item=>(
          <OptionButton
              key={item.id}
              icon="md-school"
              label={`${item?.actor?.login} exec ${item?.type}`}
              
          />
        ))}
      </ScrollView>
  );
}


function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText, styles.negrito}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  itemName: {
    paddingLeft: 16
  },
  negrito:{
    fontWeight: "900"
  },
  titleItem:{
    fontSize: 25
  },
  imageLarge: {
    width: 380,
    height: 400,
  },
  center:{
    alignSelf: 'center',
    fontWeight: "900"
  }
});
