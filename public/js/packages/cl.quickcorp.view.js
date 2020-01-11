"use strict";

Package('cl.quickcorp.view',[
	Class('MainContainer',Object,{
		__new__:function (){
			//TODO: Implement
			console.log('Main Canvas Initialized');
		}
	}),
	Class('GenerateLinkFormView',Object,{
		sponsors:New(ArrayCollection),
		service:null,
		lastLogoUploaded:null,
		relocationUrl:null,
		previewLogoChanged:function (){
			var preview = Tag('#logoPreview')[0];
		  var file    = Tag('#logoFile')[0].files[0];
		  var reader  = new FileReader();

		  reader.onloadend = function () {
		    preview.src = reader.result;
				GLOBAL.generateLinkFormViewInstance.lastLogoUploaded=reader.result;
		  }

		  if (file) {
		    reader.readAsDataURL(file);
		  } else {
		    preview.src = "";
		  }
		},
		_new_:function (o){
			//TODO: Implement

			this.component = o.component;
			logger.debug('Contact Form View Initialized');
			GLOBAL.previewLogoChanged=this.previewLogoChanged;
			GLOBAL.generateLink=this.generateLink;
			GLOBAL.generateLinkFormViewInstance = this;
			if (Tag('component[name=generate_link_form_fields]').length>0){
				Tag('component[name=progressbar]')[0].style.display='none';
				Tag('component[name=thankyou]')[0].style.display='none';
				Tag('component[name=generate_link_form_fields]')[0].style.display='block';
			}

		},
		done:function (){
			CONTACTVIEW = this;
			var component = this.component;

		},
		getQlnLinksList:function (){
			this.qlnlinks=New(ArrayCollection);
			var view=this;
			firebase.firestore().collection("qlnlinks").get().then(
				function (q){
					q.forEach(function (doc){
						view.qlnlinks.push(doc.data());
					})});
		},
		watchQlnLinksListChanges:function (){
			var view=this;
			var db = firebase.firestore();
			db.collection("qlnlinks").onSnapshot(function(querySnapshot) {
			        view.qlnlinks = New(ArrayCollection);
			        querySnapshot.forEach(function(doc) {
			            view.qlnlinks.push(doc.data());
			        });
			    });
		},
		generateLink: function (){
			var controller = this;
			var component = controller.component;
			var data = component.data;
			if (Tag('component[name=generate_link_form_fields]').length>0){
				Tag('component[name=progressbar]')[0].style.display='block';
				Tag('component[name=generate_link_form_fields]')[0].style.display='none';
				Tag('component[name=thankyou]')[0].style.display='none';
			}
			logger.debug('GENERATING LINK');

			GLOBAL.connect();

			var newQlnLinkRef = firebase.firestore().collection("qlnlinks").doc();
			var _id = newQlnLinkRef.id;
			newQlnLinkRef.set(data).then(function (doc){
				if (Tag('component[name=generate_link_form_fields]').length>0){
					Tag('component[name=progressbar]')[0].style.display='none';
					Tag('component[name=generate_link_form_fields]')[0].style.display='none';
					Tag('component[name=thankyou]')[0].style.display='block';
				}
				var url = CONFIG.get('basePath')+_id;
				var innerHTML = '<a href="{{url}}"><b>{{url}}</b></a>';
				innerHTML = innerHTML.replace( new RegExp('{{url}}','g'),url);
				if (Tag('generatedLink').length>0){
					Tag('generatedLink')[0].innerHTML=innerHTML;
				}
				console.log(_id);
			});

		}
	}),
]);
var CONTACT;
var CONTACTFORMFIELDS;
var CONTACTVIEW;
