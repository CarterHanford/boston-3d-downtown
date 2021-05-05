require([
      "esri/WebScene",
      "esri/views/SceneView",
      "esri/Camera",
      "esri/widgets/Home",
      "dojo/domReady!",
      "esri/widgets/Legend",
      "esri/widgets/LayerList"
    ], function(WebScene, SceneView, Camera, Legend, LayerList, Home) {

    
      /*var map = new Map({
        basemap: "streets",
        ground: "world-elevation"
      });*/
      var scene = new WebScene({
        portalItem:{
         id:"8046207c1c214b5587230f5e5f8efc77" 
        }
      });
      
      // initial camera 
      var camera = new Camera({
        position: [
           -71.060217,
          42.358,
          1500// elevation in meters
        ],
        tilt:50,
        heading: 0
      })
      
      // add camera for a more centered downtown view
      var camera2 = new Camera({
        position: [
           -71.060217,
          42.329,
          2000// elevation in meters
        ],
        tilt:50,
        heading: 25
      })
      
      // add camera to view downtown Boston from Ocean
      var camera3 = new Camera({
        position: [
           -71.00,
          42.335,
          1000// elevation in meters
        ],
        tilt:75,
        heading: -50
      })
      
      // add camera for home button
      var homecamera = new Camera({
        position: [
           -71.1167,
          42.3770,
          150000// elevation in meters
        ],
        tilt:0,
        heading: 0
      });

      var view = new SceneView({
        container: "viewDiv",
        map: scene,
        viewingMode:"global",
        camera: homecamera,
        environment: {
            lighting: {
              date: new Date(),
              directShadowsEnabled: true,
              // don't update the view time when user pans.
              // The clock widget drives the time
              cameraTrackingEnabled: false
            }
        },
    });
      
    view.when(function() {
	
          // get the first layer in the collection of operational layers in the WebMap
          // when the resources in the MapView have loaded.
        var featureLayer = scene.layers.getItemAt(1);

        //var legend = new Legend({
          //view: view,
         // layerInfos: [{
            //layer: featureLayer,
            //title: "Major project buildings"
          //}]
        //});
          
          var layerList = new LayerList({
            view: view
            });
      
   view.ui.add(legend, "bottom-right");
   view.ui.add(layerList, "bottom-right");
   });
    
    var homeBtn = new Home({
        view: view
      });

      // Add the home button to the top left corner of the view
    view.ui.add(homeBtn, "top-left");
    
    [stl, bei, bost].forEach(function(button) {
      button.style.display = 'flex';
      view.ui.add(button, 'top-right');
    });
    
    bei.addEventListener('click', function() {
      // reuse the default camera position already established in the homeBtn
      view.goTo({
        target:camera2
      });
    });
    
    stl.addEventListener('click', function() {
      // reuse the default camera position already established in the homeBtn
      view.goTo({
        target:camera
      });
    });
      
   bost.addEventListener('click', function() {
      // reuse the default camera position already established in the homeBtn
      view.goTo({
        target:camera3
      });
    }); 


    });
