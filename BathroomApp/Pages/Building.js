import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, Image, ActivityIndicator, TouchableOpacity, Dimensions} from 'react-native';


const accentColor = "#30405A"
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Building extends Component {

 static navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('buildingData', null).build_name,
    headerStyle: {
      backgroundColor: accentColor
    }
  };
};

  constructor(props) {
    super(props);

    let buildingData = this.props.navigation.getParam("buildingData", null);
    this.state = {
      buildingData: buildingData,
      bathrooms: buildingData.bathrooms,
      reviews: buildingData.reviews,
      renderList: false, //flip this boolean to re-render flatlist
    };

    console.log("Our bathrooms:\n" + this.state.bathrooms);
    
    //here we will want to parse the reviews into the corresponding bathrooms.
  }

  render() {
    return (
      <View style={styles.container}>

        <FlatList 
            data={this.state.bathrooms}
            extraData={this.state.renderList}
            keyExtractor={(item, index) => {
              return item.bath_id.toString()
            }}
            renderItem={(item) => {
              item = item.item;
              return (
                <Text>{this.state.buildingData.build_name + " " + item.floor_num + item.gender}</Text>
              );
            }}
        />

        <View style={styles.tabContainer}>
            <TouchableOpacity style={[styles.tabButton, styles.selectedButton]}>
              <Text style={styles.selectedText}>Buildings</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabButton, styles.notSelectedButton]}
              onPress={() => {
                this.props.navigation.navigate("ReviewList", {dataHolder: this.state.buildingData});
              }}  
            >
              <Text style={styles.notSelectedText}>All Reviews</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  HeaderTitle: {
    fontSize: 25
  },
  listedBuilding: {
    marginLeft: 20,
    marginTop: 30,
    fontSize: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: accentColor,
    height: height * .07,
  },
  selectedButton: {
    borderRightWidth: 2,
    borderRightColor: 'black',
  },
  notSelectedButton: {

  },
  selectedText: {

  },
  notSelectedText: {

  },
  tabButton: {
    width: width * .49,
    height: height * .07,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
