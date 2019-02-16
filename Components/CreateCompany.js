import React from 'react';
import { FloatingAction } from 'react-native-floating-action'
import { StyleSheet, Text, View, TextInput, Button, Image,Platform } from 'react-native';
import firebase from '../Config/firebase'
import { ImagePicker } from 'expo'
// import RNFetchBlob from 'react-native-fetch-blob'

const PATH_BASE = 'https://api.foursquare.com/v2/venues';
const PATH_SEARCH = '/search';
const EXP = '/explore'
const PARAM_SEARCH = 'query=';
const client_id = '2PIYDCL4HOLTQNIW4AHEY15IUSTCMDJKZX2ZY0AQU2FDKHD4'
const client_secret = '4GZNWXJE52UB3TQVT5NFMTPVVN4FX5LF40BJVIZVLOHVK1ZR'

// const Blob = RNFetchBlob.polyfill.Blob
// const fs = RNFetchBlob.fs
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
// window.Blob = Blob

export default class CreateCompany extends React.Component {
  constructor(props){
    super(props);
    // console.log('props_id***',props)
    this.state = {
      image1: null,
      image2: null,
      image3: null,
      imageName1: null,
      imageName2: null,
      imageName3: null,
      latitude: null,
      longitude: null,
      latitude: '',
      longitude: '',
      address: '',
      locationAddress: false,
      locationsList: []
    }
    // this.uploadImage = this.uploadImage.bind(this)
  }

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log('position',position.coords)
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    })
  }

  searchLocation(){
    console.log('address',this.state.address)
    const {latitude,longitude,address} = this.state
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${address}&ll=${latitude},${longitude}&client_id=${client_id}&client_secret=${client_secret}&v=20181025`)
    .then((response)=>{
        // console.log('response***',response.json())
        return response.json()
    })
    .then((result)=>{
        const {locationsList} = this.state
        var val = result.response.venues
        console.log("Result***",result.response.venues)
        val.map((user,i)=>{
            locationsList.push(user)
            return null
        })
    })
    .then(()=>{
      const {locationsList} = this.state
      console.log("locationList***",locationsList)
      this.setState({locationAddress: true})
    })
  }

    async pickImage(value){
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log('Result***',result)

    if (!result.cancelled) {
      this.uploadImage(result.uri,"mansoor")
        .then((res) => {
          console.log("Success***")
          console.log("Res***",res)
          value == 'image1' && this.setState({ image1: res, imageName1: result.uri });
          value == 'image2' && this.setState({ image2: res, imageName2: result.uri });
          value == 'image3' && this.setState({ image3: res, imageName3: result.uri });
        })
        .catch(error => {
          console.log("Error==>",error)
        })
    }
  };

  uploadImage = async (uri,imageName) => {
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
    return await blob;
  }

  // uploadImage = (uri, imageName, mime = 'image/jpg') => {
  //   return new Promise((resolve, reject) => {
  //     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
  //       let uploadBlob = null
  //       const imageRef = firebaseApp.storage().ref('posts').child(imageName)
  //       fs.readFile(uploadUri, 'base64')
  //       .then((data) => {
  //         return Blob.build(data, { type: `${mime};BASE64` })
  //       })
  //       .then((blob) => {
  //         uploadBlob = blob
  //         return imageRef.put(blob, { contentType: mime })
  //       })
  //       .then(() => {
  //         uploadBlob.close()
  //         return imageRef.getDownloadURL()
  //       })
  //       .then((url) => {
  //         resolve(url)
  //         console.log('uri***',uri)
  //       })
  //       .catch((error) => {
  //         reject(error)
  //       })
  //   })
  // }

  render() {
    const { image1,image2,image3,locationsList, locationAddress, imageName1, imageName2, imageName3 } = this.state
    console.log('state***',this.state)
    return (
        <View style={styles.container}>
        {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
        {locationAddress ? <View>
          <Text>{locationsList[0]['name']}</Text>
          <Button
          title="Dabao"
          onPress={() => this.props.locationsListing(locationsList)}
           />
        </View> : <View>
          <Text>Company Name</Text>
          <TextInput
          style={{width: 100, borderColor: 'gray', borderWidth: 1, marginTop: 5, marginBottom: 10 }}
          placeholder="Name" />
          <Text>Address</Text>
          <TextInput
          onChangeText = { (text) => this.setState({address: text})}
          style={{width: 100, borderColor: 'gray', borderWidth: 1, marginTop: 5, marginBottom: 10 }}
          placeholder="Since" /><Button
          onPress = {() => this.searchLocation() }
          title="Serach" />
          <Text>Certificates</Text>
          <Button
            title={!imageName1 ? "image1" : imageName1.slice(imageName1.length - 10,imageName1.length)}
            onPress={() => this.pickImage('image1')}
          />
          <Button
            title={!imageName2 ? "image2" : imageName2.slice(imageName2.length - 10,imageName2.length)}
            onPress={() => this.pickImage('image2')}
          />
          <Button
            title={!imageName3 ? "image3" : imageName3.slice(imageName3.length - 10,imageName3.length)}
            onPress={() => this.pickImage('image3')}
          />
          <Text>Timings</Text>
          <TextInput
          style={{width: 100, borderColor: 'gray', borderWidth: 1, marginTop: 5, marginBottom: 10 }}
          placeholder="Timings" />
          <Text>Since</Text>
          <TextInput
          style={{width: 100, borderColor: 'gray', borderWidth: 1, marginTop: 5, marginBottom: 10 }}
          placeholder="Address" />
          </View>}
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderWidth: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

