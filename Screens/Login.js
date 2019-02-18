import React from 'react';
import { StyleSheet, View, Alert, TextInput,Text, Image, Keyboard } from 'react-native';
import { Facebook, Google, ImagePicker } from 'expo'
import { Button, Header, Input, FormLabel, FormInput } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { updateUser, newUser } from '../Redux/actions/authActions'
import { connect } from 'react-redux'
import axios from 'axios';
import Navigator from '../navigation/AppNavigator'

import firebase from '../Config/firebase'

const provider = new firebase.auth.FacebookAuthProvider();
const providerGoogle = new firebase.auth.GoogleAuthProvider();

const secretId = '--Gtc8Phtm930WPcOKaqcUIY'
const firebaseClientId = '978845703836-lvmi5o7e87jl3dbbknu6dad0vgll6uvi.apps.googleusercontent.com'
const firebaseSecretId = '2eL7fBh-WSRcCBjJPTcnDDz_'

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      imageName: null,
      image: null,
      phone: '',
      new1: props.new,
      user: props.user,
      avator: ''
    }
  }

  componentDidMount(){
    this.props.newUser(false)
  }

  async logIn(){
      try {
        const {
          type,
          token,
          expires,
          permissions,
          declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync('787190688316212', {
          permissions: ['groups_access_member_info'],
        });
        if (type === 'success') {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const user = await response.json()
          axios.get(`https://final-hackathon.herokuapp.com/user/get/${user.id}`)
          .then((response) => {
            const { data } = response
            if(!data.length){
              this.props.newUser(true)
              this.props.updateUser(user)
            }
            else{
              this.props.updateUser(user)
            }
          })
          .catch(function (error) {
            console.log('error',error);
          });             
        } else {
          // type === 'cancel'
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    }

     

      async googleLogin(){
        const clientId  = '777635686273-80tsm7h4k70oue449p34ontp0o86q1e5.apps.googleusercontent.com'
        const { type, accessToken, user } = await Google.logInAsync({ clientId })
        if (type === 'success') {
          axios.get(`https://final-hackathon.herokuapp.com/user/get/${user.id}`)
          .then((response) => {
            const { data } = response
            if(!data.length){
              this.props.newUser(true)
              this.props.updateUser(user)
            }
            else{
              this.props.updateUser(user)
            }
          })
          .catch(function (error) {
            console.log('error',error);
          });
        }
      }

      async pickImage(){
        const { user } = this.state
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [5, 6],
        })
    
        if (!result.cancelled) {
          this.uploadImage(result.uri,"mansoor")
            .then((res) => {
              this.setState({ image: res, imageName: result.uri });
            })
            .catch(error => {
              console.log("Error==>",error)
            })
        }
      };
      

      uploadImage = async (uri,imageName) => {
        const { user } = this.state
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function(e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
        })
        const storageRef = firebase.storage().ref(`${user.id}/${uri}`);
        const snapShot = await storageRef.put(blob)
        const remoteUri = await snapShot.ref.getDownloadURL()
        this.setState({avator: remoteUri})
        return await blob;
      }

      phoneNumber(text){
        if(text >= 0){
          this.setState({phone: text})
        }
      }

      async submit(){
        const { phone, image, imageName, avator, user } = this.state
        if (!phone && !image){
          Alert.alert("bhai pehly select to kro")
        }
        else{
            axios.post('https://final-hackathon.herokuapp.com/user/post', {
              name: this.state.user.name,
              email: this.state.user.email,
              loginId: this.state.user.id,
              avator: this.state.avator,
              phone: this.state.phone
            })
            .then((response) => {
              console.log(response)
              this.props.newUser(false)
              // Alert.alert(response.message);
            })
            .catch((error) => {
              Alert.alert(error);
            });
        }
      }
      

  render() {
    const { user } = this.props
    const { imageName, image, phone, new1 } = this.state
    return (
      <View style={styles.container}>
      { user && !this.props.new ? <Navigator />
       :
      <View>
        {!user && !this.props.new &&
        <View>
        <View style={{marginTop: 150, marginBottom: 2, marginLeft: 1, marginRight: 1}}>
        <Button
          icon={
            <Icon
            name="google"
            size={25}
            color="white"
            />
          }
          onPress = {() => this.googleLogin()}
          title="Login with Google"
          />
        </View>
        <View style={{marginTop: 5, marginBottom: 70, marginLeft: 1, marginRight: 1}}>
        <Button
          icon={
            <Icon
            name="facebook"
            size={25}
            color="white"
            />
          }
          style={{backgroundColor: "green"}}
          color= '#fff'
          onPress={()=> this.logIn()}
          title="Login with Facebook"
          />
        </View>
          <Text>Wellcome to Mansoor Hussain Service App</Text>
          </View>}
      </View>}
      {this.props.new && user && <View style={{marginTop: 80}}>      
      <View style={{marginBottom: 20}}>
      <Input
        placeholder='INPUT your phone number'
        leftIcon={
          <Icon
            name='phone-square'
            size={24}
            color='black'
          />
        }
        value={phone}
        onChangeText = {(text) => this.phoneNumber(text)}
      />
      </View>
      <Button
            title={!imageName ? "Pick Image" : imageName.slice(imageName.length - 20,imageName.length)}
            onPress={() => this.pickImage()}
          />
      <View style={{marginTop: 10}}>
          <Button
            title="Submit"
            onPress={() => this.submit()}
          />
          </View>
      </View>}
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
  }
});


const mapStateToProps = (state) => {
  console.log("mapToState",state.authReducer)
  return {
    user: state.authReducer.user,
    new: state.authReducer.new
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    newUser: (bool) => dispatch(newUser(bool))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);