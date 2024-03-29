import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, Image, ActivityIndicator, TouchableOpacity, Dimensions,TextInput} from 'react-native';
import consts from '../Utility/Constants';
import ReviewsButton from '../Components/ReviewsButton';
// import { SearchBar } from 'react-native-elements';


const serverAddr = consts.addr
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



export default class Institution extends Component {

 static navigationOptions = {
   title: 'Home',
   headerStyle: {
    backgroundColor: consts.accentColor,
  }
 }
 

  constructor(props) {
    super(props);

    this.state = {
      institutionData: null,
      resultList: [],
      buildings: [],
      bathrooms: null,
      extraData: true,
      reviews: null,
      renderList: false, //flip this boolean to re-render flatlist
      searchinput: "",
      newInput: null,
      input: null,
    };

    //  this.getInstitutionData();
  }

  /*
    Parses JSON received from server query. Each building will have a list with its bathrooms and reviews.
    In Building we will put the reviews into the corresponding bathrooms.
  */
    
  getInstitutionData() {
    console.log(this.state.searchinput);
    fetch(serverAddr + "search/?query=" + this.state.searchinput)
    .then((res) => {
      return res.json();
    })
    .then((resJson) => {
      console.log(JSON.stringify(resJson));
      this.setState({
        
        resultList: resJson,
     
        extraData: !this.state.extraData,
        // Input: this.state.Input,
        // newInput: this.state.searchinput.split(' ').join('%'),
      });
      console.log("Recieved institution data and parsed reviews and bathrooms into the correct buildings.");
      console.log(this.state.newInput);
    })
    .catch((error) => {
      console.log("Error getting institution data from server (or error parsing json)\n" + error);
    });
  }
  
  render() {
    // const { searchinput } = this.state;
    return (

      <View style={styles.container}>

    <TextInput
      style={styles.searchbar}
      placeholder="Find your institution..."
      keyboardType={"default"}
      value={this.state.text}
      onChangeText={(text) => this.setState({searchinput: text})}
    /> 


      <Button 
      title="Search" 
      onPress={() => {this.getInstitutionData()}} 
      />
           
        <FlatList 
            data={this.state.resultList}
            extraData={this.state.renderList}
            keyExtractor={(item, index) => {
              return index.toString()
            }}
            renderItem={(item) => {
              return (
                <TouchableOpacity 
                  onPress={() => {
                    // console.log("Sending building data to building page: " + JSON.stringify(item.item));
                    console.log("sending inst. to inst page: " + JSON.stringify(item.item))
                     this.props.navigation.navigate("Institution", {Institution: item.item});
                }}>
                <View style={styles.border}>
                  <Text style={styles.buildingNameStyling}>{item.item.org_name}</Text>
                </View>
                </TouchableOpacity>
              );
            }}
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
  },
  searchbar: {
    fontSize: 20,
    height: 45,
    backgroundColor: '#e2e2e2',
    paddingLeft: 10

  }
});
