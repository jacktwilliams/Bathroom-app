import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, Image, ActivityIndicator, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import consts from '../Utility/Constants';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class AddReview extends Component {

 static navigationOptions = ({ navigation }) => {

  let dataHolder = navigation.getParam("dataHolder", null);
  let title;
//   if (dataHolder.bathrooms) { //came here from buildings page
//     title = dataHolder.build_name + " Reviews";
//   } 
  
  return {
    title: "Add a review",
    headerStyle: {
      backgroundColor: consts.accentColor
    }
  };
};

  constructor(props) {
    super(props);
    let dataHolder = this.props.navigation.getParam("dataHolder", null);
    let revList;
    // if (dataHolder.buildings) { //came here from institution page
    //   revList = dataHolder.allReviews;
    // }
    // else { //came here from buildings or bathrooms page
    //   revList = dataHolder.reviews;
    // }

    this.state = {
      reviews: revList,
      renderList: false, //flip this boolean to re-render flatlist
    };

  }

  render() {
    return (
      <View style={styles.container}>
            <TextInput style={styles.reviewinput} placeholder="Add Review" 
            />
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
    backgroundColor: consts.accentColor,
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
  reviewinput: {
    height: 40,
    paddingLeft: 10
  }
});
