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
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// マップオブジェクトを控えておく変数
var map = null;

document.addEventListener('deviceready', function() {
  // 対象の DOM 要素に Google マップを配置する
  var mapElement = document.getElementById('map');
  // マップの初期位置を表示する (座標は日本の中心あたりを適当に)
  plugin.google.maps.environment.setEnv({
    'API_KEY_FOR_BROWSER_RELEASE':'',
    'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDRHqvc7mY20qL3f219i2fl1JQEbRXW2vU'
  });
  map = plugin.google.maps.Map.getMap(mapElement, {
    camera: {
      latLng: {
        lat: 33.59212165093855,
        lng: 130.43206964060062
      },
      zoom: 14
    }
  });

  var marker2 = map.addMarker({
    'position': {
      lat: 33.59202165093855,
      lng: 130.40406964060062
    }
  });


  
  // マップが初期表示できる状態になったら何かする場合はこのように設定する
  map.addEventListener(plugin.google.maps.event.MAP_READY, function() {
    /*// 現在位置の取得を試みる
    LocationService.getMyLocation()
      .then(function(location) {
      // 現在位置が取得できた
      var msg = ["Current your location:\n",
        "latitude:" + location.latLng.lat,
        "longitude:" + location.latLng.lng,
        "speed:" + location.speed,
        "time:" + location.time,
        "bearing:" + location.bearing].join("\n"); 

      // マーカーを追加
      var marker = map.addMarker({
        'position': location.latLng,
        'title': msg
      });

      // カメラの位置を移動する
      map.animateCamera({
        target: location.latLng,
        zoom: 16
      });

      // 情報ウィンドウを表示する
      marker.showInfoWindow();
    })
    .catch(function(error) {
      // 位置情報が取得できなかったとき
      alert(JSON.stringify(error));
    });*/
  });

  
}, false);

var div = document.getElementById("map");
var map = plugin.google.maps.Map.getMap(div);
var button = div.getElementsByTagName('button')[0];
button.addEventListener('click', function() {
  // 現在位置の取得を試みる
  console.log('クリックされました！');
  LocationService.getMyLocation()
    .then(function(location) {
      // 現在位置が取得できた
      var msg = ["Current your location:\n",
        "latitude:" + location.latLng.lat,
        "longitude:" + location.latLng.lng,
        "speed:" + location.speed,
        "time:" + location.time,
        "bearing:" + location.bearing].join("\n");

      // マーカーを追加
      var marker = map.addMarker({
        'position': location.latLng,
        'title': msg
      });

      // カメラの位置を移動する
      map.animateCamera({
        target: location.latLng,
        zoom: 16
      });

      // 情報ウィンドウを表示する
      marker.showInfoWindow();
    })
    .catch(function(error) {
      // 位置情報が取得できなかったとき
      alert(JSON.stringify(error));
    });
});

app.initialize();