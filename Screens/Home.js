import React from 'react';
import { StyleSheet, Text, View, Platform, Alert, ScrollView, Picker } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { Header, Button, Input, Card, Image, Icon, Overlay } from 'react-native-elements';
import { Constants, Location, Permissions } from 'expo';
import { updateUser, removeUser } from '../Redux/actions/authActions'
import { connect } from 'react-redux';
import axios from 'axios';


class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      allUser: [],
      activeIndex: 0,
      activeValue: 'select category',
      active: 'select category',
      allServices: [
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
  }

  componentWillMount(){
    const { user } = this.props
    // axios.get(`https://final-hackathon.herokuapp.com/user/get/${user.id}`)
    // .then((response) => {
    //   this.props.updateUser(response.data[0])
    // })
    // .catch(function (error) {
    //   console.log('error',error);
    // });
    axios.get(`https://final-hackathon.herokuapp.com/user/getAll/${user.id}`)
    .then((response) => {
      this.setState({allUser: response.data})
    })
    .catch(function (error) {
      console.log('error',error);
    });
  }

  updatePicker(val,i){
    const { user } = this.props
    this.setState({activeIndex: i, activeValue: val},()=>{
      const { activeValue } = this.state
      if(activeValue === "select category"){
        axios.get(`https://final-hackathon.herokuapp.com/user/getAll/${user.id}`)
        .then((response) => {
          console.log('Rest',response)
          this.setState({allUser: response.data})
        })
        .catch(function (error) {
          console.log('error',error);
        });
      }
      else{
        axios.post(`https://final-hackathon.herokuapp.com/user/service`,{
          name: activeValue
        })
        .then((response) => {
          console.log('Response',response)
          this.setState({allUser: response.data})
        })
        .catch(function (error) {
          console.log('error',error);
        });
      }
    })
  }


  render() {
    const { user } = this.props
    const { allUser, allServices, active, activeIndex } = this.state
    return (
        <View style={styles.container}>
        <Header
            placement="left"
            leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }}
            centerComponent={{ text: `Wellcome ${user.name}`, style: { color: '#fff' } }}
            rightComponent={{style: { color: '#fff' }, icon: 'arrow-forward', color: '#fff', onPress: ()=> this.props.removeUser() }}
          />
          <View style={{borderColor: 'black', borderStyle: 'solid', borderWidth: 1, marginTop: 5,marginBottom: 5,marginRight: 10,marginLeft: 10, borderRadius: 8}}>
          <Picker 
          style={{height: 50, width: '100%'}}
          onValueChange={(val,i)=> this.updatePicker(val,i)}
          selectedValue={!activeIndex ? active : allServices[activeIndex - 1].name}
          >
          <Picker.Item label={active.toLocaleUpperCase()} value={active}/>
            {allServices.map((u,i) =>{
              return <Picker.Item label={u.name.toLocaleUpperCase()} value={u.name} key={i}/>
            })}
          </Picker>
          </View>
          <ScrollView>
          {/* <View style={{margin: 5}}>
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
          </View> */}
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
      </View>
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