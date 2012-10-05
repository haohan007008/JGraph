Ext.ns('Ext.ux.ztesoft');
var BasePath = '/JGraph/';
//Ext.QuickTips.init();

mxGraph.prototype.getTooltipForCell = function(cell) 
{ 
  //var label = this.convertValueToString(cell);
  if (!this.getModel().isEdge(cell))
  {
	return cell.getId().substr(2,cell.getId().length); 
  }
}

var path_prefix = BasePath+'dt_trs.jsp?p='
Ext.ux.ztesoft.JGraphPanel=Ext.extend(Ext.Panel, {
    resizable          : false  
    ,isXXL              : false 
    ,showExtJS          : true
    ,ExtVersion         : '2.2'
    ,initComponent      : function(){
    	 this.graph = null;
    	 if(!this.prefix) this.prefix = '';
    	 Ext.apply(this, {
               bodyStyle:"padding:5px 5px;overflow:auto;background:url('images/grid.gif');",   
               monitorValid:true,
               layout:'form',
               html:''
         }); 
    	 Ext.ux.ztesoft.JGraphPanel.superclass.initComponent.apply(this, arguments);
    	 this.on('render',this.redraw,this);
    }
    ,redraw:function(p){
    	this.main(document.getElementById(p.body.id));
    	/*
    	//alert(p.html);
    	//p.html  = 'Hello Word';
    	alert(p.body.id);
    	var el =p.getUpdater();
    	bd.update('Hello Word')
    	//el.innerHTML ='Hello Word';
    	*/
	}
	,main:function(container){
		// Checks if the browser is supported
			
			if (!mxClient.isBrowserSupported())
			{
				// Displays an error message if the browser is not supported.
				mxUtils.error('Browser is not supported!', 200, false);
			}
			else
			{
				// Creates the graph inside the given container
				this.graph = new mxGraph(container);
				this.graph.setCellsResizable(false);
				// Enables rubberband selection
				new mxRubberband(this.graph);
				this.graph.setPanning(true);
				this.graph.setTooltips(true);
				
				/*
				this.graph.getStylesheet().getDefaultVertexStyle()['fillColor'] = '#FFFFFF';
				this.graph.getStylesheet().getDefaultVertexStyle()['strokeColor'] = '#000000';
				this.graph.getStylesheet().getDefaultVertexStyle()['fontColor'] = '#000000';
				this.graph.getStylesheet().getDefaultVertexStyle()['fontStyle'] = '1';
				this.graph.getStylesheet().getDefaultEdgeStyle()['strokeColor'] = '#000000';
				this.graph.getStylesheet().getDefaultEdgeStyle()['fontColor'] = '#000000';
				this.graph.getStylesheet().getDefaultEdgeStyle()['fontStyle'] = '0';
				this.graph.getStylesheet().getDefaultEdgeStyle()['fontStyle'] = '0';
				this.graph.getStylesheet().getDefaultEdgeStyle()['startSize'] = '6';
				this.graph.getStylesheet().getDefaultEdgeStyle()['endSize'] = '8';
				*/
				var style = this.graph.getStylesheet().getDefaultVertexStyle();
				style[mxConstants.STYLE_STROKECOLOR] = 'gray';
				style[mxConstants.STYLE_ROUNDED] = true;
				style[mxConstants.STYLE_SHADOW] = true;
				style[mxConstants.STYLE_FILLCOLOR] = '#DFDFDF';
				style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
				style[mxConstants.STYLE_FONTCOLOR] = 'black';
				style[mxConstants.STYLE_FONTSIZE] = '12';
				style[mxConstants.STYLE_SPACING] = 4;
				
				// Creates the default style for edges
				style = this.graph.getStylesheet().getDefaultEdgeStyle();
				style[mxConstants.STYLE_STROKECOLOR] = '#0C0C0C';
				style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white';
				style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
				style[mxConstants.STYLE_ROUNDED] = true;
				style[mxConstants.STYLE_FONTCOLOR] = 'black';
				style[mxConstants.STYLE_FONTSIZE] = '10';
				// Gets the default parent for inserting new cells. This
				// is normally the first child of the root (ie. layer 0).
				var parent = this.graph.getDefaultParent();
				var al = mxConstants.DIRECTION_WEST;
				if(this.galign && this.galign =='top'){
					al = mxConstants.DIRECTION_NORTH;
				}
				var layout = new mxHierarchicalLayout(this.graph,al);
				var organic = new mxFastOrganicLayout(this.graph);
				organic.forceConstant = 120;
				
				// Adds cells to the model in a single step
				this.graph.getModel().beginUpdate();
				var testData = this.data;
				try
				{	
					for(var i=0;i<testData.length;i++){
						if(!this.graph.getModel().cells[this.prefix+testData[i][1]]){
							this.graph.insertVertex(parent, this.prefix+testData[i][1], this.getend(testData[i][1],'/'), 0, 0, 60, 20);
						}
						if(!this.graph.getModel().cells[this.prefix+testData[i][2]]){
							this.graph.insertVertex(parent, this.prefix+testData[i][2], this.getend(testData[i][2],'/'), 0, 0, 60, 20);
						}
						this.graph.insertEdge(parent, null, testData[i][0], this.graph.getModel().cells[this.prefix+testData[i][1]], 
											this.graph.getModel().cells[this.prefix+testData[i][2]]);
					};
					/*
					var v1 = this.graph.insertVertex(parent, 'mxcell-1', 'Hello,', 20, 20, 60, 20);
					var v2 = this.graph.insertVertex(parent, null, 'World!', 150, 20, 60, 20);
					var v3 = this.graph.insertVertex(parent, null, 'World!', 230, 20, 60, 20);
					var e1 = this.graph.insertEdge(parent, null, '11-80', v1, v2);
					var e2 = this.graph.insertEdge(parent, null, '1-10', v1, v3);
					*/
					layout.execute(parent);
					//organic.execute(parent);
					//alert(this.graph.getModel().cells[v2.getId()].getValue);
					//alert(this.graph.getModel().cells['mxcell-1'].getValue());
				}
				finally
				{
					// Updates the display
					this.graph.getModel().endUpdate();
				}
				
			}
	}
	,getend:function(mainstr,searchstr){
				var foundoffset = -1;
			    foundoffset=mainstr.indexOf(searchstr);
			    if(foundoffset==-1){
			       return mainstr;
			    }
			    return this.getend(mainstr.substr(foundoffset+searchstr.length,mainstr.length),searchstr);
	}	
});


