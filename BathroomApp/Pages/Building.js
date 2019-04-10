import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, Image, ActivityIndicator, TouchableOpacity, Dimensions} from 'react-native';


const accentColor = "#5495ff"
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
    
    //here we will want to parse the reviews into the corresponding bathrooms.
    //we will also give the bathrooms a title here.
    this.moveReviewsIntoBathrooms();
    console.log("OUR STATE BUILDINGS: " + JSON.stringify(this.state));
  }

  moveReviewsIntoBathrooms() {
    let bathrooms = this.state.bathrooms;
    let reviews = this.state.reviews;

    for (let i = 0; i < bathrooms.length; ++i) {
      bathrooms[i].title = this.state.buildingData.build_name + " " + bathrooms[i].floor_num + bathrooms[i].gender
      bathrooms[i].reviews = [];
    }
    for (let i = 0; i < reviews.length; ++i) {
      let currentRev = reviews[i];
      console.log(JSON.stringify(currentRev));
      for (let x = 0; x < bathrooms.length; ++x) {
        console.log("Bathroom check: " + JSON.stringify(bathrooms[x]))
        if(currentRev.bath_id === bathrooms[x].bath_id) {
          console.log("Correct bathroom.");
          bathrooms[x].reviews.push(currentRev);
        }
      }
    }
    console.log("Bathrooms: \n\n" + JSON.stringify(this.state.bathrooms));
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
              console.log(JSON.stringify(item));
              return (
                <View style={styles.border}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("ReviewList", {dataHolder: item.item});
                    }}
                  >
                    <Text style={styles.buildingNameStyling}>{this.state.buildingData.build_name + " " + item.item.floor_num + item.item.gender}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
        />

        <View style={styles.tabContainer}>
            {/* <TouchableOpacity style={[styles.tabButton, styles.selectedButton]}>
              <Text style={styles.selectedText}>Buildings</Text>
            </TouchableOpacity> */}
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
    fontSize: 18
  },
  notSelectedText: {
    fontSize: 18
  },
  tabButton: {
    width: width,
    height: height * .07,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buildingNameStyling: {
    marginLeft: 15,
    marginTop: 12,
    marginBottom: 12,
    fontSize: 20
  },
  border: {
    borderBottomColor: "#30405A",
    borderBottomWidth: .17,
    marginLeft: 10,
    marginRight: 10
  }
});
