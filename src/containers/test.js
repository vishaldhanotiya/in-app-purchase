/* eslint-disable max-len */
import React, { useEffect } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as RNIap from 'react-native-iap';

let purchaseToken = '';
let purchaseToken2 = '';
const itemSkus = Platform.select({
  ios: ['com.codiant.subscribe.monthly_plan'],
  android: [
    'com.codiant.monthly_plan',
    'com.codiant.subscribe.monthly_plan',
    'com.codiant.subscribe.quarterly_plan',
    'com.codiant.subscribe.half_yearly_plan',
    'com.codiant.subscribe.yearly_plan',
  ],
});

export default function IAP() {
  const getAvailable = async () => {
    const response = await RNIap.getAvailablePurchases();
    return response;
  };
  // const getConsumePurchaseAndroid = async () => {
  //   try {

  //     const res1=  await RNIap.consumePurchaseAndroid("kbaembkdcpbdjhjbmpidklba.AO-J1OypsMPhNZH2JkGTDW9KP8edtrL9Mq1PVlUWx357cFa8CxSrtqoGdL32XPnAcVN7hgSTTMCDANRyfuCyDCWX9MhDB2lEb5A9_WtHO4z32Ir0dH6FEFM");
  //     alert("res1"+res1)
  //     const res=  await RNIap.acknowledgePurchaseAndroid("kbaembkdcpbdjhjbmpidklba.AO-J1OypsMPhNZH2JkGTDW9KP8edtrL9Mq1PVlUWx357cFa8CxSrtqoGdL32XPnAcVN7hgSTTMCDANRyfuCyDCWX9MhDB2lEb5A9_WtHO4z32Ir0dH6FEFM");

  //   } catch (err) {
  //     console.warn(err); // standardized err.code and err.message available
  //   }
  // };
  const getPurchaseHistory = async () => {
    try {
      const purchaseHistory = await RNIap.getPurchaseHistory();
      return purchaseHistory;
    } catch (err) {
      console.warn(err); // standardized err.code and err.message available
    }
  };
  const getIAPProducts = async (value) => {
    try {
      const products = await RNIap.getProducts(value);
      return products;
    } catch (err) {
      console.warn(err); // standardized err.code and err.message available
    }
  };

  const getIAPSubscription = async (value) => {
    try {
      const products = await RNIap.getSubscriptions(value);
      return products;
    } catch (err) {
      console.warn(err); // standardized err.code and err.message available
    }
  };
  const requestPurchase = async (sku) => {
    try {
      await RNIap.requestPurchase(sku, false).then((value) => {
        console.log('Request Purchase ', JSON.stringify(value));
      });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const requestSubscription = async (sku) => {
    try {
      await RNIap.requestSubscription(sku).then((value) => {
        console.log('Request Subscription ', JSON.stringify(value));
      });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };
  useEffect(async () => {
    await RNIap.initConnection();
    //  getConsumePurchaseAndroid();
    getAvailable().then((value) => {
      console.log('Get Available History==> ' + JSON.stringify(value));
    });
    getPurchaseHistory().then((value) => {
      if (value) {
        console.log('Get All Purchase History==> ' + JSON.stringify(value));
        const result = value.filter(
          (item) => item.productId === 'com.codiant.subscribe.yearly_plan',
        );

        const result1 = value.filter(
          (item) => item.productId === 'com.codiant.subscribe.monthly_plan',
        );

        purchaseToken = result1.length > 0 ? result1[0].purchaseToken : '';
        purchaseToken2 = result[0].purchaseToken;
        // console.log('Get All Purchase History==> ' + JSON.stringify(purchaseToken));
        // console.log('Get All Purchase History==> ' + JSON.stringify(purchaseToken2));
      }
    });

    getIAPProducts(itemSkus).then((value) => {
      console.log('Get Product==>' + JSON.stringify(value));
    });

    getIAPSubscription(itemSkus).then((value) => {
      console.log('Get Subscription==>' + JSON.stringify(value));
    });
  }, []);

  const upgradeMonthlyToYearlySubscriptionPlan = async (
    newSku,
    oldSku,
    purchaseTokenValue,
  ) => {
    try {
      await RNIap.requestSubscription(
        newSku,
        false,
        oldSku,
        purchaseTokenValue,
        RNIap.ProrationModesAndroid.DEFERRED,
      ).then((value) => {
        console.log('Upgrade Monthly To Yearly Subscription Plan', value);
      });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  return (
    <View>
      <View style={{ margin: 20 }}>
        <View style={Styles.getProductView}>
          <Text style={{ fontWeight: '700', color: 'white' }}>
            Get Product Purchase
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            getIAPProducts([itemSkus]);
          }}>
          <View style={Styles.planView}>
            <Text style={{ fontWeight: '700', color: 'white' }}>
              Get Product @ $100.00
            </Text>
          </View>
        </TouchableOpacity>
        <View style={Styles.getProductView}>
          <Text style={{ fontWeight: '700', color: 'white' }}>
            Get Subscriptions Plan
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            requestPurchase('com.codiant.subscribe.monthly_plan');
          }}>
          <View style={[Styles.planView, { backgroundColor: '#0E3C54' }]}>
            <Text style={{ fontWeight: '700', color: 'white' }}>
              Monthly Plan @ $50.00
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            requestPurchase('com.codiant.subscribe.quarterly_plan');
          }}>
          <View style={[Styles.planView, { backgroundColor: '#0E3C54' }]}>
            <Text style={{ fontWeight: '700', color: 'white' }}>
              Quarterly Plan @ $149.00
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            requestSubscription('com.codiant.subscribe.half_yearly_plan');
          }}>
          <View style={[Styles.planView, { backgroundColor: '#0E3C54' }]}>
            <Text style={{ fontWeight: '700', color: 'white' }}>
              Half Year Plan @ $250.00
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            requestSubscription('com.codiant.subscribe.yearly_plan');
          }}>
          <View style={[Styles.planView, { backgroundColor: '#0E3C54' }]}>
            <Text style={{ fontWeight: '700', color: 'white' }}>
              Yearly Plan @ $500.00
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            upgradeMonthlyToYearlySubscriptionPlan(
              'com.codiant.subscribe.yearly_plan',
              'com.codiant.subscribe.monthly_plan',
              purchaseToken,
            );
          }}>
          <View
            style={[
              Styles.planView,
              { marginHorizontal: 20, backgroundColor: '#F65555' },
            ]}>
            <Text style={{ fontWeight: '700', color: 'white' }}>
              Upgrade Monthly to Yearly Plan @ $500.00
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            upgradeMonthlyToYearlySubscriptionPlan(
              'com.codiant.subscribe.monthly_plan',
              'com.codiant.subscribe.yearly_plan',
              purchaseToken2,
            );
          }}>
          <View
            style={[
              Styles.planView,
              { marginHorizontal: 20, backgroundColor: '#8B72DA' },
            ]}>
            <Text style={{ fontWeight: '700', color: 'white' }}>
              Downgrade Yearly to Monthly Plan @ $50.00
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  getProductView: {
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: '#6495ED',
    borderRadius: 8,
    marginHorizontal: 25,
    alignItems: 'center',
    padding: 15,
  },
  planView: {
    marginVertical: 10,
    marginHorizontal: 50,
    backgroundColor: '#0E3C54',
    borderRadius: 8,
    alignItems: 'center',
    padding: 12,
  },
});
