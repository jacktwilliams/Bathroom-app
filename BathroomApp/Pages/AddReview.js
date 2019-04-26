import React, { Component } from 'react';
import {autoCapitalize, Platform, StyleSheet, Text, View, Button, FlatList, Image, ActivityIndicator, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import consts from '../Utility/Constants';
import StarRating from 'react-native-star-rating';
import AdjBoxes from '../Components/AdjBoxes';
// import console = require('console');

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class AddReview extends Component {

 static navigationOptions = ({ navigation }) => {  
  return {
    title: "Add a review",
    headerStyle: {
      backgroundColor: consts.accentColor
    }
  };
};

  constructor(props) {
    super(props);
    this.state = {
      adjText1: "Clean",
      adjText2: "Stocked",
      adjText3: "Quiet",
      clean: true,
      stocked: true,
      quiet: true,
      starCount: 3,
      review: ""
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  _handleAdjBoxClick(adjId) {
    let clean = this.state.clean; let stocked = this.state.stocked; let quiet = this.state.quiet;
    if (adjId === 1) {
      clean = !clean;
    }
    else if (adjId === 2) {
      stocked = !stocked;
    }
    else {
      quiet = !quiet;
    }

    this.setState({
      clean: clean,
      stocked: stocked,
      quiet: quiet,
      adjText1: clean ? "Clean" : "Dirty",
      adjText2: stocked ? "Stocked" : "Empty",
      adjText3: quiet ? "Quiet" : "Busy",
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.adjContainer}>
          <AdjBoxes
            adjText1 = {this.state.adjText1}
            adjText2 = {this.state.adjText2}
            adjText3 = {this.state.adjText3}
            onClick = {this._handleAdjBoxClick.bind(this)}
          />
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
                <TouchableOpacity 
                  onPress={() => {this.postClick()}}
                  style={{justifyContent: 'center', alignItems: 'center'}}
                >
                  <Text style={{fontSize: 20}}>Post</Text>
                </TouchableOpacity>
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
  },
  adjContainer: {
    width: width * .85,
    height: height * .10,
    marginTop: height * .03,
    marginBottom: height * .02,
    alignSelf: 'center',
  },
});
