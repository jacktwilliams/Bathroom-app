import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, Image, ActivityIndicator, TouchableOpacity, Dimensions} from 'react-native';
import consts from '../Utility/Constants';
import ReviewsButton from '../Components/ReviewsButton';
import StarRating from 'react-native-star-rating';


const serverAddr = consts.addr + "?institution=Winona%20State%20University";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Institution extends Component {

 static navigationOptions = {
   title: 'Winona State University',
   headerStyle: {
    backgroundColor: consts.accentColor,
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

  /*
    Parses JSON received from server query. Each building will have a list with its bathrooms and reviews.
    In Building we will put the reviews into the corresponding bathrooms.
  */
  moveBathroomsAndReviewsIntoBuildings() {
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
  }

  getInstitutionData() {
    fetch(serverAddr)
    .then((res) => {
      return res.json();
    })
    .then((resJson) => {
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
      console.log("Error getting institution data from server (or error parsing json)\n" + error);
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
                    console.log("Sending building data to building page: " + JSON.stringify(item.item));
                    this.props.navigation.navigate("Building", {buildingData: item.item});
                }}>
                <View style={styles.border}>
                  <Text style={styles.buildingNameStyling}>{item.item.build_name}</Text>
                </View>
                </TouchableOpacity>
              );
            }}
        />
        <ReviewsButton dataHolder={this.state.institutionData} />
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
  buildingNameStyling: {
    marginLeft: 18,
    marginTop: 20,
    marginBottom: 30,
    fontSize: 20
  },
  border: {
    borderBottomColor: "#30405A",
    borderBottomWidth: .2,
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
