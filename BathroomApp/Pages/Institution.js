import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, Image, ActivityIndicator} from 'react-native';
import { createStackNavigator, createAppContainer, HeaderBackButton  } from "react-navigation";


const serverAddr = "http://192.168.1.3:3000/?institution=Winona%20State%20University";

export default class Institution extends Component {
  constructor(props) {
    super(props);

    this.state = {
      institutionData: null,
      buildings: [],
      bathrooms: null,
      reviews: null,
      renderList: false, //flip this boolean to re-render flatlist
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
      console.log(resJson.buildings);
      this.setState({
        institutionData: resJson,
        buildings: resJson.buildings,
        bathrooms: resJson.allBathrooms,
        reviews: resJson.allReviews,
        renderList: !this.state.renderList,
      });
      console.log(resJson.buildings.length);
      console.log(resJson.buildings[1].build_name);
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
            data={this.state.buildings}
            extraData={this.state.renderList}
            keyExtractor={(item, index) => {
              return item.build_id.toString()
            }}
            renderItem={(item) => {
              console.log(item)
              return (<Text>{item.item.build_name}</Text>);
            }}
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
