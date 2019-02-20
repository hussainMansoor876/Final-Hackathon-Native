import React from 'react';
import { StyleSheet, Text, View, Platform, Alert, ScrollView } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { Header, Button, Input, Card, Image, Icon } from 'react-native-elements';
import { Constants, Location, Permissions } from 'expo';
import { updateUser, removeUser } from '../Redux/actions/authActions'
import { connect } from 'react-redux';
import axios from 'axios';


class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      allUser: []
    }
  }

  componentWillMount(){
    const { user } = this.props
    axios.get(`https://final-hackathon.herokuapp.com/user/get/${user.id}`)
    .then((response) => {
      this.props.updateUser(response.data[0])
    })
    .catch(function (error) {
      console.log('error',error);
    });
    axios.get(`https://final-hackathon.herokuapp.com/user/getAll/${user.id}`)
    .then((response) => {
      console.log('Rest',response)
      this.setState({allUser: response.data})
    })
    .catch(function (error) {
      console.log('error',error);
    });
  }


  checkUser(name){
    name == "Hospital" && this.props.navigation.navigate('Company')
  }

  render() {
    const { user } = this.props
    const { allUser } = this.state
    console.log('state***',user.avator)
    return (
        <ScrollView style={styles.container}>
        <Header
            placement="left"
            leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
            centerComponent={{ text: `Wellcome ${user.name}`, style: { color: '#fff' } }}
            rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
          />
          <View style={{margin: 5}}>
           <Input
            placeholder='INPUT WITH ICON'
            leftIcon={{ type: 'font-awesome', name: 'search' }}
            inputContainerStyle={{borderColor: 'black', borderStyle: 'solid', borderWidth: 1, borderRadius: 8}}
          />
          </View>
          <View style={{marginTop: 2, marginRight: 14, marginLeft: 14, marginBottom: 5}}>
          <Button
            title="Search"
          />
          </View>
          {allUser.map((users,i) => {
            return (
              <Card title={users.name} key={i}>
                  <View>
                    <Image
                      style={{height: 300, width: '100%'}}
                      resizeMode="cover"
                      source={{ uri: users.avator }}
                    />
                    <Text style={{marginBottom: 10}}>
                      The idea with React Native Elements is more about component structure than actual design.
                    </Text>
                    <Button
                      icon={<Icon name='code' color='#ffffff' />}
                      backgroundColor='#03A9F4'
                      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                      title='VIEW NOW' />
                  </View>
            </Card>
            )
          })
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(Home);