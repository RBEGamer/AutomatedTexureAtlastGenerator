'use strict';
var args = process.argv.slice(2);
var crypto = require('crypto');
var Spritesmith = require('spritesmith');
var path = require('path');
var config = require(args[0] || './config.json');
var fs = require('fs');
var currentPath =  process.cwd();



var output_path = path.join(process.cwd(), config.output_file_path);
var input_path = path.join(currentPath, config.asset_folder_path);

console.log("CWD:" + currentPath);
console.log("IN " + input_path);
console.log("OUT " + output_path);

var walkSync = function (dir, filelist) {
  var fs = fs || require('fs'),
    files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function (file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    }
    else {
      if (String(file).charAt(0) != '.') {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};



var files = walkSync(input_path); //LIST ALL FILES IN INPUT PATH
console.log(files);


var sprites = [];

//generate files for sprite array
for (let index = 0; index < files.length; index++) {
  const fs = files[index];
  //CHECK TYPE
  if (!config.supported_image_types.includes(path.extname(fs))){
    console.log("SKIP FILE(supported_image_types):" +fs);
    continue;
  }

  if (config.ignore_filenames.includes(path.basename(fs))){
    console.log("SKIP FILE(ignore_filenames 1):" + fs);
    continue;
  }
  if (config.ignore_filenames.includes(fs)) {
    console.log("SKIP FILE(ignore_filenames 2):" + fs);
    continue;
  }

  if (fs == path.join(output_path, "./" + config.atlas_file_name + ".png")){
    console.log("SKIP FILE(outputfile):" + fs);
    continue;
  }

//supported_image_types
  //CHECK PREFIX
  if (path.basename(fs).startsWith(config.file_prefix)) {
    sprites.push(fs);
    
    continue;
  } else if (config.file_prefix == null) {
    sprites.push(fs);
    continue;
  }else{
    console.log("SKIP FILE(prefix):" + fs);
  }

}
console.log(sprites);

console.log("---------- OUTPUT ---------");
// Generate our spritesheet
Spritesmith.run({ src: sprites }, function handleResult(err, result) {
  //clean json output to a array represenation
  var coordinates_cleaned = [];
  for (let index = 0; index < Object.keys(result.coordinates).length; index++) {
    const k = Object.keys(result.coordinates)[index];

    result.coordinates[k].xend = result.coordinates[k].x + result.coordinates[k].width;
    result.coordinates[k].yend = result.coordinates[k].y + result.coordinates[k].height;
    coordinates_cleaned.push({ "hash": crypto.createHash('md5').update(String(k)).digest('hex'),"file": path.basename(k),"coordinates": result.coordinates[k] });
    console.log(coordinates_cleaned);
  }
  var fin_json_out = {};
  fin_json_out.config_name = config.config_name; //include config name
  fin_json_out.atlas_properties = result.properties; //include metadata
  fin_json_out.images = coordinates_cleaned;
  //WRITE FILES
  fs.writeFile(path.join(output_path, "./" + config.atlas_file_name + ".png"), result.image, function (err_img) {
    if (err_img) throw err_img;

    fs.writeFile(path.join(output_path, "./" + config.atlas_file_name + ".json"), JSON.stringify(fin_json_out, null, 2), (err_json) => {
      if (err_json) throw err_json;
        //TODO CHECK
    }); 


  });

});
