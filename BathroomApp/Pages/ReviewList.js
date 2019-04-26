import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, Image, ActivityIndicator, TouchableOpacity, Dimensions} from 'react-native';
import consts from '../Utility/Constants';

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
      backgroundColor: consts.accentColor
    }
  };
};

  constructor(props) {
    super(props);
    let dataHolder = this.props.navigation.getParam("dataHolder", null);
    let revList;
    let canAddReview = false;
    let org_id = null; let build_id = null; let bath_id = null; title = null; //only set if we are looking at one bathroom because we need this data to review. 
    if (dataHolder.buildings) { //came here from institution page
      revList = dataHolder.allReviews;
    }
    else  if (dataHolder.bathrooms) { //came here from buildings page
      revList = dataHolder.reviews;
    }
    else { //we are only looking at one bathroom.
      revList = dataHolder.reviews;
      canAddReview = true;
      org_id = dataHolder.org_id;
      build_id = dataHolder.build_id;
      bath_id = dataHolder.bath_id;
      title  = dataHolder.title;
    }

    this.state = {
      reviews: revList,
      renderList: false, //flip this boolean to re-render flatlist
      canAddReview: canAddReview,
      org_id: org_id,
      build_id: build_id,
      bath_id: bath_id,
      title: title,
    };

  }

  _renderAddButtonIfAppropriate() {
    if (this.state.canAddReview) {
      return (
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={styles.tabButton}
            onPress={() => {
              this.props.navigation.navigate("AddReview", {bathData: {org_id: this.state.org_id, build_id: this.state.build_id, bath_id: this.state.bath_id, name: this.state.title}});
            }}  
          >
            <Text style={styles.buttonText}>Add Review</Text>
          </TouchableOpacity>
        </View>
      );
    }
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
                <View style={styles.border}>
                    <Text style={styles.buildingNameStyling}>{item.review_text}</Text>
                </View>
              );
            }}
        />

        {this._renderAddButtonIfAppropriate()}

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
  tabContainer: {
    backgroundColor: consts.accentColor,
    height: height * .07,
  },
  buttonText: {
    fontSize: 18
  },
  tabButton: {
    width: width,
    height: height * .07,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: consts.accentColor,
  },
});
