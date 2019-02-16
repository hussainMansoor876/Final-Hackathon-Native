import React from 'react';
import { FloatingAction } from 'react-native-floating-action'
import { StyleSheet, Text, View } from 'react-native';

export default class Home extends React.Component {
  constructor(props){
    super(props);
    console.log('props***',this.props)
  }
  checkUser(name){
    name == "Hospital" && this.props.HospitalCheck(name)
  }

  render() {
    return (
        <View style={styles.container}>
        <Text style={styles.example}>
          Home
        </Text>
        <FloatingAction
          actions={actions}
          onPressItem={
            (name) => this.checkUser(name) }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

const actions = [ {
    text: 'Are You a Company?',
    icon: require('../Images/hospital.png'),
    name: 'Hospital',
    position: 1
  }, {
    text: 'Normal User',
    icon: require('../Images/user.png'),
    name: 'Normal User',
    position: 2
  }];
