"use strict";
Package('cl.quickcorp.controller',[
	Class('SocialMetaTagController',Object,{
		component:null,
		_new_:function (o){
			logger.debug('SocialMetaTagController Element Initialized');
			this.component = o.component;
		},
		done: function (){
			document.head.innerHTML+=this.component.body.innerHTML;
			this.component.body.innerHTML="";
		}
	}),
	Class('RelocationController',Object,{
		component:null,
		relocationUrl:null,
		getQlnLinkUrl:function (id){
			GLOBAL.connect();
			var view=this;
			firebase.firestore().collection("qlnlinks").doc(id).get().then(
				function (doc){
					var data = doc.data();
					if (data != null && data.hasOwnProperty('url')){
						view.relocationUrl = doc.data()['url'];
						view.component.body.dispatchEvent(new CustomEvent('relocationFound',{detail:{view:view}}));
					}
				});
		},
		_new_:function (o){
			logger.debug('RelocationController Element Initialized');
			this.component = o.component;
		},
		done: function (){
			var _id = (function (){
					try {
						return document.location.pathname.split('/')[1].split('&')[0];
					}catch (e){

					}
				})();
			if (_id != null && _id!=""){
				this.component.body.addEventListener('relocationFound',function (e){
					var view = e.detail.view;
					var url = e.detail.view.relocationUrl;
					document.head.innerHTML+='<meta http-equiv="refresh" content="0;URL=\''+url+'\'" />  ';
				});
				this.getQlnLinkUrl(_id);
			}
			this.component.body.innerHTML="";
		}
	}),
	Class('MainController',Object,{
		component:null,
		_new_:function (o){
			logger.debug('MainController Element Initialized');
			this.component = o.component;
		},
		done: function (){

		}
	}),
	Class('SideNavController',Object,{
		_new_:function (){
			//TODO: Implement
			logger.debug('SideNavController Element Initialized');
			this.component = Tag('component[name="nav"]')[0].Cast(Component);
		}
	}),
	Class('ProgressBarController',Object,{
		_new_:function (){
			//TODO: Implement
			logger.debug('ProgressBarController Element Initialized');
		},
		done: function (){
				this.component.body.style.display='none';
				this.component.body.setAttribute('loaded',true);
		}
	}),
	Class('ThankyouController',Object,{
		_new_:function (){
			//TODO: Implement
			logger.debug('ThankyouController Element Initialized');
		},
		done: function (){
				this.component.body.style.display='none';
				this.component.body.setAttribute('loaded',true);
		}
	}),
	Class('GridBoxController',Object,{
		component: null,
		processbar:null,
		thankyou:null,
		dependencies:[
			New(SourceJS,{external:false,url:'js/gallery.min.opt.js',done:function(){}})
    ],
		_new_:function (o){
			//TODO: Implement
			this.component = o.component;

		},
		done:function (){
			logger.debug('GridBoxController Element Initialized');
			this.component.body.setAttribute('loaded',true);

		}
	}),
	Class('CarouselController',Object,{
		component: null,
		processbar:null,
		thankyou:null,
		dependencies:[],
		_new_:function (o){
			//TODO: Implement
			this.component = o.component;

		},
		done:function (){
			logger.debug('GridBoxController Element Initialized');
			this.component.body.setAttribute('loaded',true);
			var controller = this;
			controller.dependencies.push(New(SourceJS,{external:false,url:'js/gallery.min.opt.js',done:function(){}}));

		}
	}),
	Class('GenerateLinkFormController',Object,{
		component: null,
		processbar:null,
		thankyou:null,
		done:function (){
			logger.debug('GenerateLinkFormController Element Initialized');
			this.component.body.setAttribute('loaded',true);

		},
		_new_:function (o){
			//TODO: Implement
			this.component = o.component;

		}
	}),

]);
