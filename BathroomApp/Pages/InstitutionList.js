import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class InstitutionList extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bathroom App</Text>
          <View style={styles.buttonGroup}> 
            <Button title={'LOG IN'}/>
            <Button title={'CREATE AN ACCOUNT'}/>
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