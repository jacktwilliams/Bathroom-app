import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, Image, ActivityIndicator, TouchableOpacity, Dimensions} from 'react-native';
import consts from '../Utility/Constants';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Building extends Component {

 static navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('buildingData', null).build_name,
    headerStyle: {
      backgroundColor: consts.accentColor,
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
  }

  moveReviewsIntoBathrooms() {
    let bathrooms = this.state.bathrooms;
    let reviews = this.state.reviews;

    for (let i = 0; i < bathrooms.length; ++i) {
      bathrooms[i].title = this.state.buildingData.build_name + " " + bathrooms[i].floor_num + bathrooms[i].gender; 
      bathrooms[i].reviews = [];
    }
    for (let i = 0; i < reviews.length; ++i) {
      let currentRev = reviews[i];
      for (let x = 0; x < bathrooms.length; ++x) {
        if(currentRev.bath_id === bathrooms[x].bath_id) {
          bathrooms[x].reviews.push(currentRev);
        }
      }
    }
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

        <ReviewButton dataHolder={this.state.buildingData} />
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
