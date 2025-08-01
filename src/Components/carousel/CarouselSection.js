import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from 'react-native';
import useResponsive from '../../hooks/useResponsive';

const CarouselSection = ({ data = [] }) => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = useWindowDimensions();
  const deviceType = useResponsive();
   const styles = getStyles(deviceType)

  const onScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slide);
  }; 
  
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {data.map((item, index) => (
          <View key={index} style={[styles.slide, { width }]}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.bannerText}>Banners</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Participate Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.dotsContainer}>
        {data.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, activeIndex === i ? styles.activeDot : null]}
          />
        ))}
      </View>
    </View>
  );
};


const getStyles =(variable)=> StyleSheet.create({
  container: {
    position: 'relative',
  },
  slide: {
    height: Platform.OS === 'web' && variable !== 'mobile' ? 400 : 220,
    position: 'relative',
    justifyContent: 'center',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height:   Platform.OS === 'web' && variable !== 'mobile'  ? 'auto' : 220,
    borderRadius: 10,
  },
  bannerText: {
    position: 'absolute',
    top: 15,
    right: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    position: 'absolute',
    bottom: 15,
    right: 20,
    backgroundColor: '#ff4d00',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#aaa',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
});

export default CarouselSection;
