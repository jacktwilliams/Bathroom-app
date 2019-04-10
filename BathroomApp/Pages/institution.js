import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, Image, ActivityIndicator, TouchableOpacity, Dimensions} from 'react-native';
import StarRating from 'react-native-star-rating';

const serverAddr = "http://192.168.0.9:3000/?institution=Winona%20State%20University";
const accentColor = "#5495ff";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Institution extends Component {

 static navigationOptions = {
   title: 'Winona State University',
   headerStyle: {
    backgroundColor: accentColor
  }
 }

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

  //puts each bathroom as a json property of the correct building
  moveBathroomsAndReviewsIntoBuildings() {
    //initialize each building with an empty bathroom list and empty review list
    let buildings = this.state.buildings;
    let bathrooms = this.state.bathrooms;
    let reviews = this.state.reviews;
    
    for(let i = 0; i < buildings.length; ++i) {
      buildings[i].bathrooms = [];
      buildings[i].reviews = [];
    }

    for(let i = 0; i < bathrooms.length; ++i) {
      let currentBathroom = bathrooms[i];
      for(let x = 0; x < buildings.length; ++x) {
        if(buildings[x].build_id === currentBathroom.build_id) {
          buildings[x].bathrooms.push(currentBathroom);
        }
      } 
    }

    for(let i = 0; i < reviews.length; ++i) {
      let currentReview = reviews[i];
      for(let x = 0; x < buildings.length; ++x) {
        if(buildings[x].build_id === currentReview.build_id) {
          buildings[x].reviews.push(currentReview);
        }
      }
    }
    console.log(JSON.stringify(buildings));
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
      this.moveBathroomsAndReviewsIntoBuildings();
      console.log("Recieved institution data and parsed reviews and bathrooms into the correct buildings.");
    })
    .catch((error) => {
      console.log("Error getting institution data from server\n" + error);
    });
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
              return (
                <TouchableOpacity 
                  onPress={() => {
                    console.log("Sending item: " + JSON.stringify(item.item));
                    this.props.navigation.navigate("Building", {buildingData: item.item});
                }}>
                <View style={styles.border}>
                  <Text style={styles.buildingNameStyling}>{item.item.build_name}</Text>
                </View>
                </TouchableOpacity>
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
                console.log(JSON.stringify(this.props.navigation));
                this.props.navigation.navigate("ReviewList", {dataHolder: this.state.institutionData});
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
    width: width * .49,
    height: height * .07,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buildingNameStyling: {
    marginLeft: 18,
    marginTop: 20,
    marginBottom: 30,
    fontSize: 20
  },
  border: {
    borderBottomColor: "#30405A",
    borderBottomWidth: .17,
    marginLeft: 10,
    marginRight: 10,
    flex: 1, 
    flexDirection: 'row'
  },
  stars: {
    marginLeft: 'auto',
    marginTop: 15
  }
});
