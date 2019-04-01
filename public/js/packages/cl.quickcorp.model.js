"use strict";
Package('cl.quickcorp.model',[
	Class('ContactVO',VO,{
		first_name:'',
		last_name:'',
		email:'',
		comment:'',
		_new_:function (){
			//TODO: Implement
			console.log('Contact Object Initialized');
		}
	}),
]);
