function groupBar(divid,data,vCondition){
    Chart.defaults.groupableBar = Chart.helpers.clone(Chart.defaults.bar);

var helpers = Chart.helpers;
Chart.controllers.groupableBar = Chart.controllers.bar.extend({
  calculateBarX: function (index, datasetIndex) {
    // position the bars based on the stack index
    var stackIndex = this.getMeta().stackIndex;
    return Chart.controllers.bar.prototype.calculateBarX.apply(this, [index, stackIndex]);
  },

  hideOtherStacks: function (datasetIndex) {
    var meta = this.getMeta();
    var stackIndex = meta.stackIndex;

    this.hiddens = [];
    for (var i = 0; i < datasetIndex; i++) {
      var dsMeta = this.chart.getDatasetMeta(i);
      if (dsMeta.stackIndex !== stackIndex) {
        this.hiddens.push(dsMeta.hidden);
        dsMeta.hidden = true;
      }
    }
  },

  unhideOtherStacks: function (datasetIndex) {
    var meta = this.getMeta();
    var stackIndex = meta.stackIndex;

    for (var i = 0; i < datasetIndex; i++) {
      var dsMeta = this.chart.getDatasetMeta(i);
      if (dsMeta.stackIndex !== stackIndex) {
        dsMeta.hidden = this.hiddens.unshift();
      }
    }
  },

  calculateBarY: function (index, datasetIndex) {
    this.hideOtherStacks(datasetIndex);
    var barY = Chart.controllers.bar.prototype.calculateBarY.apply(this, [index, datasetIndex]);
    this.unhideOtherStacks(datasetIndex);
    return barY;
  },

  calculateBarBase: function (datasetIndex, index) {
    this.hideOtherStacks(datasetIndex);
    var barBase = Chart.controllers.bar.prototype.calculateBarBase.apply(this, [datasetIndex, index]);
    this.unhideOtherStacks(datasetIndex);
    return barBase;
  },

  getBarCount: function () {
    var stacks = [];

    // put the stack index in the dataset meta
    Chart.helpers.each(this.chart.data.datasets, function (dataset, datasetIndex) {
      var meta = this.chart.getDatasetMeta(datasetIndex);
      if (meta.bar && this.chart.isDatasetVisible(datasetIndex)) {
        var stackIndex = stacks.indexOf(dataset.stack);
        if (stackIndex === -1) {
          stackIndex = stacks.length;
          stacks.push(dataset.stack);
        }
        meta.stackIndex = stackIndex;
      }
    }, this);

    this.getMeta().stacks = stacks;
    return stacks.length;
  },
});



var ctx = document.getElementById(divid).getContext("2d");
new Chart(ctx, {
  type: 'groupableBar',
  data: data,
  options: {
    scales: {
    	xAxes:[
        {
          id:'xAxis1',
          type:"category",
          ticks:{
            callback:function(label){
              var month = label.split(";")[0];
              var year = label.split(";")[1];
              return month;
            }
          }
        },
        {
          id:'xAxis2',
          type:"category",
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
          ticks:{
            callback:function(label){
              var month = label.split(";")[0];
              var year = label.split(";")[1];
              if(vCondition===1 && month === "24-08 to 31-08"){
                return year;
              }else if(vCondition===2 && month === "24-08 to 31-08"){
                return year;
              }else{
                return "";
              }
            }
          }
        }],

		yAxes: [{
		ticks: {
		  max: 100,
		  callback: function(value, index, values) {
          return value + "%";
      }
		},
		stacked: true,
		}]
    }
  }
});
}