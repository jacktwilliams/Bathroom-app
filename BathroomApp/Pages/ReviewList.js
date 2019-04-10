import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, Image, ActivityIndicator, TouchableOpacity, Dimensions} from 'react-native';

const accentColor = "#30405A"
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class ReviewList extends Component {

 static navigationOptions = ({ navigation }) => {

  let dataHolder = navigation.getParam("dataHolder", null);
  let title;
  if (dataHolder.buildings) { //came here from institution page
    title = dataHolder.org_name + " Reviews";
  }
  else if (dataHolder.bathrooms) { //came here from buildings page
    title = dataHolder.build_name + " Reviews";
  }
  else {
    title = dataHolder.title + " Reviews";
  }
  return {
    title: title,
    headerStyle: {
      backgroundColor: accentColor
    }
  };
};

  constructor(props) {
    console.log("made it to review list.");
    super(props);
    let dataHolder = this.props.navigation.getParam("dataHolder", null);
    let revList;
    if (dataHolder.buildings) { //came here from institution page
      revList = dataHolder.allReviews;
    }
    else { //came here from buildings or bathrooms page
      revList = dataHolder.reviews;
    }

    this.state = {
      reviews: revList,
      renderList: false, //flip this boolean to re-render flatlist
    };

    console.log("Our bathrooms:\n" + this.state.bathrooms);
    
    //here we will want to parse the reviews into the corresponding bathrooms.
  }

  render() {
    return (
      <View style={styles.container}>

        <FlatList 
            data={this.state.reviews}
            extraData={this.state.renderList}
            keyExtractor={(item, index) => {
              return item.review_id.toString()
            }}
            renderItem={(item) => {
              item = item.item;
              console.log(JSON.stringify(item));
              return (
                <Text>{item.review_text}</Text>
              );
            }}
        />

        <View style={styles.tabContainer}>
            <TouchableOpacity style={[styles.tabButton, styles.notselectedButton]}>
              <Text style={styles.notSelectedText}>Buildings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tabButton, styles.selectedButton]}>
              <Text style={styles.selectedText}>All Reviews</Text>
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
