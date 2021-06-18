import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Modal, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios'
function Index(props) {
  const { navigation } = props
  function goToScreen(screen) {
    navigation.navigate(screen, { randomCode: Math.random() })
  }
  const [Load, setLoad] = useState(true);
  const [Data, setData] = useState(null);
  const [modal, setmodal] = useState(false);



  let randomCode
  if (props.route.params) {
    randomCode = props.route.params.randomCode
  } else {
    randomCode = 1
  }


  useEffect(() => {
    console.log("effect result");
    async function getData() {
      try {
        console.log(`https://pdtclientsolutions.com/crm-public/api/get/data/credit/${props.route.params.id}`);
        const request = `https://pdtclientsolutions.com/crm-public/api/get/data/credit/${props.route.params.id}`
        const result = await axios.get(request)
        if (result.data) {
          console.log("data obtenida -->", result.data);
          setData(result.data)
        }
        console.log(result.data, "RESULT")
      } catch (error) {
        console.log(error, "EL ERROR")
      }
      setLoad(false);
    }
    getData()
  }, [randomCode])


  function send(id, status) {
    console.log("send data...")
    let array = { "id": id, "status": status }



    async function updating(array) {
      //axios.post(base_url(serverQa, `update/credit/status`), array).then(function (response) {



console.log("?????? -> https://pdtclientsolutions.com/crm-public/api/update/credit/status", array)


      axios.post("https://pdtclientsolutions.com/crm-public/api/update/credit/status", array).then(function (response) {


console.log("_________->", response.data);

        if (response.data === true) {
          setmodal(true);
        }
      })
        .catch(function (error) { console.log('Error', error.response.data) })
        .then(function (response) { });
    }





    // try {
    //   const request = `https://pdtclientsolutions.com/ventascc/api/announce/client/${props.route.params.id}`;
    //   console.log(request)
    //   const result = await axios.get(request)
    //   Alert.alert("Se anuncio con Exito");
    // } catch (error) {
    //   console.log(error, "EL ERROR")
    // }
    updating(array);
  }









  useEffect(() => {
    setTimeout(() => {
      setmodal(false);
      goToScreen("ScanReferer");
    }, 5000);
  }, [modal]);



  return (
    <View style={{
      flex: 1,
      alignItems: 'center', justifyContent: 'center'
    }}>
      <ScrollView style={{ width: "90%", paddingTop: 20 }}>
        {Load &&
          <ActivityIndicator color="#0093d9" size="large" style={{ marginTop: "30%" }} />
        }
        {
          !Load &&
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Datos del Cliente</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>Nombres:</Text>
              <Text style={styles.resultado}>{Data.nombres}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>Apellidos:</Text>
              <Text style={styles.resultado}>{Data.apellidos}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>Identificación:</Text>
              <Text style={styles.resultado}>{Data.identificacion}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>Teléfono:</Text>
              <Text style={styles.resultado}>{Data.telefono}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.resultado}>{Data.email}</Text>
            </View>
          </View>
        }
        {
          !Load &&
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Datos del Crédito</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>status:</Text>
              <Text style={styles.resultado}>{Data.status}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>Monto Requerido:</Text>
              <Text style={styles.resultado}>COP: {Data.required_amount}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>Cuotas:</Text>
              <Text style={styles.resultado}>{Data.period}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>Valor por Cuota:</Text>
              <Text style={styles.resultado}>{Data.monthly_fee}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>Taza de intereces:</Text>
              <Text style={styles.resultado}>{Data.interest_rate}%</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>Días límites:</Text>
              <Text style={styles.resultado}>{Data.days_limit}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>Aprobado el día:</Text>
              <Text style={styles.resultado}>{Data.date_aproved}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>Fecha desembolso:</Text>
              <Text style={styles.resultado}>{Data.date_desembolso}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.label}>Valor de la Initial:</Text>
              <Text style={styles.resultado}>COP: {Data.initial}</Text>
            </View>
          </View>
        }
        {
          <TouchableOpacity style={styles.loginBtn} onPress={() => send(props.route.params.id, "Liquidado")}>
            <Text style={styles.loginText}>Anunciar</Text>
          </TouchableOpacity>
        }
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modal} >
        <View style={{ backgroundColor: "rgba(0,0,0,0.7)", width: "100%", height: "100%", position: "absolute", zIndex: 999, alignContent: "center", alignItems: "center", }}>
          <View style={{ top: "20%" }}>
            <View style={{ backgroundColor: "#FFF", marginTop: "15%", padding: "10%", borderRadius: 20, width: "90%" }}>
              <Text> Crédito desembolsado con Éxito</Text>
            </View>
          </View>
        </View>
      </Modal>

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
  loginBtn: {
    width: "80%",
    backgroundColor: "#0093d9",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "center"
  },
  loginText: {
    color: "white"
  },
  label: {
    fontSize: 20
  },
  card: { backgroundColor: "white", padding: 20, marginTop: 20, borderRadius: 10, borderBottomColor: "#0093d9", borderBottomWidth: 4 },
  cardTitle: { fontWeight: "bold", fontSize: 14, color: "#0093d9", marginBottom: 5 },
  label: { fontSize: 13, textAlign: "left", width: "40%", color: "#555" },
  resultado: { marginLeft: 5, fontSize: 14, textAlign: "left", width: "60%", color: "#555", fontWeight: "bold" }
});