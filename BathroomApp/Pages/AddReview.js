import React, { Component } from 'react';
import {autoCapitalize, Platform, StyleSheet, Text, View, Button, FlatList, Image, ActivityIndicator, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import consts from '../Utility/Constants';
import StarRating from 'react-native-star-rating';
// import console = require('console');

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
    // this.toggle = this.toggle.bind(this);
    let dataHolder = this.props.navigation.getParam("dataHolder", null);
    let revList;
    let cleanliness;
    let stocked;
    let quiet;
    let review;

    this.state = {
      cleanliness: false,
      stocked: false,
      quiet: false,
      starCount: 3,
      review: ""
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  postClick(){
    console.log(this.state);
  }

  setClean() {
    console.log(this.state.cleanliness);
  }
  setStocked() {
    console.log(this.state.stocked);
  }
  setQuiet() {
    console.log(this.state.quiet);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.reviewbuttons}>
            <View style={styles.reviewbuttonscontainers}>
                <Button color="white" title="Clean" onPress={() => {this.setClean()}}></Button>
            </View>
            <View style={styles.reviewbuttonscontainers}>
                <Button color="white" title="Stocked" onPress={() => {this.setStocked()}}></Button>
            </View>
            <View style={styles.reviewbuttonscontainers}>
                <Button color="white" title="Quiet" onPress={() => {this.setQuiet()}}></Button>
            </View>
        </View>

        <View style={styles.starcontainer}>
            <StarRating
            disabled={false}
            maxStars={5}
            rating={this.state.starCount}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
        </View>

        <View style={styles.textbox}>
            <TextInput style={styles.reviewinput} 
            placeholder="Add Review" 
            autoCapitalize={autoCapitalize}
            multiline={true}
            keyboardType={"default"}
            onChangeText={(text) => this.setState({review: text})}
            value={this.state.text}
            />
        </View>    
        <View style={styles.postcontainer}>
            <View style={styles.buttonstyling}>
                <Button 
                onPress={() => {this.postClick()}}
                color="white" 
                title="Post"
                />
            </View>
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
    paddingBottom: 30
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
  reviewinput: {
    height: 50,
    fontSize: 20,
    paddingLeft: 10,
  },
  postcontainer: {
    flex: 1,
    borderColor:'grey',
    borderTopWidth: .2,
    marginBottom: '10%',
    marginTop: 10,
  },
  textbox: {
    backgroundColor: '#e2e2e2',
    borderRadius:5,
    borderWidth: 1,
    borderColor: 'grey',
    marginLeft: 20,
    marginRight: 20,
    height: 200,
    flex: 2,
  },
  reviewbuttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  reviewbuttonscontainers: {
    backgroundColor: consts.accentColor,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    width: '25%',
    height: 40,
  },
  starcontainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 0,
    flex: 1,
    borderColor:'grey',
    borderBottomWidth: .2,
    marginBottom: '10%'
  },
  buttonstyling: {
      backgroundColor: consts.accentColor,
      width: '25%',
      height: 40,
      borderRadius: 10,
      marginTop: 50,
      marginLeft: '70%'
  }
});
