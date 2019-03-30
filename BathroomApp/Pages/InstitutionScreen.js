import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default class InstitutionScreen extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bathroom App</Text>
          <View style={styles.buttonGroup}> 
            <Button title={'Institution'}/>
          </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#5495ff',
  },
  title: {
    flex: 1,
    marginTop: 100,
    fontSize: 40,
    textAlign: 'center',
    color: '#333333',
  },
  buttonGroup: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
  }
});