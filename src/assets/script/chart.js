module.exports = {
	bar:{
		chart : {
		   type:'line',
		   marginTop:20,
		   marginLeft:36,
		   zoomType:'x',
		   panning:true,
		},
		title: {
			text:null
		},
		colors:['#eb6100','#1989f5','#1aad19'],
		credits:{
			enabled:false
		},
        xAxis: {
            categories: ["1月","2月","3月", "4月","5月","6月","7月","8月","9月","10月","11月","12月"],   // x 轴分类 
            type: "category",
            "lineColor": "#999",
		    "lineWidth": 1,
		    "gridLineColor": "#999",
		    "gridLineDashStyle": "Dash",
		    "gridLineWidth": 0.5,
		    "tickWidth": 0,
		    "visible": true,
		    "index": 0,
		    "isX": true,
        },
        yAxis: {
            title: {
                "text": "客户/人",
		        "rotation": 360,
		        "align": "high",
		        "x": 42,
		        "offset": 1,
		        "y": -10
            },
            "gridLineDashStyle": "Dash",
		    "gridLineColor": "#999",
		    "gridLineWidth": 0.5,
		    "lineWidth": 1,
		    "lineColor": "#999",
		    "index": 0,
		    "tickAmount": 8,
        },
        plotOptions:{
        	line:{
        		marker:{
        			radius:2
        		},
        		"lineWidth":1
        	}
        	
        },
        series: [{                              // 数据列
            name: '运营部',                        // 数据列名
            data: [11,31,25,43,50,67,79,60,63,70,62,53],// 数据
             "_colorIndex": 0,
      		 "_symbolIndex": 0
        }, {
            name: '推广部',
            data: [0,10,19,31,44,50,77,60,49,55,37,48],// 数据列
            "_colorIndex": 1,
      		 "_symbolIndex": 1
        },{                              
            name: '技术部',                        // 数据列名
            data: [8,22,30,37,46,59,70,63,66,49,71,55],                     // 数据
            "_colorIndex": 2,
      		 "_symbolIndex": 2
        }],
        tolltip:{
        	followTouchMove:false
        }
	}
}
