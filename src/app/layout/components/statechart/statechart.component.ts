import { Component, OnInit, Input, AfterContentInit, ElementRef } from '@angular/core';
//import { DoubleverticalService } from 'src/app/shared/services/doublevertical.service';
declare var stateMap: Function;
import * as d3 from 'node_modules/jquery/dist/d3.v4.min.js'
import * as topojson from '../../../../assets/js/topojson.min.js';
@Component({
  selector: 'app-statechart',
  templateUrl: './statechart.component.html',
  styleUrls: ['./statechart.component.scss']
})
export class StatechartComponent implements OnInit, AfterContentInit {
  @Input() chartID: string;
  public d3Chart = Object.assign({},d3);
  title = 'charts';
  width =600 //window.innerWidth
  height =450 //window.innerHeight;
  projection = this.d3Chart.geoMercator();
  path = this.d3Chart.geoPath().projection(this.projection).pointRadius(2);
  svg;
  // g = this.svg.append("g");
  div: any;
  g;
  constructor(private container: ElementRef) { }

  ngOnInit() {
    this.d3Chart.json("../../../../assets/data/india.json", (error, data) => {
      var boundary = this.centerZoom(data);
      var subunits = this.drawSubUnits(data);
      this.colorSubunits(subunits);
      this.drawSubUnitLabels(data);
      this.drawPlaces(data);
      this.drawOuterBoundary(data, boundary);
  
    });
    console.log('state chart checker:',this.chartID);
    // this.svg = this.d3Chart.select('.'+this.chartID).append("svg").attr("width", this.width).attr("height", this.height);
    // this.g = this.svg.append("g");
    // this.div = this.d3Chart.select('.mapdiv').append("div").attr("class", "tooltip").style("opacity", 0)._groups[0][0];
    // console.log(this.div)
    console.log(this.projection)
  }
  
  ngAfterContentInit(){
    this.svg = this.d3Chart.select(this.container.nativeElement.querySelector('.mapdiv')).append("svg").attr("width", this.width).attr("height", this.height);
    this.g = this.svg.append("g");
    this.div = this.d3Chart.select(this.container.nativeElement.querySelector('.mapdiv')).append("div").attr("class", "tooltip").style("opacity", 0)._groups[0][0];
  }
  centerZoom(data){

    var o = topojson.mesh(data, data.objects.polygons, function(a, b) { return a === b; });

    this.projection
        .scale(1)
        .translate([0, 0]);

    var b = this.path.bounds(o),
        s = 1 / Math.max((b[1][0] - b[0][0]) / this.width, (b[1][1] - b[0][1]) / this.height),
        t = [(this.width - s * (b[1][0] + b[0][0])) / 2, (this.height - s * (b[1][1] + b[0][1])) / 2];

    var p = this.projection
        .scale(s)
        .translate(t);

    return o;

  }

  drawOuterBoundary(data, boundary){

    this.g.append("path")
        .datum(boundary)
        .attr("d", this.path)
        .attr("class", "subunit-boundary")
        .attr("fill", "none")
        .attr("stroke", "#3a403d");

  }

  drawPlaces(data){

    this.g.append("path")
        .datum(topojson.feature(data, data.objects.places))
        .attr("d", this.path)
        .attr("class", "place");

    this.g.selectAll(".place-label")
        .data(topojson.feature(data, data.objects.places).features)
      .enter().append("text")
        .attr("class", "place-label")
        // .attr("transform", function(d) { return "translate(" + this.projection(d.geometry.coordinates) + ")"; })
        .attr("dy", ".35em")
        .attr("x", 6)
        .attr("text-anchor", "start")
        .style("font-size", ".7em")
        .style("text-shadow", "0px 0px 2px #fff")
        .text(function(d) { return d.properties.name; });

  }

  drawSubUnits(data){

    var subunits = this.g.selectAll(".subunit")
        .data(topojson.feature(data, data.objects.polygons).features)
      .enter().append("path")
        .attr("class", "subunit")
        .attr("d", this.path)
        .style("stroke", "#fff")
        .style("stroke-width", "1px")
        .on('click', function (d, i) {
          console.log(d)
          if(this.d3Chart.select(this)._groups[0][0].style.opacity == 0.6) {
            this.d3Chart.select(this).transition().duration(300).style("opacity", 1);
          } else {
            this.d3Chart.select(this).transition().duration(300).style("opacity", 0.6);
          }
          // console.log(this.d3Chart.select(this).transition().duration(300).style)
          // this.d3Chart.select(this).text(d.properties.st_nm)
          //   .style("left", (this.d3Chart.event.pageX) + "px")
          //   .style("top", (this.d3Chart.event.pageY - 30) + "px");
        });

    return subunits;

  }

  drawSubUnitLabels(data){
    console.log(this.path)
    this.g.selectAll(".subunit-label")
        .data(topojson.feature(data, data.objects.polygons).features)
      .enter().append("text")
        .attr("class", "subunit-label")
        // .attr("transform", function(d) { return "translate(" + this.path.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .style("font-size", ".5em")
        .style("text-shadow", "0px 0px 2px #fff")
        .style("text-transform", "uppercase")
        .text(function(d) { return d.properties.st_nm; });

  }

  colorSubunits(subunits) {

    var c = this.d3Chart.scaleOrdinal(this.d3Chart.schemeCategory20);
    subunits
        .style("fill", 'rgb(31, 119, 180)')
        .style("opacity", ".6");

  }

}
