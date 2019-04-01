"use strict";
Package('cl.quickcorp.components',[
  Class('MainComponent',Component,{
    cached:true
  }),
  Class('FormField',Component,{
    cached:false,
    reload:true,
  	createBindingEvents:function (){
  		var _executeBinding = this.executeBinding;
  		var thisobj = this;
      if (typeof this.fieldType =='undefined' || this.fieldType == null ){
        var _objList = this.body.querySelectorAll('*[data-field]'); // every child with data-field set
      } else {
        var _objList = this.body.querySelectorAll(this.fieldType+'[data-field]'); // every child with data-field set and tagname is equal to fieldType property
      }
  		for (var _datak=0;_datak<_objList.length;_datak++){
  			var _obj = _objList[_datak];
  			_obj.addEventListener('change',function(e){
  				logger.debug('Executing change event binding');
  //				_executeBinding(e.target);
  				thisobj.executeBindings();
  			});
  			_obj.addEventListener('keydown',function(e){
  				logger.debug('Executing keydown event binding');
  //				_executeBinding.call(thisobj,e.target);
  					thisobj.executeBindings();
  			});
  		}
  	},
  	executeBinding:function (_obj){
  		var _datamodel = _obj.getAttribute('data-field');
  		logger.debug('Binding '+_datamodel+' for '+this.name);
  		this.data[_datamodel]=_obj.value;
  	},
  	executeBindings:function (){
      if (typeof this.fieldType =='undefined' || this.fieldType == null ){
        var _objList = this.body.querySelectorAll('*[data-field]'); // every child with data-field set
      } else {
        var _objList = this.body.querySelectorAll(this.fieldType+'[data-field]'); // every child with data-field set and tagname is equal to fieldType property
      }
  		for (var _datak=0;_datak<_objList.length;_datak++){
  			var _obj = _objList[_datak];
  			var _datamodel = _obj.getAttribute('data-field');
        logger.debug('Binding '+_datamodel+' for '+this.name);
  			this.data[_datamodel]=_obj.value;
  		}
  	},
    done:function (){
      var thisobj = this;
      thisobj.executeBindings();
  		thisobj.createBindingEvents();
      logger.debug('Field loaded: '+thisobj.fieldType+'[name='+thisobj.name+']');
    }
  }),
  Class('ButtonField',FormField,{
  	fieldType:'button'
  }),
  Class('InputField',FormField,{
  	fieldType:'input'
  }),
  Class('TextField',FormField,{
  	fieldType:'textarea'
  }),
  Class('EmailField',FormField,{
  	fieldType:'input'
  })
]);
