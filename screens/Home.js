
import React, {useRef, useState} from 'react';
import { StyleSheet,  View, TouchableOpacity, Alert, Text} from 'react-native';
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

        <TouchableOpacity style={styles.loginBtn} onPress={()=>goToScreen("ScanReferer")}>
          <Text style={styles.loginText}>ESCANEAR REFERENCIA</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.loginBtn} onPress={()=>goToScreen("ScanSerial")}>
          <Text style={styles.loginText}>ESCANEAR SERIAL</Text>
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
