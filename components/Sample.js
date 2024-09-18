
//FireStore Database
import React, {useEffect,useState} from 'react';
import {StatusBar, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Sample = () => {
  const [mydata, setMyData] = useState(null)
  useEffect(()=>{
   getDatabase();
  },[])  

  const getDatabase = async()=>{
    try {
      const data = await firestore().collection('testing').doc('GgEc31Af8fVXurYraxYs').get();

      setMyData(data._data)
      console.log(data._data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View> 
      <StatusBar hidden={true}/>
      <Text>Hello {mydata ? mydata.name :'Loading...'} and your are is {mydata ? mydata.age :'Loading...'}</Text>
      <Text>Hobbies : {mydata ? mydata.hobby.map((list => `${list}, `)) : 'Loading'}</Text>
    </View>
  );
};
export default Sample;
