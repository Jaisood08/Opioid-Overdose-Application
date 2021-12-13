import React, {useRef,useState,useEffect} from 'react';
import {
    DrawerLayoutAndroid,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {
    NativeBaseProvider,
    Box,
    Pressable,
    Heading,
    VStack,
    Text,
    Center,
    Image,
    HStack,
    Divider,
    Avatar,
    Button
} from 'native-base';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Onboarding from 'react-native-onboarding-swiper';
import SendSMS from 'react-native-sms'
import { connect} from 'react-redux'
import propTypes from 'prop-types'
import GetLocation from 'react-native-get-location'
import Snackbar from 'react-native-snackbar'
var Sound = require('react-native-sound');
Sound.setCategory('Playback');

const Radio = require("../assets/Radio.wav")
const MINUTE_MS = 1000;

var Z = 30;


const Result= ({navigation,userState}) => {

  const[time,setTime] = useState(Z);
  const[Al,setAlert] = useState(true);
  const[OS,setOS] = useState(true);
  const[Sh,setSh] = useState(0);

  


  
const Accept = () => {
  
  console.log("Accept");

  if(userState.Friends == null)
  {
    Snackbar.show({
      text: "Add Someone to send alert",
      textColor: "white",
      backgroundColor: "#1b262c"
   })
    return;
  }

  const friends = userState.Friends;

  var Phone =[]
  for(var i = 0; i < friends.length; i++){
    Phone.push(friends[i].Contact);
    console.log(Phone[i]);
  }

  var latitude = 37.78825
  var longitude = -122.4324

  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
  .then(location => {
      latitude = location.latitude
      longitude = location.longitude
      SendSMS.send({
        body: 'Hey I am Suffering from Opioid Overdose, I am at '+'https://maps.google.com/?q='+ latitude + ',' + longitude+ ' .Please help me.',
        recipients: Phone,
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true
        }, (completed, cancelled, error) => {
            if(completed){
              Snackbar.show({
                text: "Message Sent",
                textColor: "white",
                backgroundColor: "#1b262c"
            })
            setAlert(false);
            }
            else
            {Snackbar.show({
              text: "Message Sent Failed",
              textColor: "white",
              backgroundColor: "#1b262c"
          })

            }
            console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
        });

      console.log(location);
  })
  .catch(error => {
      const { code, message } = error;
      Snackbar.show({
        text: "Message Sent Failed",
        textColor: "white",
        backgroundColor: "#1b262c"
    })
      console.warn(code, message);
  })

  

}

    useEffect(() => {

      var whoosh = new Sound(Radio, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
        whoosh.setVolume(10);
        // Play the sound with an onEnd callback
      });

      const interval = setInterval( () => 
      {
        Z = Z - 1;
        console.log(Z);
        setTime(Z);
        if(Z==0)
        {
          Accept();
          Z= 30;
          setTime(Z);
          console.log("Done");
        }

        if(Alert)
        {
          whoosh.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });

        }
        else
        {
          whoosh.release();
        }
        

      }, MINUTE_MS);
      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

    
    const OnboardingScreen = (navigation) => {
      switch (Sh) {
        case 1:{
          return(
            <Onboarding
            onDone={() => navigation.navigate('Home')}
            onSkip={() => navigation.replace('Home')}
            pages={[
                {
                backgroundColor: '#0299d6',
                image: <Image source={require('../assets/SS1.png')} alt="1" size={400} resizeMode={'contain'}/>,
                title: 'NARCAN Nasal Spray ',
                subtitle: 'Peel back the package to remove the device,Hold the device with your thumb on the bottom of the plunger and two fingers on the nozzle.',
                },
                {
                  backgroundColor: '#0299d6',
                  image: <Image source={require('../assets/SS2.png')} alt="1" size={400}  resizeMode={'contain'}/>,
                  title: 'NARCAN Nasal Spray ',
                  subtitle: 'Place and hold the tip of the nozzle in either nostril until your fingers touch the bottom of the patient nose.',
                },
                {
                  backgroundColor: '#0299d6',
                  image: <Image source={require('../assets/SS3.png')} alt="1" size={400} resizeMode={'contain'}/>,
                  title: 'NARCAN Nasal Spray ',
                  subtitle: 'Press the plunger firmly to release the dose into the patients nose.',
                },
                {
                  backgroundColor: '#0299d6',
                  image: <Image source={require('../assets/help.png')} alt="1" size={400} resizeMode={'contain'}/>,
                  title: 'Call Helpline and  Administer another dose of naloxone after 2-3 minutes.',
                  subtitle: '',
                },
            ]}
            />
        );
          break;
        }

        case 2:{
          return(
            <Onboarding
            onDone={() => navigation.navigate('Home')}
            onSkip={() => navigation.replace('Home')}
            pages={[
              {
                backgroundColor: '#0299d6',
                image: <Image source={require('../assets/AI1.png')} alt="1" size={400} resizeMode={'contain'}/>,
                title: 'EVZIO auto-injector',
                subtitle: 'Pull auto-injector from outer case (Do not go to step 2 untill you are ready to use).',
              },
              {
                backgroundColor: '#0299d6',
                image: <Image source={require('../assets/AI2.png')} alt="1" size={400} resizeMode={'contain'}/>,
                title: 'EVZIO auto-injector',
                subtitle: 'Firmly pull off the red safety guard , do not touch the black base - this is where the needle comes out.',
              },
              {
                backgroundColor: '#0299d6',
                image: <Image source={require('../assets/Ai3.png')} alt="1" size={400} resizeMode={'contain'}/>,
                title: 'EVZIO auto-injector',
                subtitle: 'Place the black end of the auto-injector against the outer thigh,through clothing if needed. Press Firmly and hold for 5 Seconds.(There will be a distinct sound (click and hiss) when working properly The needle will not be visible after use.)',
              },
              {
                backgroundColor: '#0299d6',
                image: <Image source={require('../assets/help.png')} alt="1" size={400} resizeMode={'contain'}/>,
                title: 'Call Helpline and  Administer another dose of naloxone after 2-3 minutes.',
                subtitle: '',
              },

            ]}
            />
        );
          break;
        }

        case 3:{
          return(
            <Onboarding
            onDone={() => navigation.navigate('Home')}
            onSkip={() => navigation.replace('Home')}
            pages={[
              {
                backgroundColor: '#0299d6',
                image: <Image source={require('../assets/NS1.png')} alt="1" size={400} resizeMode={'contain'}/>,
                title: 'Step :1',
                subtitle: 'Pry off syringe yellow caps (top and bottom).',
              },
              {
                backgroundColor: '#0299d6',
                image: <Image source={require('../assets/NS2.png')} alt="1" size={400} resizeMode={'contain'}/>,
                title: 'Step :2',
                subtitle: 'Pry off purple cap on the naloxone capsule.',
              },
              {
                backgroundColor: '#0299d6',
                image: <Image source={require('../assets/NS3.png')} alt="1" size={400} resizeMode={'contain'}/>,
                title: 'Step :3',
                subtitle: 'Grip the clear plastic wings on the spray nozzle.',
              },
              {
                backgroundColor: '#0299d6',
                image: <Image source={require('../assets/NS4.png')} alt="1" size={400} resizeMode={'contain'}/>,
                title: 'Step :4',
                subtitle: 'Thread the spray nozzle on to the syringe.',
              },
              {
                backgroundColor: '#0299d6',
                image: <Image source={require('../assets/NS5.png')} alt="1" size={400} resizeMode={'contain'}/>,
                title: 'Step :5',
                subtitle: 'Gently screw the naloxone capsule into the barrel of the syringe.',
              },
              {
                backgroundColor: '#0299d6',
                image: <Image source={require('../assets/NS6.png')} alt="1" size={400} resizeMode={'contain'}/>,
                title: 'Step :6',
                subtitle: 'Give a short , firm push on the end of the naloxone capsule to spray naloxone into nose',
              },
              {
                backgroundColor: '#0299d6',
                image: <Image source={require('../assets/help.png')} alt="1" size={400} resizeMode={'contain'}/>,
                title: 'Call Helpline and  Administer another dose of naloxone after 2-3 minutes.',
                subtitle: '',
              },
            ]}
            />
        );
          break;
        }

        case 4:{
          return(
            <Onboarding
            onDone={() => navigation.navigate('Home')}
            onSkip={() => navigation.replace('Home')}
            pages={[
              {
                backgroundColor: '#0299d6',
                image: <Image source={require('../assets/IMS.png')} alt="1" size={400} resizeMode={'contain'}/>,
                title: 'Intra-muscular needle syringe',
                subtitle: 'An Intramuscular needle syringe is commonly used in both community and professional health care settings. Inject 1 cc of naloxone straight in to a muscle=thigh, outer-quadrant of glute,or shoulder works best.',
              },
              {
                backgroundColor: '#0299d6',
                image: <Image source={require('../assets/help.png')} alt="1" size={400} resizeMode={'contain'}/>,
                title: 'Call Helpline and  Administer another dose of naloxone after 2-3 minutes.',
                subtitle: '',
              },
              
            ]}
            />
        );
          break;
        }
          
          
      
        default:
          break;
      }
     
  };

  const Naloxone = () => {
    return(
      <ScrollView>
      <Box bg="#0299d6"
      >
        <Center flex={1} px="2">
      
        <Text bold color="black" fontSize={'3xl'}>Naloxone Procedures</Text>
        <Text bold color="black" fontSize={'xl'}>Select One </Text>
        
        <Box alignItems="center"
        margin={4}
        width="90%"
        borderWidth="1" borderColor="white" borderBottomWidth="17" borderRadius="xl">
        <TouchableOpacity onPress={()=>{
          setOS(false);
          setSh(1);
        }}>
            <Image source={require('../assets/spray.png')} alt="Spray" size='2xl' resizeMode={'contain'}/>
            <Text bold color="black" fontSize={'xl'}>NARCAN Nasal Spray</Text>
            </TouchableOpacity>
            </Box>

        <Box alignItems="center"
        margin={4}
        width="90%"
        borderWidth="1" borderColor="white" borderBottomWidth="17" borderRadius="xl">
        <TouchableOpacity onPress={()=>{
          setOS(false);
          setSh(2);
        }}>
            <Image source={require('../assets/Auto.png')} alt="Spray" size='2xl' resizeMode={'contain'}/>
            <Text bold color="black" fontSize={'xl'}>EVZIO auto-injector </Text>
            </TouchableOpacity>
            </Box>

        <Box alignItems="center"
        margin={4}
        width="90%"
        borderWidth="1" borderColor="white" borderBottomWidth="17" borderRadius="xl">
        <TouchableOpacity onPress={()=>{
          setOS(false);
          setSh(3);
        }}>
            <Image source={require('../assets/NS.png')} alt="Spray" size='2xl' resizeMode={'contain'}/>
            <Text bold color="black" fontSize={'xl'}>Yello Cap Nasal Spray </Text>
            </TouchableOpacity>
        </Box>

        <Box alignItems="center"
        margin={4}
        width="90%"
        borderWidth="1" borderColor="white" borderBottomWidth="17" borderRadius="xl">
        <TouchableOpacity onPress={()=>{
          setOS(false);
          setSh(4);
        }}>
            <Image source={require('../assets/IMS.png')} alt="Spray" size='2xl' resizeMode={'contain'}/>
            <Text bold color="black" fontSize={'xl'}>Intramuscular needle syringe</Text>
            </TouchableOpacity>
        </Box>
        

        </Center>
      </Box>
      </ScrollView>
    );
  }


  const Alert = (navigation) => {
    return(
      <Center flex={1} px="2">
        <Box margin={4}
        bg="red.500"
        width="100%"
        height="80%"
        borderWidth="4" borderColor="black" borderTopWidth="20" borderRadius="xl"
        >
        <Center flex={1}>
          <Icon2 name="bell-ring-outline" color="white" size={100}/>
        
          <Text bold color="black" fontSize={'5xl'}>Alert Timer</Text>
          <Text bold color='white' fontSize={'8xl'}>{time}</Text>

          <Text bold color='white' fontSize={'4xl'} textAlign="center">A Serious Case Has Been Detected Kindly Act Within 30 sec . </Text>
          
          <HStack>
              <Button size="lg" margin={4} onPress={() => {
                Accept();
              }}
              variant="subtle" color="green.500"
              >
                Accept
              </Button>

              <Button size="lg" margin={4} onPress={() => {
                navigation.navigate('Home');
              }}
              variant="subtle" colorScheme="secondary" 
              >
                Cancel
              </Button>
          </HStack>
          
        </Center>
          </Box>
        </Center>
    )

  };
  

    return(
        <NativeBaseProvider>
        {Al ? Alert(navigation) : OS ? Naloxone() : OnboardingScreen(navigation)}
        
        </NativeBaseProvider>
    )
  }

  const mapStateToProps = (state) => ({
    authState: state.auth,
    userState: state.auth.user,
  })
  
  const mapDispatchToProps = {
  }
  
  Result.prototypes = {
    userState: propTypes.object.isRequired,
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps )(Result)




