import React, { Component } from 'react';
import * as firebase from 'firebase';

export default class AuthLoadingScreen extends React.Component {

    constructor(props) {
        super(props);
    }
      
      render() {
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Bathroom App</Text>
              <View style={styles.buttonGroup}> 
                <Button title={'SPINNY ICON'}/>
              </View>
          </View>
        );
      }
}