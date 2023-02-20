# Opioid-Overdose-Prediction-System

A app to prevent any event of opioid overdose

This project proposes an innovative and out-of-the-ordinary healthcare system called
"Opioid overdose Prediction System" to foretell the risks on one's life put on by their
prevailing health predicaments. On top of that, we will work to provide an elaborate
data-driven real-time medical-alert wrist-band for the person at risk of overdose.
The aforesaid wrist-band will use blood pressure, Sp02, breathing rate sensors among
other necessary hardware, and work synergistically with our Machine Learning model
to instruct the people in concern, the precise technique, and accurate dosage of the
crucial opioid inhibitor - "Naloxone" to be administered
to the person in need through our dedicated app.
The mobile application in our consolidated system will also keep track of the personal
inventory and availability of Naloxone in nearby pharmacies for pre-emptive
emergency necessities and prompt action.


# Objectives

● To develop a hardware device that analyses various body parameters that
cause respiratory depression.  
● To check if opioid overdose is the reason of respiratory depression.  
● Build an opioid overdose assistance application that will Notify the nearest contact  
● Tell the exact amount of naloxone to be given at a particular instance  
● Provide details about where to purchase naloxone and the contact of the nearest medical service available.  
● To ensure the app is user friendly to ensure that the user faces no difficulty  
using it.  


# Project Outcomes 

We will Build a Mobile application that will be able to detect 
the respiratory depression induced by opioid overdose with the
help of a wrist band .

1. Wrist band will be able to take reading of heart rate Spo2 level
   and ECG readings using sensors like MAX30100 and AD8232 respectively.

2. We will be using ESP8266 wich is a NodeMCU based micro-controller.
   It works on Espressif ESP8266-12E Wifi System-On-Chip to provide a 
   smooth connection with the database server.
   
3. We will be using Firebase Database to store our data so it will be
   safe on a cloud server and also to maintaine a stable connection
   between our band and mobile application.
   
4. The mobile application is developed using react native technology 
   so we can make app for both IOS and Android and further we have
   used a redux based approcah for deployment of application as it is 
   good for scaling and it is commen as per industrial stenderds.

5. We are using a Machine Learning based model to predict the risk 
   persentage for a user by taking input as user medical history and 
   current medication and this will help us to map user's values for 
   a case of opioid overdose.
   
6. Machine Learning model is hosted on heroku server and we have used 
   it as a api to connect it with the mobile application.
   
7. In mobile application user will be provide with graph representing 
   his vitals reading obtained after connecting the watch with the 
   application.

8. Mobile application will also provide features to see Naloxone 
   availablity wich will be implemented by google maps api.App has
   also a feature to show correct procedure to consume a naloxone
   dose .
   
9. Mainly whenever our app detects an opioid overdose senerio for 
   the user it will trigger an alert and if user fails to check this
   alarm as false detection app will notify all user's friend with the 
   current location of the user. 
     

# Product Perspective  


1. First step on app is to login. User can sign in     
with mobile no or email but they have to give    
mobile number and they also have to give  
required information like –  
● Current Name and Address  
● GPS and Bluetooth service allowance  
● Name and contacts of people to inform  


2. On Second Step User have to answer some  
questions that will help us in prediction of his  
opioid overdose risk. Answer to be given  
either Yes/No.  
a. Bipolar disorder or schizophrenia?  
b. Heart failure?  
c. Chronic kidney disease with clinically  
signicant renal impairment?  
d. Stroke (cerebrovascular accident, CVA) or  
other cerebrovascular disease?  


3. On third step user have to give details of  
his/her ongoing prescription so we can  
further predict the opioid risk and can analyse  
the user in better way to give our best help.  



4. On Step four app is ready to use the user have  
to connect the watch with the app through  
Bluetooth and their user can monitor his ECG  
rate and SpO2 level and we will calculate  
opioid risk at every time.  
Here User is provided with other options  
such as –  
● Naloxone availability nearby.  
● Opioid overdose prevention facts and articles.  


5. If risk rate goes above a threshold value, we  
will give an alert on mobile and if due to any  
error this alarm is caused the user will be  
given 30 seconds to stop it, else an alert is  
send to all contacts given by user and further  
assistant is given to them to save user’s life  
from overdose.  

# Hardware
!hardware_image[/SS/Hardware.png]

<img src="https://github.com/Jaisood08/Opioid-Overdose-Application/blob/main/SS/Hardware.png" alt="alt text" width="300" height ="87%">

# Screenshots 

<img src="https://github.com/Jaisood08/Opioid-Overdose-Application/blob/main/SS/0.jpg" alt="alt text" width="200" height ="87%">  <img src="https://github.com/Jaisood08/Opioid-Overdose-Application/blob/main/SS/1.jpg" alt="alt text" width="200" height ="87%">   <img src="https://github.com/Jaisood08/Opioid-Overdose-Application/blob/main/SS/2.jpg" alt="alt text" width="200" height ="87%">  

<img src="https://github.com/Jaisood08/Opioid-Overdose-Application/blob/main/SS/3.jpg" alt="alt text" width="200" height ="87%">  <img src="https://github.com/Jaisood08/Opioid-Overdose-Application/blob/main/SS/4.jpg" alt="alt text" width="200" height ="87%">   <img src="https://github.com/Jaisood08/Opioid-Overdose-Application/blob/main/SS/5.jpg" alt="alt text" width="200" height ="87%">  

<img src="https://github.com/Jaisood08/Opioid-Overdose-Application/blob/main/SS/6.jpg" alt="alt text" width="200" height ="87%">  <img src="https://github.com/Jaisood08/Opioid-Overdose-Application/blob/main/SS/7.jpg" alt="alt text" width="200" height ="87%">  <img src="https://github.com/Jaisood08/Opioid-Overdose-Application/blob/main/SS/8.jpg" alt="alt text" width="200" height ="87%">  

<img src="https://github.com/Jaisood08/Opioid-Overdose-Application/blob/main/SS/9.jpg" alt="alt text" width="200" height ="87%">  <img src="https://github.com/Jaisood08/Opioid-Overdose-Application/blob/main/SS/10.jpg" alt="alt text" width="200" height ="87%">  <img src="https://github.com/Jaisood08/Opioid-Overdose-Application/blob/main/SS/11.jpg" alt="alt text" width="200" height ="87%">  

<img src="https://github.com/Jaisood08/Opioid-Overdose-Application/blob/main/SS/12.jpg" alt="alt text" width="200" height ="87%">  <img src="https://github.com/Jaisood08/Opioid-Overdose-Application/blob/main/SS/13.jpg" alt="alt text" width="200" height ="87%">   <img src="https://github.com/Jaisood08/Opioid-Overdose-Application/blob/main/SS/14.jpg" alt="alt text" width="200" height ="87%">  






