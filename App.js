import * as React from 'react';
import { Image, StyleSheet , View, TouchableOpacity} from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator  } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Assuming you're using MaterialCommunityIcons
import SignIn from './app/(auth)/sign-in';
import SignUp from './app/(auth)/sign-up';
import Home from './app/(screens)/home';

import { navigationRef } from './app/navigationService';

import Settings from './app/(screens)/settings';

import InternshipScreen from './app/(screens)/internship';
import FinanceScreen from './app/(screens)/finance';
import AllTransactionsScreen from './app/(screens)/all_transactions';
import TransactionPage from './app/(screens)/transaction';
import LostItemsPage from './app/(screens)/all_LostItems';
import MyLostItemsPage from './app/(screens)/my_LostItems';
import DiningMenuScreen from './app/(screens)/dining'
import RequestsPage from './app/(screens)/all_Requests';
import RequestComponent from './app/(screens)/createRequest';
import ProfileScreen from './app/(screens)/profile'; 
import GridItemsPage from './app/(screens)/courses';
import CourseDetailPage from './app/(screens)/one_course';
import CommentsPage from './app/(screens)/commentsPage';
import MyCoursesScreen from './app/(course)/myCourses';
import CourseAttendanceScreen from './app/(course)/courseAttendance';

import SchoolAnnouncementScreen from './app/(anno)/schoolAnnouncements'
import CommunityAnnouncementScreen from './app/(anno)/communityAnnouncements';
import DepartmentAnnouncementScreen from './app/(anno)/departmentAnnouncements';
import CreateAnnouncementScreen from './app/(anno)/createAnnouncement';
import AnnouncementDetailsScreen from './app/(anno)/announcementDetails';

import {colors,text,} from './design/themes'
import settingsLogo from './assets/icons/settings.png'
import { HeaderBackButton } from '@react-navigation/elements';

const Stack = createNativeStackNavigator();
const AnnStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const FinanceStack = createNativeStackNavigator();
const ReqStack = createNativeStackNavigator();
const AllCoursesStack = createNativeStackNavigator();
const AttendanceStack = createNativeStackNavigator();
const LostItemsStack = createNativeStackNavigator();


const SettingsIcon = () => (
  <Image
    source={settingsLogo}
    style={{ width: 24, height: 24 }}
  />
);

