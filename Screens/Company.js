import React from 'react';
import { FloatingAction } from 'react-native-floating-action'
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Company extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: true
    }
    console.log('props***',props)
  }

  changeVisibility(){
    const { visible } = this.state
    this.setState({
      visible: !visible
    })
  }

  render() {
    const { visible } = this.state
    return (
        <View style={styles.container}>
        <Text style={styles.example}>
          Floating Action Main
        </Text>
        <FloatingAction
          // actions={actions}
          onPressMain={ () => this.props.navigation.navigate('CreateCompany')}
          showBackground= {false}
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
    text: 'Location',
    icon: require('../Images/location.png'),
    name: 'bt_room',
    position: 1
  }, {
    text: 'Video',
    icon: require('../Images/Video.png'),
    name: 'bt_videocam',
    position: 2
  }];
