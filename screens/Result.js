import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios'



function Index(props) {  
    const { navigation } = props
    function goToScreen(screen)
    {   
        navigation.navigate(screen, {randomCode : Math.random()})
    }

    const [Data, setData] = useState([])

   
    useEffect(()=>{
        async function getData(){
          try {
            const request = `https://pdtclientsolutions.com/ventascc/api/get/data/qr/client/${props.route.params.id}`;
            console.log(request)
            const result = await axios.get( request )
            
            if(result.data){
              setData(result.data)
            }
            console.log(result.data, "RESULT")
          } catch (error) {
            console.log(error, "EL ERROR")
          }
        }

        getData()
        
    },[])



    async function send (){

      try {
        const request = `https://pdtclientsolutions.com/ventascc/api/announce/client/${props.route.params.id}`;
        console.log(request)
        const result = await axios.get( request )
        Alert.alert("Se anuncio con Exito");
      } catch (error) {
        console.log(error, "EL ERROR")
      }

    }



  return (
  
    <View style={{ flex: 1,
      alignItems: 'center',
      justifyContent: 'center'}}>

        <ScrollView style={{width : "90%", paddingTop : 40}}>

          {Data.length > 0 &&
            Data.map((item)=>{
              return  <View style={{backgroundColor : "#ddd", padding : 10, marginBottom : 20}}>

                        <Text style={styles.label}>
                          Paciente : {item.name_client}
                        </Text>
                        <Text style={styles.label}>
                          Cita : {item.fecha} {item.time}
                        </Text>
                        <Text style={styles.label}>
                          Tipo : {`${item.type} : ${item.procedure}`}
                        </Text>

                        <Text style={styles.label}>
                          Sede : {item.clinic}
                        </Text>

                      </View>
            })
          }


                  <TouchableOpacity style={styles.loginBtn} onPress={()=>send()}>
                    <Text style={styles.loginText}>Anunciar</Text>
                  </TouchableOpacity>


         
        </ScrollView>

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
      marginBottom:10,
      alignSelf : "center"
    },
    loginText:{
      color:"white"
    },
    label : {
      fontSize : 20
    }
  
  });

