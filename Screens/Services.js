import React from 'react';
import { FloatingAction } from 'react-native-floating-action'
import { StyleSheet, Text, View } from 'react-native';
import { Header, Button, CheckBox } from 'react-native-elements';
import { updateUser, removeUser } from '../Redux/actions/authActions'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';

class Services extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: true,
      checked: true,
      services: [
        {
          name: 'electrication',
          type: false
        },
        {
          name: 'mechanic',
          type: false
        },
        {
          name: 'plumber',
          type: false
        },
        {
          name: 'bike mechanic',
          type: false
        },
        {
          name: 'car mechanic',
          type: false
        },
        {
          name: 'motor mechanic',
          type: false
        },
        {
          name: 'machine',
          type: false
        }
      ]
    }
    console.log('props***',props)
  }

  changeService(key,val){
    let servicesCopy = this.state.services
    console.log(servicesCopy[key])
    servicesCopy[key].type = !servicesCopy[key].type
    this.setState({services: servicesCopy})
  }

  changeVisibility(){
    const { visible } = this.state
    this.setState({
      visible: !visible
    })
  }

  render() {
    const { visible, services } = this.state
    const { user } = this.props
    return (
        <View style={{flex: 1}}>
        <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
        centerComponent={{ text: `Wellcome ${user.name}`, style: { color: '#fff' } }}
        rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
        />
        <View style={styles.container}>
        {services.map((val,key)=>{
          return <CheckBox
          key={key}
          title={val.name.toLocaleUpperCase()}
          checked={val.type}
          onPress={()=> this.changeService(key,val)}          
        />
        })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });


const mapStateToProps = (state) => {
  console.log("mapToState",state.authReducer)
  return {
    user: state.authReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    removeUser: () => dispatch(removeUser())
  }
}


export default connect(mapStateToProps)(Services)