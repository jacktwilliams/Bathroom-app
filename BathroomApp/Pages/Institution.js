import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, Image, ActivityIndicator} from 'react-native';
import { createStackNavigator, createAppContainer, HeaderBackButton  } from "react-navigation";
import console = require('console');

const serverAddr = "http://10.19.4.1:3000/?institution=Winona%20State%20University";

export default class Institution extends Component {
  constructor(props) {
    super(props);

    this.state = {
      institutionData: null,
      buildings: null,
    };

    this.getInstitutionData();
  }

  getInstitutionData() {
    fetch(serverAddr)
    .then((error, res) => {
      if(error) {
        console.log("Error getting institution data from server: " + error);
      }
      else {
        console.log(JSON.stringify(res));
        //set state here.
      }
    });
  }

  static navigationOptions = ({ navigation }) => {
    let headerTitle = (<Text style={styles.HeaderTitle}>Insititution</Text>);
    let headerLeft = <HeaderBackButton onPress={() => navigation.goBack(null)} />
    let headerRight = (<Button 
        title={"Next"}
        containerStyle={{margin: 5, padding: 10, borderRadius: 10, backgroundColor: "darkviolet"}}
        style={styles.headerButton}></Button>);
    return {headerTitle, headerRight, headerLeft,headerStyle: {
        backgroundColor: '#5495ff'
     }}
  }
  

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.BuildingComponents}>

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
    backgroundColor: '#FFF',
  },
  HeaderTitle: {
    fontSize: 25
  },
  BuildingComponents: {
    
  }
});
