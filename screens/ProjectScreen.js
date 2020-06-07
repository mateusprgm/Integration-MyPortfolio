import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { useNavigation,useRoute } from '@react-navigation/native';

import { useState, useEffect } from 'react';

import api from '../services/api';
import { openURL } from 'expo-linking';


export default function ProjectScreen() {
 
  
  const [events, setEvents] = useState([]);
  const route = useRoute();
  const repository = route.params.repository;

  
  let description = "";

  if(repository.description != null){
    description = repository.description.substr(0, 45)+"...";
  }

  async function loadRepositories() {

    try{
      
      const response = await api.get(`${repository.events_url}`);

      setEvents([...events, ...response.data]);

      console.log(response.data);
    } catch (error) {

      console.log(error);
    }
    
  }

  useEffect(() => {
    loadRepositories();
  },[]);

  let label = "";

  return (
    <ScrollView style={styles.containe} contentContainerStyle={styles.contentContainer}>
      <OptionButton
          key={repository.id}
          icon="md-school"
          label="Visit this repository"
          onPress={() => openURL(repository.svn_url)}
      />
      
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionTextContainer, styles.itemName}>
          <Text style={styles.optionText, styles.negrito}>{repository.name}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionTextContainer, styles.itemName}>
          <Text style={styles.optionText}>{description}</Text>
        </View>
      </View>

      {events.map(event=>(
        <OptionButton
          key={event.id}
          label={`${event.type} by ${event.actor.display_login} Click to Visit ->`}
          onPress={() => openURL(`https://github.com/${event.actor.login}`)}
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
  }
});
