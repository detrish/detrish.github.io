var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BICuOxAeUoG_-iZG5nA4Lg73BKffkGvU2sTkwOfYT7yREm7dwaJpdoMBsqA1PBpy_QmVbIpvbPHkci3mDX2OUZo",
   "privateKey": "uEyPiHjBE9uiLCdl8UdJCdK3JCak4lch26y_OrPCQEI"
};
 
 
webPush.setVapidDetails(
   'mailto:coba@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fxzN9I313jU:APA91bHrU_f88hTUvvhNODfJmHYPoHWWThDfPKODAVJOUqnk7pTcUqB1X7-zApGcHKO4GidQEIW4OJPIRTVg6so49tsXo1qqUVU5kAVYjzgLFumxyLAbfFVHhaWq0Ylj97e01E5bNJMh",
   "keys": {
       "p256dh": "BK09gOUEUpNtR1P/Ci9+JY+Ykm4ENpdaO/za/K1LZ54uRmh7EntqXGfLkkGQRX956rRBRnx+7HZ1bt3bP1qOsXQ=",
       "auth": "xwXUW8t4Cd36aeLgNDRQIQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '768322526620',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
