import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { MainCardProps } from '../types/CardProps';

const MainCard = ({ onCardVerified }: MainCardProps) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showCardType, setShowCardType] = useState(false);

  const isAllFieldsFilled = useMemo(() => {
    const cleanedCardNumber = cardNumber.replace(/\s/g, '');
    return (
      cleanedCardNumber.length === 16 &&
      cvv.length === 3 &&
      cardHolderName.trim().length > 0 &&
      expiry.length === 5 &&
      zipcode.length >= 5
    );
  }, [cardNumber, cvv, cardHolderName, expiry, zipcode]);

  const handleArrowPress = () => {
    if (isAllFieldsFilled && !isVerifying) {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        if (onCardVerified) {
          onCardVerified({
            id: Date.now().toString(),
            cardNumber: cardNumber.replace(/\s/g, ''),
            cardHolderName: cardHolderName.trim(),
            expiry: expiry,
            cvv: cvv,
            zipcode: zipcode,
          });
        }
      }, 3000);
    }
  };

  return (
    <View>
      <View style={styles.addCardContainer}>
        <TouchableOpacity
          style={[
            styles.arrowBox,
            { backgroundColor: isAllFieldsFilled ? '#E14434' : '#666666' },
          ]}
          onPress={handleArrowPress}
          disabled={!isAllFieldsFilled || isVerifying}
        >
          <Icon name="arrow-right" size={20} color="#FFF" />
        </TouchableOpacity>

        {isVerifying ? (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingIndicator}>
              <View style={[styles.dot, { backgroundColor: '#E14434' }]} />
              <View style={[styles.dot, { backgroundColor: '#E14434' }]} />
              <View style={[styles.dot, { backgroundColor: '#E14434' }]} />
            </View>
            <Text style={styles.loadingText}>Verifying your card</Text>
          </View>
        ) : (
          <>
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Card Number</Text>
                <TextInput
                  style={styles.cardNumberInput}
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  keyboardType="numeric"
                  maxLength={19}
                />
              </View>
              <View style={styles.smallInputGroup}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={styles.cvvInput}
                  value={cvv}
                  onChangeText={setCvv}
                  placeholder="123"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.fullWidthInputGroup}>
              <Text style={styles.inputLabel}>Card Holder Name</Text>
              <TextInput
                style={styles.fullWidthInput}
                value={cardHolderName}
                onChangeText={setCardHolderName}
                placeholder="John Doe"
                placeholderTextColor="rgba(255,255,255,0.5)"
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            <View style={styles.row}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.smallInputGroup}>
                  <Text style={styles.inputLabel}>Expiry Date</Text>
                  <TextInput
                    style={styles.smallInput}
                    value={expiry}
                    onChangeText={setExpiry}
                    placeholder="MM/YY"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>
                <View style={[styles.smallInputGroup, { marginLeft: 20 }]}> 
                  <Text style={styles.inputLabel}>Zip Code</Text>
                  <TextInput
                    style={styles.smallInput}
                    value={zipcode}
                    onChangeText={setZipcode}
                    placeholder="12345"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    keyboardType="numeric"
                    maxLength={6}
                  />
                </View>
              </View>
              {showCardType ? (
                <View style={styles.cardBadge}>
                  <Text style={styles.cardBadgeText}>VISA</Text>
                </View>
              ) : null}
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default MainCard;

const styles = StyleSheet.create({
  addCardContainer: {
    width: 350,
    height: 230,
    backgroundColor: '#000000',
    marginTop: 30,
    elevation: 3,
    padding: 15,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f7b092',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 5,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 6,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  cardNumberInput: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 0.4,
    borderBottomColor: 'rgba(255,255,255,0.6)',
    color: '#FFF',
    fontSize: 15,
    fontWeight: '500',
    paddingVertical: 6,
    paddingHorizontal: 0,
    letterSpacing: 0.3,
    width: '100%',
  },
  cvvInput: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 0.4,
    borderBottomColor: 'rgba(255,255,255,0.6)',
    color: '#FFF',
    fontSize: 15,
    fontWeight: '500',
    paddingVertical: 6,
    paddingHorizontal: 0,
    letterSpacing: 0.3,
    width: '100%',
  },
  cardBadge: {
    padding: 8,
    minWidth: 60,
  },
  cardBadgeText: {
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  fullWidthInputGroup: {
    width: '100%',
    marginBottom: 12,
    paddingHorizontal: 5,
  },
  fullWidthInput: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 0.4,
    borderBottomColor: 'rgba(255,255,255,0.6)',
    color: '#FFF',
    fontSize: 15,
    fontWeight: '500',
    paddingVertical: 6,
    paddingHorizontal: 0,
    height: 35,
    letterSpacing: 0.3,
  },
  smallInputGroup: {
    width: 80,
    marginHorizontal: 5,
  },
  smallInput: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 0.4,
    borderBottomColor: 'rgba(255,255,255,0.6)',
    color: '#FFF',
    fontSize: 15,
    fontWeight: '500',
    paddingVertical: 4,
    paddingHorizontal: 0,
    letterSpacing: 0.3,
  },
  arrowBox: {
    position: 'absolute',
    right: -20,
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#666666',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E14434',
    marginHorizontal: 2,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 12,
  },
});
