<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>TEST</title>
    <script type="text/javascript">
		mxBasePath = './';
	</script>
	<script type="text/javascript" src="<%=basePath %>js/mxClient.js"></script>
	<script type="text/javascript">
		var graph = null;
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
		function main(container){
		// Checks if the browser is supported
			
			if (!mxClient.isBrowserSupported())
			{
				// Displays an error message if the browser is not supported.
				mxUtils.error('Browser is not supported!', 200, false);
			}
			else
			{
				// Creates the graph inside the given container
				graph = new mxGraph(container);
				
				// Enables rubberband selection
				graph.setTooltips(true);
				graph.setCellsResizable(false);
				graph.setResizeContainer(true);
				graph.minimumContainerSize = new mxRectangle(0, 0, 500, 380);
				graph.setBorder(60);
				//graph.setPanning(true);
				var getTooltipForCell = graph.getTooltipForCell;
				graph.getTooltipForCell = function(cell)
				{
					// Adds some relation details for edges
					if (graph.getModel().isEdge(cell))
					{
						var src = this.getLabel(this.getModel().getTerminal(cell, true));
						var trg = this.getLabel(this.getModel().getTerminal(cell, false));

						return src + ' ' + cell.value.nodeName + ' ' +  trg;
					}

					return getTooltipForCell.apply(this, arguments);
				};
				
				new mxRubberband(graph);
				
				var style = graph.getStylesheet().getDefaultVertexStyle();
				style[mxConstants.STYLE_STROKECOLOR] = 'gray';
				style[mxConstants.STYLE_ROUNDED] = true;
				style[mxConstants.STYLE_SHADOW] = true;
				style[mxConstants.STYLE_FILLCOLOR] = '#DFDFDF';
				style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
				style[mxConstants.STYLE_FONTCOLOR] = 'black';
				style[mxConstants.STYLE_FONTSIZE] = '12';
				style[mxConstants.STYLE_SPACING] = 4;
		
				// Creates the default style for edges
				style = graph.getStylesheet().getDefaultEdgeStyle();
				style[mxConstants.STYLE_STROKECOLOR] = '#0C0C0C';
				style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white';
				style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
				style[mxConstants.STYLE_ROUNDED] = true;
				style[mxConstants.STYLE_FONTCOLOR] = 'black';
				style[mxConstants.STYLE_FONTSIZE] = '10';
				
				
				// Gets the default parent for inserting new cells. This
				// is normally the first child of the root (ie. layer 0).
				var parent = graph.getDefaultParent();
				var layout = new mxHierarchicalLayout(graph,mxConstants.DIRECTION_WEST);
				//var organic = new mxFastOrganicLayout(graph);
				//organic.forceConstant = 120;
				prefix = 'M_';
				// Adds cells to the model in a single step
				graph.getModel().beginUpdate();
				try
				{	
					for(var i=0;i<testData.length;i++){
						if(!graph.getModel().cells[prefix+testData[i][1]]){
							graph.insertVertex(parent, prefix+testData[i][1], testData[i][1], 0, 0, 60, 20);
						}
						if(!graph.getModel().cells[prefix+testData[i][2]]){
							graph.insertVertex(parent, prefix+testData[i][2], testData[i][2], 0, 0, 60, 20);
						}
						graph.insertEdge(parent, null, testData[i][0], graph.getModel().cells[prefix+testData[i][1]], 
											graph.getModel().cells[prefix+testData[i][2]]);
					};
					/*
					var v1 = graph.insertVertex(parent, 'mxcell-1', 'Hello,', 20, 20, 60, 20);
					var v2 = graph.insertVertex(parent, null, 'World!', 150, 20, 60, 20);
					var v3 = graph.insertVertex(parent, null, 'World!', 230, 20, 60, 20);
					var e1 = graph.insertEdge(parent, null, '11-80', v1, v2);
					var e2 = graph.insertEdge(parent, null, '1-10', v1, v3);
					*/
					layout.execute(parent);
					//organic.execute(parent);
					//alert(this.graph.getModel().cells[v2.getId()].getValue);
					//alert(this.graph.getModel().cells['mxcell-1'].getValue());
				}
				finally
				{
					// Updates the display
					graph.getModel().endUpdate();
				}
				
			}
	}
	</script>
  </head>
  <body onload="main(document.getElementById('graphContainer'))">
	<table>
	<tr>
		<td>
			<div id="graphContainer"
				style="border: solid 1px black;overflow:hidden;width:100%;height:100%;">
			</div>
		</td>
	</tr>
	</table>
</body>
</html>
