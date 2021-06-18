
import React, {useRef} from 'react';
import { StyleSheet, View, Alert} from 'react-native';
import { RNCamera } from 'react-native-camera';

function Index(props) {  
    const { navigation } = props
    function goToScreen(screen, id)
    {   
        navigation.navigate(screen, {randomCode : Math.random(), id})
    }

    let camera = useRef(null)

    function onBarCodeRead(e){
      
      goToScreen("Result", e.data)
      //Alert.alert("Barcode value is "+e.data);

    }


  return (
  
    <View style={{ flex: 1,
      alignItems: 'center',
      justifyContent: 'center'}}>
        

        <View style={{backgroundColor: "blue", width: 300, height: 50}}>
        <RNCamera
            ref={camera}

            style={{
            
                width: "100%",
                height: 50
            }}

            type={RNCamera.Constants.Type.back}
            onBarCodeRead={(data)=> onBarCodeRead(data)}

            androidCameraPermissionOptions={{
                title: 'Permiso para usar la Camara',
                message: 'Necesitamos su permiso para usar su cámara',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
                title: 'Permiso para utilizar la grabación de audio',
                message: 'Necesitamos su permiso para usar su Audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
          
            />
        </View>

    </View>

  );

}
export default Index;



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginBtn:{
      width:"80%",
      backgroundColor:"#0093d9",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:200,
      marginBottom:10
    },
    loginText:{
      color:"white"
    }
  
  });

