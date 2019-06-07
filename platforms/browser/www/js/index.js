/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        /* var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Received Event: ' + id);
    }
};

// マップオブジェクトを控えておく変数
var map = null;

document.addEventListener('deviceready', function() {
  // 対象の DOM 要素に Google マップを配置する
  var mapElement = document.getElementById('map');

  // ブラウザでGoogleMapを正常に表示させるにはAPIキーをここで設定する必要がある（無料枠を使用していたので、一時的にコメントアウト）
  /*plugin.google.maps.environment.setEnv({
    'API_KEY_FOR_BROWSER_RELEASE':'',
    'API_KEY_FOR_BROWSER_DEBUG':'AIzaSyDRHqvc7mY20qL3f219i2fl1JQEbRXW2vU'
  });*/

  map = plugin.google.maps.Map.getMap(mapElement, {
  // マップの初期位置を表示する
    camera: {
      latLng: {
        lat: 33.59212165093855,
        lng: 130.43206964060062
      },
      zoom: 14
    }
  });

  // マップが初期表示できる状態になったら何かする場合はこのように設定する
  map.addEventListener(plugin.google.maps.event.MAP_READY, function() {
  });

  var option = {
    enableHighAccuracy: true
  };
  plugin.google.maps.LocationService.getMyLocation(option, function(location) {
  
    // マップ情報を取得
    var mapDiv = document.getElementById('map');
    var map = plugin.google.maps.Map.getMap(mapDiv, {
      'camera': {
        target: location.latLng,
        zoom: 16
      }
    });
  
    // 現在地のマーカーを追加
    var marker = map.addMarker({
      position: location.latLng,
      icon: 'blue'
    });
    marker.showInfoWindow();

    // カメラの位置を移動する
    map.animateCamera({
      target: location.latLng,
      zoom: 16
    });

  let c_marker = [];
  var date = $.cookie("marker");
  date = date.slice(1);
  date = date.slice(0,-1);
  c_marker = date.split("_");
  c_marker.map(Number);

  console.log(c_marker);

  if(c_marker.length > 0 ){
    for(var x = 0,len = c_marker.length; x < len;){
      var marker2 = map.addMarker({
        'position': {
          lat: c_marker[x + 1],
          lng: c_marker[x]
        }
      });
      x += 2;
    }
  }

});
  
}, false);

app.initialize();
