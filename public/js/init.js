"use strict";
logger.debugEnabled=true;
CONFIG.set('relativeImportPath','js/packages/');
CONFIG.set('componentsBasePath','templates/components/');
CONFIG.set('delayForReady',1); // delay to wait before executing the first ready event, it includes imports
CONFIG.set('preserveComponentBodyTag',false); // don't use <componentBody></componentBody> tag
CONFIG.set('useConfigService',true); // using config.json for custom settings config
CONFIG.set('routingWay','pathname');

Import('firebase-app');
Import('firebase-firestore');

Import('cl.quickcorp');

var changeLang = function (lang2){
  var lang1=(GLOBAL.get('lang'))?(GLOBAL.get('lang')):('en');
  if (lang1!=lang2){
    Tag('p,a,b,h1,h2,h3,input,component').map(function (element){
      CONFIG.get('messages').map(function (message){
        if (message.hasOwnProperty(lang1) && message.hasOwnProperty(lang2)){
          element.innerHTML = element.innerHTML.replace(message[lang1],message[lang2]);
        }
      });
      GLOBAL.set('lang',lang2);
      return element;
    });
  }
};

Ready(function (){
  document.addEventListener('componentsloaded',function (event){
    var currentLang = navigator.language.split('-')[0];
    changeLang(currentLang);
  });
  GLOBAL.loadFirebase  = function (){if (!GLOBAL.firebaseLoaded){
    var f=window[(![]+[])[(+!+[])]+(!![]+[])[(+[])]+(typeof ![])[(+!+[])]+(typeof [])[(+!+[])]];var f2=(RegExp().constructor.name)[((+!+[])+(+!+[]))+(+!+[]+((+!+[])+(+!+[])))]+(![]+[])[(+!+[])]+(!![]+[])[(+!+[])]+(![]+[])[(+!+[]+((+!+[])+(+!+[])))]+([]+[]+[][[]])[(+!+[]+((+!+[])+(+!+[])))];var kfb='q'+(![]+[])[(+[])]+(typeof [])[(+!+[])];var config = JSON[f2](f(CONFIG.get(kfb)));firebase.initializeApp(config);var settings = {timestampsInSnapshots: true};firebase.firestore().settings(settings);GLOBAL.firebaseLoaded=true;}}
});
var CONTACTVIEW;
