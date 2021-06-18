
import React, {useRef, useState} from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Text} from 'react-native';
import { RNCamera } from 'react-native-camera';
import socketIOClient from 'socket.io-client/dist/socket.io.js'

function Index(props) {  
    const { navigation } = props


    function goToScreen(screen)
    {   
        navigation.navigate(screen, {randomCode : Math.random()})
    }


  let camera = useRef(null)

    function onBarCodeRead(e){
      Alert.alert("Barcode value is"+e.data ,"Barcode type is"+e.type);
      socket.emit('ReceivedReference',e.data);
    }


    function onBarCodeReadSerial(e){
      Alert.alert("Barcode value is"+e.data ,"Barcode type is"+e.type);
      socket.emit('ReceivedSerial',e.data);
    }


    const [ socket , setPosts ] = useState(false)



    React.useEffect(()=>{
      console.log(['. . . . . . . . . .  SOCKET SERVER CONNECTING . . . . . . . . . . . . . . '])
      setPosts(socketIOClient("http://31.220.60.218:5026"))
    },[])



    React.useEffect(()=>{

      if(socket){
        console.log(['. . . . . . . . . .  POSTS SERVER PROVISIONING . . . . . . . . . . . . . . '])
        socket.on('askForUserId', () => {
          console.log(['. . . . . . . . . .  POSTS SERVER CONNECTED123 . . . . . . . . . . . . . . '])
          socket.emit('userIdReceived',"App");
        })
        socket.on('disconnect', () => {
          console.log(['. . . . . . . . . . . . . . . . . . . POSTS SERVER DISCONNECTED  . . . . . . . . . . . . . . . . . . .'])
        })
      }
    },[socket])









async function takePicture(){

  if (camera) {
    
 

  }
};


  return (
  
    <View style={{ flex: 1,
      alignItems: 'center',
      justifyContent: 'center',height: 100}}>
        

        <View style={{backgroundColor: "blue", width: 300, height: 50}}>
        <RNCamera
            ref={camera}

            style={{
            
                width: "100%",
                height: 50
            }}

            type={RNCamera.Constants.Type.back}
            onBarCodeRead={(data)=> onBarCodeReadSerial(data)}

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


        <TouchableOpacity style={styles.loginBtn} onPress={()=>goToScreen("ScanSerial")}>
          <Text style={styles.loginText}>ESCANEAR REferencia</Text>
        </TouchableOpacity>


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
      marginTop:40,
      marginBottom:10
    },
    loginText:{
      color:"white"
    }
  
  });



