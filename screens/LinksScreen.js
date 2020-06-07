import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { useState, useEffect } from 'react';

import api from '../services/api';

export default function LinksScreen() {
  
  const navigation = useNavigation();

  const [repositories, setRepositories] = useState([]);
  
  async function loadRepositories() {
    
    try {
      const response = await api.get('/repos');

      setRepositories([...repositories, ...response.data]);

      console.log(response.data);
    } catch (error) {

      console.log(error);
    }
    
  }

  useEffect(() => {
    loadRepositories();
  },[]);

  function navigateToDetail(repository) {
      navigation.navigate('Project', { repository });
  }

  

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {repositories.map(repository =>(
        <OptionButton
          key={repository.id}
          icon="md-school"
          label={repository.name}
          onPress={() => navigateToDetail(repository)}
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
          <Text style={styles.optionText}>{label}</Text>
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
});
