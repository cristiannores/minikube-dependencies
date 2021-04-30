var express = require('express');
var axios = require('axios');
var app = express();
var region = true;
// sleep time expects milliseconds
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const sendToInterceptor = async () => {

    try {
        let orderId = Math.floor((Math.random() * 100000) + 3000000000);
        let shippingGroupId = Math.floor((Math.random() * 100000) + 3000000000);

        const xml =   `
<?xml version="1.0" encoding="UTF-8"?>
<pfx:PlaceFulfillmentOrderRequest xsi:schemaLocation="http://www.xmlns.walmartstores.com/SupplyChain/FulfillmentManagement/datatypes/PlaceFulfillmentOrder/ PlaceFulfillmentOrder_CL_V14.xsd" xmlns:tns="http://www.walmart.cl/schema/fulfillorder" xmlns:pfx="http://www.xmlns.walmartstores.com/SupplyChain/FulfillmentManagement/datatypes/PlaceFulfillmentOrder/" xmlns:hdr="http://www.xmlns.walmartstores.com/Header/datatypes/MessageHeader/1.4/" xmlns:flt="http://www.xmlns.walmartstores.com/Fault/datatypes/MessageFault/1.0/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
   <hdr:MessageHeader>
      <hdr:SubId>SUB-CL-WM-PFO-V1</hdr:SubId>
      <hdr:CnsmrId>CON-CL-WM-V1</hdr:CnsmrId>
      <hdr:SrvcNm>PlaceFulfillmentOrder.placeFulfillmentOrder</hdr:SrvcNm>
      <hdr:AppId>LIDERAPP</hdr:AppId>
      <hdr:TranId>${orderId}</hdr:TranId>
      <hdr:UsrNm>atg</hdr:UsrNm>
      <hdr:Pwd>123456</hdr:Pwd>
      <hdr:SrcSysId>s6151</hdr:SrcSysId>
      <hdr:Version>2.3</hdr:Version>
      <hdr:ConfCd>Always</hdr:ConfCd>
   </hdr:MessageHeader>
   <pfx:MessageBody>
      <pfx:customerOrderInfo>
         <pfx:customerInfo>
            <pfx:customerDetails>
               <pfx:customer>
                  <pfx:id>149443436</pfx:id>
                  <pfx:contact>
                     <pfx:email>reinaldo.porto@walmart.com</pfx:email>
                     <pfx:faxNumber>
                        <pfx:countryCode>CL</pfx:countryCode>
                     </pfx:faxNumber>
                     <pfx:phone>
                        <pfx:number>999999999</pfx:number>
                     </pfx:phone>
                  </pfx:contact>
                  <pfx:firstName>Reinaldo</pfx:firstName>
                  <pfx:lastName>Porto</pfx:lastName>
               </pfx:customer>
            </pfx:customerDetails>
            <pfx:CL_billToDetails>
               <pfx:CL_RUT>149443436</pfx:CL_RUT>
               <pfx:CL_dysEmployee>N</pfx:CL_dysEmployee>
            </pfx:CL_billToDetails>
         </pfx:customerInfo>
         <pfx:customerOrder>
            <pfx:orderHeader>
               <pfx:orderNumber>${orderId}</pfx:orderNumber>
               <pfx:orderPlacedDateTime>2021-03-04T15:14:44.626-04:00</pfx:orderPlacedDateTime>
               <pfx:numberOfOrderLines>3</pfx:numberOfOrderLines>
               <pfx:expirationDate>2021-04-03T15:14:44.626-04:00</pfx:expirationDate>
            </pfx:orderHeader>
            <pfx:status>
               <pfx:code>15</pfx:code>
               <pfx:eventTime>2021-03-04T15:14:44.626-04:00</pfx:eventTime>
               <pfx:description>SUBMITTED</pfx:description>
            </pfx:status>
            <pfx:orderTotal>6970.0</pfx:orderTotal>
            <pfx:fulfillmentOrders>
               <pfx:requestNumber>${orderId}</pfx:requestNumber>
               <pfx:orderHeader>
                  <pfx:orderNumber>${orderId}</pfx:orderNumber>
                  <pfx:orderPlacedDateTime>2021-03-04T15:14:44.626-04:00</pfx:orderPlacedDateTime>
                  <pfx:numberOfOrderLines>3</pfx:numberOfOrderLines>
                  <pfx:expirationDate>2021-04-04T00:00:00.000-04:00</pfx:expirationDate>
               </pfx:orderHeader>
               <pfx:orderType>Food</pfx:orderType>
               <pfx:node>
                  <pfx:location>
                     <pfx:countryCode>CL</pfx:countryCode>
                  </pfx:location>
                  <pfx:nodeID>76</pfx:nodeID>
               </pfx:node>
               <pfx:pickupDetails>
                  <pfx:plannedPickupTimeSlot>
                     <pfx:start>09:00:00-04:00</pfx:start>
                     <pfx:end>11:00:00-04:00</pfx:end>
                  </pfx:plannedPickupTimeSlot>
               </pfx:pickupDetails>
               <pfx:deliveryDetails>
                  <pfx:deliveryETA>2021-03-05T00:00:00.000-04:00</pfx:deliveryETA>
                  <pfx:deliveryScheduleTimeSlot>
                     <pfx:start>09:00:00-04:00</pfx:start>
                     <pfx:end>11:00:00-04:00</pfx:end>
                  </pfx:deliveryScheduleTimeSlot>
                  <pfx:deliveryZone>1738993-358885</pfx:deliveryZone>
                  <pfx:deliveryLocation>
                     <pfx:locationAddress>
                        <pfx:addressLine1>Américo Vespucio </pfx:addressLine1>
                        <pfx:addressLine2>6325</pfx:addressLine2>
                        <pfx:addressLine4>REGION METROPOLITANA</pfx:addressLine4>
                        <pfx:city>Santiago</pfx:city>
                        <pfx:county>LA FLORIDA</pfx:county>
                        <pfx:state>RM</pfx:state>
                        <pfx:zip>00000</pfx:zip>
                        <pfx:country>
                           <pfx:code>CL</pfx:code>
                           <pfx:name>Chile</pfx:name>
                        </pfx:country>
                     </pfx:locationAddress>
                     <pfx:countryCode>CL</pfx:countryCode>
                     <pfx:name>Reinaldo Porto</pfx:name>
                  </pfx:deliveryLocation>
                  <pfx:deliveryContact>
                     <pfx:firstName>Reinaldo Porto</pfx:firstName>
                     <pfx:contact>
                        <pfx:email>reinaldo.porto@walmart.com</pfx:email>
                        <pfx:phone>
                           <pfx:number>999999999</pfx:number>
                           <pfx:type>home</pfx:type>
                        </pfx:phone>
                     </pfx:contact>
                  </pfx:deliveryContact>
                  <pfx:carrierMethodCode>NA</pfx:carrierMethodCode>
                  <pfx:carrierMethod>
                     <pfx:carrierMethodCode>NA</pfx:carrierMethodCode>
                     <pfx:name>NA</pfx:name>
                  </pfx:carrierMethod>
                  <pfx:deliveryNoteOrderMessage>
                     <pfx:messageLine1>0,0|</pfx:messageLine1>
                  </pfx:deliveryNoteOrderMessage>
                  <pfx:shipETA>2021-03-04T17:00:00.000Z</pfx:shipETA>
               </pfx:deliveryDetails>
               <pfx:fee>
                  <pfx:amount>
                     <pfx:value>0.0</pfx:value>
                  </pfx:amount>
               </pfx:fee>
               <pfx:fulfillmentOrderTotal>6970.0</pfx:fulfillmentOrderTotal>
               <pfx:dispatchMethod>
                  <pfx:code>800002</pfx:code>
                  <pfx:name>clickAndCollect</pfx:name>
               </pfx:dispatchMethod>
               <pfx:CL_shippingOrder>
                  <pfx:CL_shippingDiscount>0.0</pfx:CL_shippingDiscount>
                  <pfx:CL_storeType>LIDER</pfx:CL_storeType>
                  <pfx:CL_storeName>Lider Departamental</pfx:CL_storeName>
                  <pfx:CL_storeNumber>76</pfx:CL_storeNumber>
                  <pfx:CL_lastMileCarrier>NA</pfx:CL_lastMileCarrier>
                  <pfx:CL_pickingStore>
                     <pfx:CL_productQuantity>3</pfx:CL_productQuantity>
                     <pfx:CL_pickingStoreName>Lider Departamental</pfx:CL_pickingStoreName>
                     <pfx:CL_pickingStoreRUT></pfx:CL_pickingStoreRUT>
                     <pfx:CL_pickingStoreNumber>76</pfx:CL_pickingStoreNumber>
                  </pfx:CL_pickingStore>
               </pfx:CL_shippingOrder>
               <pfx:orderLines>
                  <pfx:lineNumber>1</pfx:lineNumber>
                  <pfx:isSubstitutionAllowed>false</pfx:isSubstitutionAllowed>
                  <pfx:product>
                     <pfx:description>Vino Carmenere Doña Dominga 750 cc 1 Kg</pfx:description>
                     <pfx:secondaryDescription>Casa Silva</pfx:secondaryDescription>
                     <pfx:globalTradeItem>
                        <pfx:gtin>7804454001001</pfx:gtin>
                     </pfx:globalTradeItem>
                     <pfx:price>
                        <pfx:amount>
                           <pfx:value>2190.0</pfx:value>
                        </pfx:amount>
                     </pfx:price>
                     <pfx:isSoldByWeight>false</pfx:isSoldByWeight>
                  </pfx:product>
                  <pfx:item>
                     <pfx:number>280017</pfx:number>
                     <pfx:sKU>
                        <pfx:skuNumber>1483</pfx:skuNumber>
                     </pfx:sKU>
                  </pfx:item>
                  <pfx:orderLineQuantity>
                     <pfx:amount>1.0</pfx:amount>
                     <pfx:uom>units</pfx:uom>
                  </pfx:orderLineQuantity>
                  <pfx:orderLineTotal>6970.0</pfx:orderLineTotal>
                  <pfx:isGift>false</pfx:isGift>
                  <pfx:pickType>
                     <pfx:code>1</pfx:code>
                     <pfx:description>OnHand</pfx:description>
                  </pfx:pickType>
                  <pfx:price>
                     <pfx:amount>
                        <pfx:value>2190.0</pfx:value>
                     </pfx:amount>
                  </pfx:price>
                  <pfx:package>
                     <pfx:deliveryDetails>
                        <pfx:shippingMethod>
                           <pfx:code>MS</pfx:code>
                        </pfx:shippingMethod>
                     </pfx:deliveryDetails>
                  </pfx:package>
                  <pfx:CL_lineItem>
                     <pfx:CL_commerceItemNumber>ci2776000020</pfx:CL_commerceItemNumber>
                     <pfx:CL_packUnit>0</pfx:CL_packUnit>
                     <pfx:CL_isPack>N</pfx:CL_isPack>
                     <pfx:CL_skuType>Standard</pfx:CL_skuType>
                     <pfx:CL_itemType>Standard</pfx:CL_itemType>
                     <pfx:CL_skuParentId>1483</pfx:CL_skuParentId>
                     <pfx:CL_packDiscount>0</pfx:CL_packDiscount>
                     <pfx:CL_isBundle>N</pfx:CL_isBundle>
                     <pfx:CL_substitutionCriteria>no_substitutable</pfx:CL_substitutionCriteria>
                  </pfx:CL_lineItem>
               </pfx:orderLines>
               <pfx:orderLines>
                  <pfx:lineNumber>2</pfx:lineNumber>
                  <pfx:isSubstitutionAllowed>false</pfx:isSubstitutionAllowed>
                  <pfx:product>
                     <pfx:description>Vino Carmenere 750 cc 1 Kg</pfx:description>
                     <pfx:secondaryDescription>Misiones de Rengo</pfx:secondaryDescription>
                     <pfx:globalTradeItem>
                        <pfx:gtin>7808704700034</pfx:gtin>
                     </pfx:globalTradeItem>
                     <pfx:price>
                        <pfx:amount>
                           <pfx:value>1290.0</pfx:value>
                        </pfx:amount>
                     </pfx:price>
                     <pfx:isSoldByWeight>false</pfx:isSoldByWeight>
                  </pfx:product>
                  <pfx:item>
                     <pfx:number>294579</pfx:number>
                     <pfx:sKU>
                        <pfx:skuNumber>1485</pfx:skuNumber>
                     </pfx:sKU>
                  </pfx:item>
                  <pfx:orderLineQuantity>
                     <pfx:amount>1.0</pfx:amount>
                     <pfx:uom>units</pfx:uom>
                  </pfx:orderLineQuantity>
                  <pfx:orderLineTotal>6970.0</pfx:orderLineTotal>
                  <pfx:isGift>false</pfx:isGift>
                  <pfx:pickType>
                     <pfx:code>1</pfx:code>
                     <pfx:description>OnHand</pfx:description>
                  </pfx:pickType>
                  <pfx:price>
                     <pfx:amount>
                        <pfx:value>1290.0</pfx:value>
                     </pfx:amount>
                  </pfx:price>
                  <pfx:package>
                     <pfx:deliveryDetails>
                        <pfx:shippingMethod>
                           <pfx:code>MS</pfx:code>
                        </pfx:shippingMethod>
                     </pfx:deliveryDetails>
                  </pfx:package>
                  <pfx:CL_lineItem>
                     <pfx:CL_commerceItemNumber>ci2776000021</pfx:CL_commerceItemNumber>
                     <pfx:CL_packUnit>0</pfx:CL_packUnit>
                     <pfx:CL_isPack>N</pfx:CL_isPack>
                     <pfx:CL_skuType>Standard</pfx:CL_skuType>
                     <pfx:CL_itemType>Standard</pfx:CL_itemType>
                     <pfx:CL_skuParentId>1485</pfx:CL_skuParentId>
                     <pfx:CL_packDiscount>0</pfx:CL_packDiscount>
                     <pfx:CL_isBundle>N</pfx:CL_isBundle>
                     <pfx:CL_substitutionCriteria>no_substitutable</pfx:CL_substitutionCriteria>
                  </pfx:CL_lineItem>
               </pfx:orderLines>
               <pfx:orderLines>
                  <pfx:lineNumber>3</pfx:lineNumber>
                  <pfx:isSubstitutionAllowed>false</pfx:isSubstitutionAllowed>
                  <pfx:product>
                     <pfx:description>Vino Petirrojo Merlot Botella 750 cc 1 Kg</pfx:description>
                     <pfx:secondaryDescription>Bisquertt</pfx:secondaryDescription>
                     <pfx:globalTradeItem>
                        <pfx:gtin>7804343004168</pfx:gtin>
                     </pfx:globalTradeItem>
                     <pfx:price>
                        <pfx:amount>
                           <pfx:value>3490.0</pfx:value>
                        </pfx:amount>
                     </pfx:price>
                     <pfx:isSoldByWeight>false</pfx:isSoldByWeight>
                  </pfx:product>
                  <pfx:item>
                     <pfx:number>279975</pfx:number>
                     <pfx:sKU>
                        <pfx:skuNumber>314835</pfx:skuNumber>
                     </pfx:sKU>
                  </pfx:item>
                  <pfx:orderLineQuantity>
                     <pfx:amount>1.0</pfx:amount>
                     <pfx:uom>units</pfx:uom>
                  </pfx:orderLineQuantity>
                  <pfx:orderLineTotal>6970.0</pfx:orderLineTotal>
                  <pfx:isGift>false</pfx:isGift>
                  <pfx:pickType>
                     <pfx:code>1</pfx:code>
                     <pfx:description>OnHand</pfx:description>
                  </pfx:pickType>
                  <pfx:price>
                     <pfx:amount>
                        <pfx:value>3490.0</pfx:value>
                     </pfx:amount>
                  </pfx:price>
                  <pfx:package>
                     <pfx:deliveryDetails>
                        <pfx:shippingMethod>
                           <pfx:code>MS</pfx:code>
                        </pfx:shippingMethod>
                     </pfx:deliveryDetails>
                  </pfx:package>
                  <pfx:CL_lineItem>
                     <pfx:CL_commerceItemNumber>ci2776000022</pfx:CL_commerceItemNumber>
                     <pfx:CL_packUnit>0</pfx:CL_packUnit>
                     <pfx:CL_isPack>N</pfx:CL_isPack>
                     <pfx:CL_skuType>Standard</pfx:CL_skuType>
                     <pfx:CL_itemType>Standard</pfx:CL_itemType>
                     <pfx:CL_skuParentId>314835</pfx:CL_skuParentId>
                     <pfx:CL_packDiscount>0</pfx:CL_packDiscount>
                     <pfx:CL_isBundle>N</pfx:CL_isBundle>
                     <pfx:CL_substitutionCriteria>no_substitutable</pfx:CL_substitutionCriteria>
                  </pfx:CL_lineItem>
               </pfx:orderLines>
            </pfx:fulfillmentOrders>
            <pfx:paymentDetails>
               <pfx:paymentCard>
                  <pfx:referenceNumber>INPA-70701614881808285</pfx:referenceNumber>
                  <pfx:type>
                     <pfx:description>CreditOneClick</pfx:description>
                  </pfx:type>
                  <pfx:lastFourDigits>6623</pfx:lastFourDigits>
               </pfx:paymentCard>
               <pfx:amount>
                  <pfx:value>6970.0</pfx:value>
               </pfx:amount>
               <pfx:paymentAuthorization>
                  <pfx:approvalNumber>1213</pfx:approvalNumber>
               </pfx:paymentAuthorization>
            </pfx:paymentDetails>
            <pfx:totalOrderQuantity>
               <pfx:amount>6970.0</pfx:amount>
            </pfx:totalOrderQuantity>
            <pfx:CL_order>
               <pfx:CL_salesChannel>default</pfx:CL_salesChannel>
               <pfx:CL_orderDiscount>0.0</pfx:CL_orderDiscount>
               <pfx:CL_billingMethod>Bill</pfx:CL_billingMethod>
               <pfx:CL_miClubPesosCalcPercent>0.8</pfx:CL_miClubPesosCalcPercent>
               <pfx:CL_portales>EC-GR-D</pfx:CL_portales>
            </pfx:CL_order>
            <pfx:CL_PaymentInfo>
               <pfx:CL_commercialCode>597055555543</pfx:CL_commercialCode>
               <pfx:CL_quotas>0</pfx:CL_quotas>
               <pfx:CL_quotaType>VN</pfx:CL_quotaType>
               <pfx:CL_quotaNumber>0</pfx:CL_quotaNumber>
               <pfx:CL_quotaAmount>6970.0</pfx:CL_quotaAmount>
               <pfx:CL_transactionDate>2021-03-04T15:16:50.000-04:00</pfx:CL_transactionDate>
               <pfx:CL_transactionType>13</pfx:CL_transactionType>
            </pfx:CL_PaymentInfo>
         </pfx:customerOrder>
         <pfx:originatingNode>
            <pfx:location>
               <pfx:countryCode>CL</pfx:countryCode>
            </pfx:location>
            <pfx:nodeID>720</pfx:nodeID>
         </pfx:originatingNode>
      </pfx:customerOrderInfo>
   </pfx:MessageBody>
</pfx:PlaceFulfillmentOrderRequest>
`;

        if ( region ){
            await axios.post( 'https://api.staging-dlovtm.walmartdigital.cl/heimdall/publish', {
                message: xml
            })
            console.log(`Order sent ${orderId} in dlovtm`)

        }else{
            await axios.post( 'https://api.staging-ultawt.walmartdigital.cl/heimdall/publish', {
                message: xml
            })
            console.log(`Order sent ${orderId} in ultawt`)
        }

        region = !region;


    }catch (e) {
        console.log('error sending to interceptor',e.message);
    }

}

const init = async () => {

    for (let index = 0; index < 1000; index++) {
        await sendToInterceptor();
    }
   

}

init();


