import React, { useState, useEffect, Component } from 'react';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../components/Button';
import { ItemsCards } from '../components/Cards';
import { FontAwesome  } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons';
import { Container,Text, Input, UserIcon, EmailIcon,TelefoneIcon,Tittle  } from './styles';




interface DataProps {
  id: string;
  name: string;
  email: string;
  telefone: string;
}

export function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [allData, setData] = useState<DataProps[]>([]);



  

  

  function handleAddData() {
    const data = {      
      id: String(new Date().getTime()),
      name: name,
      email: email,
      telefone: telefone,
    }
    setData([...allData, data])
    setName(''),
    setEmail(''),
    setTelefone('')
  }

  function handleRemoveData(id: string) {
    setData(allData => allData.filter(data => data.id !== id))
  }
  

  useEffect(() => {
    async function loadData() {
      const storageData = await AsyncStorage.getItem('@allData:data')
      if (storageData) {
        setData(JSON.parse(storageData))
      }
    }

    loadData()

    async function removeAll() {
      await AsyncStorage.removeItem('@allData:data')
    }
  }, [])

  useEffect(() => {
    async function saveData() {
      await AsyncStorage.setItem('@allData:data', JSON.stringify(allData))
    }

    saveData()
  }, [allData])

  return (
    <>  

  <Tittle>Register Now</Tittle>        
    <Container>
 
    <UserIcon>
    <FontAwesome  name="user" size={24} color="black" />    
    </UserIcon>
    <EmailIcon>
    <MaterialIcons name="email" size={24} color="black" />
    </EmailIcon>
    <TelefoneIcon>
    <Foundation name="telephone" size={24} color="black" />
    </TelefoneIcon>
    
    
     
         <Input
           placeholderTextColor='#555'
           value={name}           
           onChangeText={value => setName(value)}
           onSubmitEditing={handleAddData}
           placeholder="Name"
      
           
           
                  
         />
         <Input
           placeholderTextColor='#555'
           value={email}
           onChangeText={value => setEmail(value)}
           onSubmitEditing={handleAddData}
           placeholder="Email"
           
           
               
          
         />

          <Input
           placeholderTextColor='#555'
           value={telefone}
           onChangeText={value => setTelefone(value)}
           onSubmitEditing={handleAddData}
           placeholder="Telefone"
         />


 
         <Button 
          title="Register"
          onPress={handleAddData}
         />
 
         <Text style={{marginTop: 15, marginBottom: 10}}>
         Registered Items
         
         </Text>
         <FlatList showsVerticalScrollIndicator={false}
          data={allData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ItemsCards 

              name={item.name}
              onPress={() => handleRemoveData(item.id)}
              email={item.email}              
              telefone={item.telefone}
             
            />
          )}
        />
       </Container>
   </>
   );
}
