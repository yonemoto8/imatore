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

    // cookieに保存したマーカーを表示 start
    let c_marker = [];
    var date = $.cookie("marker");
    c_marker = date.split("_");
    c_marker.map(Number);

    // 現在地の緯度経度を変数に設定
    var lat1 = location.latLng.lat * Math.PI / 180;
    var lng1 = location.latLng.lng * Math.PI / 180;

    if(c_marker.length > 0 ){
      for(var x = 0,len = c_marker.length; x < len;){
    
        var lat2 = c_marker[x + 1] * Math.PI / 180;
        var lng2 = c_marker[x] * Math.PI / 180;
        
        var lat_c = (lat1 + lat2) / 2;	// 緯度の中心値
	      var dx = 6371 * (lng2 - lng1) * Math.cos(lat_c);
        var dy = 6371 * (lat2 - lat1);
        var distance = (dx * dx) + (dy * dy);
        console.log(distance);

        if(distance < 1){
          var marker2 = map.addMarker({
            'position': {
              lat: c_marker[x + 1],
              lng: c_marker[x]
            }
          });
          marker2.addEventListener(plugin.google.maps.event.MARKER_CLICK, function() {
            alert("マーカーがクリックされた2");
        
          });
        }
        x += 2;
      }
    }
    // cookieに保存したマーカーを表示 end

    // stubに保存されているマーカー情報を取得し、マーカーを表示 start
    let stub_date = [];
    var url = "https://crebo.co.jp/crebo-demo/www/stub/markergetstub.json";
    getjson(url).then((value) => {
      stub_date = value;
    });
    setTimeout(function () {
      for(var x = 0,len = stub_date.length; x < len; x++){
        var marker3 = map.addMarker({
          'position': {
            lat: stub_date[x].lat,
            lng: stub_date[x].lng
          },
          icon: '#00FF00',
          title: stub_date[x].userid
        });

        mark_crick(marker3,marker3.getTitle());
        
      }
    }, 500);
    // stubに保存されているマーカー情報を取得し、マーカーを表示 end
    
    // 緯度経度を取得する共通メソッド（呼び出し部分）
    let t = [];
    getPostionInfo().then((value) => {
      t = value;
    });
    setTimeout(function () {
      // 確認用
      console.log("getPostionInfo_lat:"+t.g_lat);
      console.log("getPostionInfo_lng:"+t.g_lng);
    }, 2000);

  });
  
}, false);

app.initialize();

function mark_crick(mark,id){
  mark.addEventListener(plugin.google.maps.event.MARKER_CLICK, function() {
    //alert("マーカーがクリックされた2");
    setCookie("prof_id",id);
    document.location = "profile.html";
  });
}