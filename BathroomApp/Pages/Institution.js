import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, Image, ActivityIndicator} from 'react-native';
import { createStackNavigator, createAppContainer, HeaderBackButton  } from "react-navigation";


const serverAddr = "http://10.19.4.1:3000/?institution=Winona%20State%20University";

export default class Institution extends Component {
  constructor(props) {
    super(props);

    this.state = {
      institutionData: null,
      buildings: null,
      bathrooms: null,
      buildingsArray: [],
    };

    this.getInstitutionData();
  }

  getInstitutionData() {
    console.log(serverAddr);
    fetch(serverAddr)
    .then((res) => {
      return res.json();
    })
    .then((resJson) => {
      console.log(resJson);
      this.setState({
        institutionData: resJson,
        buildings: resJson.buildings,
        bathrooms: resJson.allBathrooms,
      });
      console.log(resJson.buildings.length);
      console.log(resJson.buildings[1].build_name);
      let buildingsArray = [];
      var arrayLength = resJson.buildings.length;
      for (var i=0; i<arrayLength; i++) {
        buildingsArray[i] = resJson.buildings[i].build_name;
        console.log(i + " contains the building information for " + buildingsArray[i]);
      }
      this.setState({
          buildingsArray: buildingsArray
      });
    
    })
    .catch((error) => {
      console.log("Error getting institution data from server\n" + error);
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
        backgroundColor: '#30405A'
     }}
  }
  

  render() {
    return (
      <View style={styles.container}>

        <FlatList 
            data={this.state.buildingsArray}
            keyExtractor={(x,i) => i}
            renderItem={({item}) =>
            // <View style={styles.borderView}>
                <Text style={styles.listedBuilding}>
                    {`${item}`}
                </Text>
            // </View>
        }
        />

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
  listedBuilding: {
    marginLeft: 20,
    marginTop: 30,
    fontSize: 20,
  }
});