const CustomHeader = ({navigation, title }) => {
  return (
    <Appbar.Header style={styles.header}>
      <View style={styles.leftContainer}>
        <Image
          source={require('./assets/images/logo-text.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.centerContainer}>
        <Appbar.Content
          title={title}
          titleStyle={styles.title}
          style={{ justifyContent: 'center', alignItems: 'center' }}
        />
      </View>
      <View style={styles.rightContainer}>
        <Appbar.Action icon={() => <SettingsIcon />} onPress={() => 
          { navigation.dispatch(DrawerActions.toggleDrawer())}} />
      </View>
    </Appbar.Header>
  );
};

const AnnouncementHeader = ({navigation, title }) => {
  return (
    <Appbar.Header style={styles.announcementHeader}>
      <View style={styles.leftContainerAnn}>
        <TouchableOpacity onPress={() => navigation.navigate('schoolAnnouncements')}>
          <Image
            source={require('./assets/icons/school-dark.png')}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.centerContainerAnn}>
      <TouchableOpacity onPress={() => navigation.navigate('departmentAnnouncements')}>
        <Image
          source={require('./assets/icons/department.png')}
          style={styles.icon}
          resizeMode="contain"
          />
      </TouchableOpacity>
      </View>
      <View style={styles.rightContainerAnn}>
        <TouchableOpacity onPress={() => navigation.navigate('communityAnnouncements')}>
          <Image
              source={require('./assets/icons/community-announcement.png')}
              style={styles.logo}
              resizeMode="contain"
              />
        </TouchableOpacity>
      </View>
    </Appbar.Header>
  );
};

const AnnouncementStack = () => {
  return (
    <AnnStack.Navigator
    screenOptions={({ route } ) => ({
      header: (props) => {
        let title;
        switch (route.name) {
          }
          return <AnnouncementHeader {...props} />;
        },
      })}
    >
      <AnnStack.Screen name='schoolAnnouncements' component={SchoolAnnouncementScreen} />
      <AnnStack.Screen name='departmentAnnouncements' component={DepartmentAnnouncementScreen} />
      <AnnStack.Screen name='communityAnnouncements' component={CommunityAnnouncementScreen} />
      <AnnStack.Screen name='createAnnouncement' component={CreateAnnouncementScreen} />
      <AnnStack.Screen name='announcementDetails' component={AnnouncementDetailsScreen}/>
    </AnnStack.Navigator>
  );
};

const FinStack = () => {
  return (
    <FinanceStack.Navigator screenOptions={{ headerShown: false}}>
      <FinanceStack.Screen name ='finance' component={FinanceScreen}/>
      <FinanceStack.Screen name ='allTransactions' component={AllTransactionsScreen}/>
      <FinanceStack.Screen name ='transaction' component={TransactionPage}/>
    </FinanceStack.Navigator>
  )
}

const RequestStack = () => {
  return (
    <ReqStack.Navigator screenOptions={{ headerShown: false}}>
      <ReqStack.Screen name ='requests' component={RequestsPage}/>
      <ReqStack.Screen name ='createRequest' component={RequestComponent}/>
    </ReqStack.Navigator>
  )
}

const CourseStack = () => {
  return (
    <AllCoursesStack.Navigator screenOptions={{ headerShown: false}}>
      <AllCoursesStack.Screen name ='courses' component={GridItemsPage}/>
      <AllCoursesStack.Screen name ='courseDetailPage' component={CourseDetailPage}/>
      <AllCoursesStack.Screen name ='commentsPage' component={CommentsPage}/>
      <AttendanceStack.Screen name ='profile' component={ProfileScreen}/>
    </AllCoursesStack.Navigator>
  )
}

const AttStack = () => {
  return (
    <AttendanceStack.Navigator screenOptions={{ headerShown: false}}>
      <AttendanceStack.Screen name ='myCourses' component={MyCoursesScreen}/>
      <AttendanceStack.Screen name ='attendances' component={CourseAttendanceScreen}/>
    </AttendanceStack.Navigator>
  )
}

const LostStack = () => {
  <LostItemsStack.Navigator screenOptions={{ headerShown: false}}>
    <LostItemsStack.Screen name ='lostItems' component={LostItemsPage}/>
    <LostItemsStack.Screen name ='myLostItems' component={MyLostItemsPage}/>
  </LostItemsStack.Navigator>
}

const HomeStack = () => {
  return (
    <Stack.Navigator
    initialRouteName='home'
    screenOptions={({ route }) => ({
      header: (props) => {
        let title;
        switch (route.name) {
          case 'home':
            title = 'Anasayfa';
            break;
          case 'settings':
            title = 'Ayarlar';
            break;
          case 'announcements':
            title = 'Duyurular';
            break;
          case 'finance':
            title='Kartım'
            break;
          case 'internship':
            title='Stajlar'
            break;
          case 'lostItems':
            title='Kayıp Eşya Listesi'
            break;
          case 'dining':
            title='Yemek Listesi'
            break;
          case 'courses':
            title='Dersler'
            break;
          default:
              title = '';
          }
          return <CustomHeader {...props} title={title} />;
        },
      })}
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name='finance' component={FinStack}/>
      <Stack.Screen name='courses' component= {CourseStack}/>
      <Stack.Screen name='internship' component={InternshipScreen}/>
      <Stack.Screen name='announcements' component={AnnouncementStack} />
      <Stack.Screen name='dining' component={DiningMenuScreen}/>
      <Stack.Screen name='lostItems' component={LostItemsPage}/>
      <Stack.Screen name='requests' component={RequestStack}/>
      <Stack.Screen name='myCourses' component={AttStack}/> 
      <Stack.Screen name='lostItems' component={LostStack}/>      
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => { 
  return (
    <Drawer.Navigator 
      drawerContent={props => <Settings {...props} />}
      initialRouteName="BottomTabNavigator" drawerPosition="right" 
      screenOptions={{ headerShown: false, drawerPosition:"right"}}>
      <Drawer.Screen name="BottomTabNavigator" component={BottomTabNavigator} /> 
    </Drawer.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='Ev'>
      <Tab.Screen
        name="Yoklama"
        component={AttStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="credit-card" color={color} size={size} />
          ),
          header: (props) => <CustomHeader {...props} title="" />,
        }}
      />
      <Tab.Screen
        name="Ev"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
          header: (props) => <CustomHeader {...props} title="Profil" />,
        }}
      />
    </Tab.Navigator>
  );
};


const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="sign-in"
        component={SignIn}
        options={{
          gestureEnabled: false, // Disable swipe back
        }}
      />
      <Stack.Screen
        name="sign-up"
        component={SignUp}
        options={{
          gestureEnabled: false, // Disable swipe back
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer independent={true} ref={navigationRef} >
      <Stack.Navigator >
        <Stack.Screen name="AuthStack" component={AuthStack} options={{gestureEnabled: false, headerShown: false}}/>
        <Stack.Screen 
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{headerShown: false, gestureEnabled: false,}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%'
  },

  header: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderBottomColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 36,
  },
  announcementHeader: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.secondaryBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 42,
    position:'absolute',
    top: 0,
  },
  leftContainer: {
    height: "100%",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  leftContainerAnn: {
    height: "100%",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  centerContainerAnn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  rightContainerAnn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  logo: {
    width: 100,
    height: 40,
  },
  title: {
    textAlign: 'center',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  icon: { 
    width: 24, 
    height: 24,
    marginHorizontal: 10,
  },
});


export default App;