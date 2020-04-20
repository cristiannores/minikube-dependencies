var express = require('express');
var { Kafka } = require('kafkajs')
const { v4: uuidv4 } = require('uuid');
var app = express();

const configurationKafka = {
    clientId: 'oms-broker',
    brokers: ['kafka-0.kafka.kafka-ca1.svc.cluster.local:9092', 'kafka-1.kafka.kafka-ca1.svc.cluster.local:9092', '	kafka-2.kafka.kafka-ca1.svc.cluster.local:9092'],
    authenticationTimeout: 2000,

};

// sleep time expects milliseconds
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const kafkaProducer = async () => {


    var things = ['Java', 'Go', 'Node', 'Angular', 'React', 'kafka', 'Nats', 'Walmart', 'Covid19'];
    var thing = things[Math.floor(Math.random() * things.length)];
    const kafka = new Kafka(configurationKafka);
    const producer = kafka.producer()
    console.log('Sending Message' + thing);
    let orderId = Math.floor((Math.random() * 100000) + 8000000000);
    let shippingGroupId = Math.floor((Math.random() * 100000) + 8000000000);
    await producer.connect()
    await producer.send({
        topic: '_oms-broker.pfo-xml.created',
        messages: [
            {
                value: `
                <PlaceFulfillmentOrderRequest ><MessageHeader>  <SubId>SUB-CL-WM-PFO-V1</SubId> <CnsmrId>CON-CL-WM-V1</CnsmrId> <SrvcNm>PlaceFulfillmentOrder.placeFulfillmentOrder</SrvcNm>    <AppId>LIDERAPP</AppId> <TranId>3001006937</TranId> <UsrNm>atg</UsrNm>  <Pwd>123456</Pwd>   <SrcSysId>s6151</SrcSysId>  <Version>2.3</Version>  <ConfCd>Always</ConfCd>
                </MessageHeader>
                <MessageBody>
                <customerOrderInfo>
                    <customerInfo>
                        <customerDetails>
                            <customer>
                                <id>175676112</id>
                                <contact>
                                    <email>roberto.pefaur@gmail.com</email>
                                    <faxNumber>
                                        <countryCode>CL</countryCode>
                                    </faxNumber>
                                    <phone>
                                        <number> 9 3078 1486</number>
                                    </phone>
                                </contact>
                                <firstName>Nicolai</firstName>
                                <lastName>Pefaur</lastName>
                            </customer>
                        </customerDetails>
                        <CL_billToDetails>
                            <CL_RUT>175676112</CL_RUT>
                            <CL_dysEmployee>N</CL_dysEmployee>
                        </CL_billToDetails>
                    </customerInfo>
                    <customerOrder>
                <orderHeader>
                    <orderNumber>3001006937</orderNumber>
                    <orderPlacedDateTime>2020-04-01T12:54:13.703-03:00</orderPlacedDateTime>
                    <numberOfOrderLines>4</numberOfOrderLines>
                    <expirationDate>2020-05-01T12:54:13.703-04:00</expirationDate>
                </orderHeader>
                <status>
                    <code>15</code>
                    <eventTime>2020-04-01T12:54:13.703-03:00</eventTime>
                    <description>SUBMITTED</description>
                </status>
                <orderTotal>6307.0</orderTotal><coupon>   <CL_promotion>      <CL_promotionName>Descuento LMC 6</CL_promotionName>    <CL_promotionId>500000</CL_promotionId>     <CL_promotiontype>Order Discount - Percent Off</CL_promotiontype>   <CL_discountPrice>403.0</CL_discountPrice>    </CL_promotion>  </coupon>
                <fulfillmentOrders>
                <requestNumber>3001006937</requestNumber>
                <orderHeader>
                    <orderNumber>3001006937</orderNumber>
                    <orderPlacedDateTime>2020-04-01T12:54:13.703-03:00</orderPlacedDateTime>
                    <numberOfOrderLines>4</numberOfOrderLines>
                    <expirationDate>2020-05-01T12:54:13.703-04:00</expirationDate>
                </orderHeader>
                <orderType>Food</orderType>
                <node>
                    <location>
                        <countryCode>CL</countryCode>
                    </location>
                    <nodeID>76</nodeID>
                </node>
                <pickupDetails>
                    <plannedPickupTimeSlot>
                        <start>13:00:00-03:00</start>
                        <end>15:00:00-03:00</end>   </plannedPickupTimeSlot>  
                </pickupDetails>
                <deliveryDetails>
                    <deliveryETA>2020-04-02T03:00:00.000+00:00</deliveryETA>
                    <deliveryScheduleTimeSlot>
                        <start>13:00:00-03:00</start>
                        <end>15:00:00-03:00</end>
                    </deliveryScheduleTimeSlot>
                    <deliveryZone>1344325-171477</deliveryZone>
                    <deliveryLocation>
                        <locationAddress>
                            <addressLine1>Américo Vespucio 6325</addressLine1>
                            <addressLine2></addressLine2>
                            <addressLine3>La Florida</addressLine3>
                            <addressLine4>Metropolitana de Santiago</addressLine4>
                            <city>Santiago</city>
                            <county>La Florida</county>
                            <state>RM</state>
                            <zip>00000</zip>
                            <country>
                                <code>CL</code>
                                <name>Chile</name>
                            </country>
                        </locationAddress>
                        <countryCode>CL</countryCode>
                        <name>Nicolai Pefaur</name>
                    </deliveryLocation>
                    <deliveryContact><firstName>Nicolai Pefaur</firstName>
                        <contact>
                            <email>roberto.pefaur@gmail.com</email>
                            <phone>
                                <number> 9 3078 1486</number>
                                <type>home</type>
                            </phone>
                        </contact>
                    </deliveryContact>
                    <carrierMethodCode>NA</carrierMethodCode>
                    <carrierMethod>
                        <carrierMethodCode>NA</carrierMethodCode>
                        <name>NA</name>
                    </carrierMethod>
                    <deliveryNoteOrderMessage>
                        <messageLine1>0,0|</messageLine1>
                    </deliveryNoteOrderMessage>
                    <shipETA>2020-04-02T03:00:00.000+00:00</shipETA></deliveryDetails><totalCouponAmount>403.0</totalCouponAmount><fee>
                    <amount>
                        <value>0.0</value>
                    </amount>
                </fee>
                <fulfillmentOrderTotal>6307.0</fulfillmentOrderTotal>
                <dispatchMethod>
                    <code>800002</code>
                    <name>clickAndCollect</name>
                </dispatchMethod>
                <CL_shippingOrder>
                    <CL_shippingDiscount>0.0</CL_shippingDiscount>
                    <CL_storeType>LIDER</CL_storeType>
                    <CL_storeName>Lider Departamental</CL_storeName>
                    <CL_storeRUT>76042014k</CL_storeRUT>
                    <CL_storeNumber>76</CL_storeNumber>
                    <CL_lastMileCarrier>NA</CL_lastMileCarrier>
                    <CL_pickingStore>
                        <CL_productQuantity>4</CL_productQuantity>
                        <CL_pickingStoreName>Lider Departamental</CL_pickingStoreName>
                        <CL_pickingStoreRUT>76042014k</CL_pickingStoreRUT>
                        <CL_pickingStoreNumber>76</CL_pickingStoreNumber>
                    </CL_pickingStore>
                </CL_shippingOrder>
                <orderLines>
                        <lineNumber>1</lineNumber>
                        <isSubstitutionAllowed>true</isSubstitutionAllowed>
                        <product><description>Queso Mantecoso Río Bueno Laminado 500 g</description><secondaryDescription>Colun</secondaryDescription><globalTradeItem><gtin>7802920006741</gtin></globalTradeItem><price><amount><value>3590.0</value></amount></price><department><number>97</number></department><isSoldByWeight>false</isSoldByWeight></product>
                        <item>
                            <number>581716</number>
                            <sKU>
                                <skuNumber>806638</skuNumber>
                            </sKU>
                        </item>
                        <orderLineQuantity>
                            <amount>1.0</amount>
                            <uom>units</uom>
                        </orderLineQuantity>
                        <orderLineTotal>6307.0</orderLineTotal>
                        <isGift>false</isGift>
                        <pickType>
                            <code>1</code>
                            <description>OnHand</description>
                        </pickType>
                        <price><amount><value>3590.0</value></amount></price>
                        <package>
                            <deliveryDetails>
                                <shippingMethod>
                                    <code>MS</code>
                                </shippingMethod>
                            </deliveryDetails>                    </package>                    
                        <CL_lineItem><CL_commerceItemNumber>ci30010069371</CL_commerceItemNumber><CL_packUnit>0</CL_packUnit><CL_isPack>N</CL_isPack><CL_skuType>Standard</CL_skuType><CL_itemType>Standard</CL_itemType><CL_skuParentId>PROD_806638</CL_skuParentId><CL_packDiscount>0</CL_packDiscount><CL_isBundle>N</CL_isBundle><CL_substitutionCriteria>lider</CL_substitutionCriteria></CL_lineItem>
                    </orderLines>
            <orderLines>
                        <lineNumber>2</lineNumber>
                        <isSubstitutionAllowed>true</isSubstitutionAllowed>
                        <product><description>Queso Crema Caja 227 g</description><secondaryDescription>Lider</secondaryDescription><globalTradeItem><gtin>7807900001563</gtin></globalTradeItem><price><amount><value>1690.0</value></amount></price><department><number>97</number></department><isSoldByWeight>false</isSoldByWeight></product>
                        <item>
                            <number>313725</number>
                            <sKU>
                                <skuNumber>387158</skuNumber>
                            </sKU>
                        </item>
                        <orderLineQuantity>
                            <amount>1.0</amount>
                            <uom>units</uom>
                        </orderLineQuantity>
                        <orderLineTotal>6307.0</orderLineTotal>
                        <isGift>false</isGift>
                        <pickType>
                            <code>1</code>
                            <description>OnHand</description>
                        </pickType>
                        <price><amount><value>1690.0</value></amount></price>
                        <package>
                            <deliveryDetails>
                                <shippingMethod>
                                    <code>MS</code>
                                </shippingMethod>
                            </deliveryDetails>                    </package>                    
                        <CL_lineItem><CL_commerceItemNumber>ci30010069372</CL_commerceItemNumber><CL_packUnit>0</CL_packUnit><CL_isPack>N</CL_isPack><CL_skuType>Standard</CL_skuType><CL_itemType>Standard</CL_itemType><CL_skuParentId>PROD_387158</CL_skuParentId><CL_packDiscount>0</CL_packDiscount><CL_isBundle>N</CL_isBundle><CL_substitutionCriteria>lider</CL_substitutionCriteria></CL_lineItem>
                    </orderLines>
            <orderLines>
                        <lineNumber>3</lineNumber>
                        <isSubstitutionAllowed>true</isSubstitutionAllowed>
                        <product><description>Leche Descremada Natural Caja 1 L</description><secondaryDescription>Colun</secondaryDescription><globalTradeItem><gtin>7802920000084</gtin></globalTradeItem><price><amount><value>760.0</value></amount></price><department><number>92</number></department><isSoldByWeight>false</isSoldByWeight></product>
                        <item>
                            <number>263552</number>
                            <sKU>
                                <skuNumber>5103</skuNumber>
                            </sKU>
                        </item>
                        <orderLineQuantity>
                            <amount>1.0</amount>
                            <uom>units</uom>
                        </orderLineQuantity>
                        <orderLineTotal>6307.0</orderLineTotal>
                        <isGift>false</isGift>
                        <pickType>
                            <code>1</code>
                            <description>OnHand</description>
                        </pickType>
                        <price><amount><value>760.0</value></amount></price>
                        <package>
                            <deliveryDetails>
                                <shippingMethod>
                                    <code>MS</code>
                                </shippingMethod>
                            </deliveryDetails>                    </package>                    
                        <CL_lineItem><CL_commerceItemNumber>ci30010069373</CL_commerceItemNumber><CL_packUnit>0</CL_packUnit><CL_isPack>N</CL_isPack><CL_skuType>Standard</CL_skuType><CL_itemType>Standard</CL_itemType><CL_skuParentId>PROD_5103</CL_skuParentId><CL_packDiscount>0</CL_packDiscount><CL_isBundle>N</CL_isBundle><CL_substitutionCriteria>lider</CL_substitutionCriteria></CL_lineItem>
                    </orderLines>
            <orderLines>
                        <lineNumber>4</lineNumber>
                        <isSubstitutionAllowed>true</isSubstitutionAllowed>
                        <product><description>Crema para batir Caja 200 cc</description><secondaryDescription>Colun</secondaryDescription><globalTradeItem><gtin>7802920777283</gtin></globalTradeItem><price><amount><value>670.0</value></amount></price><department><number>92</number></department><isSoldByWeight>false</isSoldByWeight></product>
                        <item>
                            <number>263518</number>
                            <sKU>
                                <skuNumber>2061</skuNumber>
                            </sKU>
                        </item>
                        <orderLineQuantity>
                            <amount>1.0</amount>
                            <uom>units</uom>
                        </orderLineQuantity>
                        <orderLineTotal>6307.0</orderLineTotal>
                        <isGift>false</isGift>
                        <pickType>
                            <code>1</code>
                            <description>OnHand</description>
                        </pickType>
                        <price><amount><value>670.0</value></amount></price>
                        <package>
                            <deliveryDetails>
                                <shippingMethod>
                                    <code>MS</code>
                                </shippingMethod>
                            </deliveryDetails>                    </package>                    
                        <CL_lineItem><CL_commerceItemNumber>ci30010069374</CL_commerceItemNumber><CL_packUnit>0</CL_packUnit><CL_isPack>N</CL_isPack><CL_skuType>Standard</CL_skuType><CL_itemType>Standard</CL_itemType><CL_skuParentId>PROD_2061</CL_skuParentId><CL_packDiscount>0</CL_packDiscount><CL_isBundle>N</CL_isBundle><CL_substitutionCriteria>lider</CL_substitutionCriteria></CL_lineItem>
                    </orderLines>
            </fulfillmentOrders>
                <paymentDetails>
                    <paymentCard>
                        <referenceNumber>718939</referenceNumber>
                        <type>
                            <description>Presto</description>
                        </type>
                        
                    </paymentCard>
                    <amount>
                        <value>6307.0</value>
                    </amount>
                    <paymentAuthorization>
                        <approvalNumber>999999</approvalNumber> </paymentAuthorization>   
                </paymentDetails>
                <totalOrderQuantity>
                    <amount>6307.0</amount>
                </totalOrderQuantity>
                <CL_order>
                    <CL_salesChannel>default</CL_salesChannel>
                    <CL_orderDiscount>403.0</CL_orderDiscount>
                    <CL_billingMethod>Bill</CL_billingMethod>
                    <CL_miClubPesosCalcPercent>0.8</CL_miClubPesosCalcPercent>
                    <CL_portales>EC-GR-D</CL_portales>
                </CL_order>
                <CL_PaymentInfo>
                    <CL_commercialCode>714</CL_commercialCode>
                    <CL_quotas>0</CL_quotas>
                    <CL_quotaType>VC</CL_quotaType>
                    <CL_quotaNumber>0</CL_quotaNumber>
                    <CL_quotaAmount>6307.0</CL_quotaAmount>
                    <CL_transactionDate>2020-04-01T12:54:13.123-03:00</CL_transactionDate>
                    <CL_transactionType>13</CL_transactionType>
                    <CL_purchaseAmount>6307</CL_purchaseAmount>
                </CL_PaymentInfo>
            </customerOrder>
                    <originatingNode>
                        <location>
                            <countryCode>CL</countryCode>
                        </location>
                        <nodeID>720</nodeID>
                    </originatingNode>
                </customerOrderInfo>
            </MessageBody>
            </PlaceFulfillmentOrderRequest>
    
    `, key: uuidv4()
            },
        ],
    })

    await producer.disconnect()
}

const init = async () => {

    for (let index = 0; index < 1; index++) {
        await sleep(2000);
        await kafkaProducer();
    }
   

}
init();
app.get('/', function (req, res) {
    res.send('Kafka producer2');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});



