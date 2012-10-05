Ext.BLANK_IMAGE_URL = '/JGraph/resources/images/default/s.gif';
var BasePath = '/JGraph/';
//Ext.QuickTips.init();
var start = {
	id : 'start-panel',
	title : '欢迎使用',
	layout : 'fit',
	bodyStyle : 'padding:25px',
	html : '<img src="/JGraph/images/bg.jpg"/>'
};

Ext.onReady(function() {
	Ext.util.CSS.swapStyleSheet("theme", "/JGraph/resources/css/xtheme-gray.css");
	var navTreePanel = new Ext.tree.TreePanel({
			//xtype : 'treepanel',
			border : false,
			rootVisible : false,
			autoScroll : true,
			loader : new Ext.tree.TreeLoader({
				dataUrl : BasePath + 'js/tree-data-manager.json'
			}),
			root : new Ext.tree.AsyncTreeNode(),
			listeners : {
			    'click':function(node){
			    	if(node.isLeaf())
			    		addTab(node.id,node.text);
			    }
			}
	});
	var testData = [
					['1-100','J0504','DT001'],
					['1-80','DT001','DT002'],
					['1-70','DT002','DT003'],
					['1-60','DT003','DT004'],
					['1-50','DT004','DT005'],
					['1-40','DT005','DT006'],
					['1-30','DT006','DT007'],
					['1-20','DT007','DT008'],
					['1-10','DT008','DP02001'],
					['1-10','DP02001','DP02001-1'],
					['11-20','DT008','DP02002'],
					['21-30','DT007','DP02003'],
					['31-40','DT006','DP02004'],
					['41-50','DT005','DP02005'],
					['51-60','DT004','DP02006'],
					['61-70','DT003','DP02007'],
					['71-80','DT002','DP02008'],
					['81-90','DT001','DP02009'],
					['81-90','DT001','DT009'],
					['81-90','DT009','DP02009-1'],
					['81-90','DT009','DP02009-2']
				];
	var testData2 = [
		['1-10	','QD.YIY00/J0504','QD.YIY00/J0504/DP02001'],
		['11-20	','QD.YIY00/J0504','QD.YIY00/J0504/DP02002'],
		['21-30	','QD.YIY00/J0504','QD.YIY00/J0504/DP02003'],
		['31-40	','QD.YIY00/J0504','QD.YIY00/J0504/DP02004'],
		['41-50	','QD.YIY00/J0504','QD.YIY00/J0504/DP02005'],
		['51-60	','QD.YIY00/J0504','QD.YIY00/J0504/DP02006'],
		['61-70	','QD.YIY00/J0504','QD.YIY00/J0504/DP02007'],
		['71-80	','QD.YIY00/J0504','QD.YIY00/J0504/DP02008'],
		['81-90	','QD.YIY00/J0504','QD.YIY00/J0504/DP02009']];
	var JGraphCanvs1 = new Ext.ux.ztesoft.JGraphPanel({data:testData,region:'north',height:200,title:'新思维：(QD.YIY00/J0504/PX02)',prefix:'G_'});
	var JGraphCanvs2 = new Ext.ux.ztesoft.JGraphPanel({data:testData2,region:'center',prefix:'B_',title:'金牛：(QD.YIY00/J0504/PX02)',galign:'top'});
	var tabPanel = new Ext.TabPanel({
		region:'center',
		//deferredRender:false,
		autoScroll: true, 
		margins:'0 4 4 0',
		activeTab:0,
		boder:false,
		collapsible: false,
		items:[{
			title : '画板',
			layout : 'border',
			bodyStyle : 'padding:2px',
			items:[JGraphCanvs1,JGraphCanvs2/*{region:'north',layout:'fit',height:300,html:'aaaaa'},
				   {region:'center',layout:'fit',html:'bbbbb'}*/]
		}]
    });
	
		Ext.get('loading').remove();
		Ext.getDom('header').style.visibility = 'visible';
		
		var vp = new Ext.Viewport({
			layout : 'border',
			defaults : {
				split : true
			},
			items : [{
				xtype : 'box',
				region : 'north',
				applyTo : 'header',
				height : 30,
				split : false
			},/* {
				title : '导航',
				id : 'accordion-panel',
				layout : 'fit',
				region : 'west',
				margins : '2 0 5 5',
				width : 150,
				minSize : 100,
				maxSize : 250,
				collapsible: true,
    			collapseMode: 'mini',
				bodyStyle : 'background-color:#DFE8F6',
				defaults : {
					border : false
				},
				items : [navTreePanel]
			},*/ tabPanel]
		});
});
