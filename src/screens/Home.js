import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import CarouselSection from '../Components/carousel/CarouselSection';
import useResponsive from '../hooks/useResponsive';
 

const bannerData = [
  {id:1, image: 'https://s.yimg.com/fz/api/res/1.2/gIDFNawCHV6z23pu999i.Q--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpbGw7aD0zODQ7cT04MDt3PTUxMg--/https://s.yimg.com/am/60d/82245f10de6c0b923d544fab2458639b' },
  {id:2, image: 'https://via.placeholder.com/600x300.png?text=Slide+2' },
  {id:3, image: 'https://via.placeholder.com/600x300.png?text=Slide+3' },
];

const contests = [
  { id: 1, title: 'Batsman', image: 'https://via.placeholder.com/100' },
  { id: 2, title: 'Wicket Keeping', image: 'https://via.placeholder.com/100' },
  { id: 3, title: 'Bowling', image: 'https://via.placeholder.com/100' },
];

const teams = [
  { id: 1, name: 'CSK', image: 'https://via.placeholder.com/80' },
  { id: 2, name: 'Patna Warriors', image: 'https://via.placeholder.com/80' },
  { id: 3, name: 'Deccan Riders', image: 'https://via.placeholder.com/80' },
];

const Home = () => {
  const screenType = useResponsive();

  const isMobile = screenType === 'mobile';
  const isTablet = screenType === 'tablet';

  const bannerWidth = isMobile ? '85%' : isTablet ? '65%' : '45%';
  const bannerHeight = isMobile ? 150 : isTablet ? 180 : 200;

  const contestSize = isMobile ? 100 : isTablet ? 120 : 140;
  const teamSize = isMobile ? 70 : isTablet ? 80 : 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView> 
        <CarouselSection  data={bannerData} />
        <Text style={styles.teamText}>hello</Text>
         
        {/* <CarouselSection title="Contests of This Season">
          {contests.map((item) => (
            <View key={item.id} style={styles.contestItem}>
              <Image source={{ uri: item.image }} style={{ width: contestSize, height: contestSize, borderRadius: 8 }} />
              <Text style={styles.contestText}>{item.title}</Text>
            </View>
          ))}
        </CarouselSection> */}
 
        {/* <CarouselSection title="Know Your Teams">
          {teams.map((item) => (
            <View key={item.id} style={styles.teamItem}>
              <Image
                source={{ uri: item.image }}
                style={{ width: teamSize, height: teamSize, borderRadius: teamSize / 2 }}
              />
              <Text style={styles.teamText}>{item.name}</Text>
            </View>
          ))}
        </CarouselSection> */}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
  flex: 1,
    backgroundColor: '#000', // match your theme
    paddingTop: 20,
  },
  bannerItem: {
    marginRight: 15,
  },
  bannerText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 14,
  },
  contestItem: {
    marginRight: 15,
    alignItems: 'center',
  },
  contestText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 13,
  },
  teamItem: {
    marginRight: 15,
    alignItems: 'center',
  },
  teamText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 13,
  },
});

export default Home;
