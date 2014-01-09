(function(){a(typeof Proj4js.util.MGRS,"object","MGRS available in the Proj4js.util namespace");a(typeof Proj4js.Point.fromMGRS,"function","fromMGRS method added to Proj4js.Point prototype");a(typeof Proj4js.Point.prototype.toMGRS,"function","toMGRS method added to Proj4js.Point prototype");var m,p;m="33UXP04";p=Proj4js.Point.fromMGRS(m);a(p.x.toPrecision(7),"16.41450","Longitude of point from MGRS correct.");a(p.y.toPrecision(7),"48.24949","Latitude of point from MGRS correct.");a(p.toMGRS(),"33UXP0500444998","MGRS reference with highest accuracy correct.");a(p.toMGRS(1),m,"MGRS reference with 1-digit accuracy correct.");m="24XWT783908";p=Proj4js.Point.fromMGRS(m);a(p.x.toPrecision(7),"-32.66433","Longitude of point from MGRS correct.");a(p.y.toPrecision(7),"83.62778","Latitude of point from MGRS correct.");a(p.toMGRS(3),"25XEN041865","MGRS reference with 3-digit accuracy correct.");function a(g,e,b){if(g==e){document.write('<div>'+b+'</div>')}else{document.write('<div style="background-color:red">'+b+' - got '+g+', but expected '+e+'</div>')}}})();
