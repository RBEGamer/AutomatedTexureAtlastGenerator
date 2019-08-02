# AutomatedTexureAtlastGenerator

This tool packs all found sprites in an given Folder into one sprite atlas.
It uses the Spritesmith library to generate a sprite atlas and export a json file with coordinates and other information about the atlas file.

# CONFIGURATION
 See the `config.json` file for an example config.

* `asset_folder_path` - Folder which contains the source images (Relative to serve.js)
* `output_file_path` - Folder where to place the output files. THE FOLDER MUST EXIST
* `atlas_file_name` - Name of the output files
* `supported_image_types` - Fixed by the Spritesmith library
* `ignore_filenames` - Filename+extention to ignore
* `config_name` - Name for a config to identifiy them

* set `file_prefix:null` to append all images or process only files with an prefix like `SA_`


# RUN
`$ cd /src`
`$ npm install`

## LOAD DEFAULT CONFIG
`$ node spg_exporter.js` - loads `/src/config.json`

## LOAD SPECIFIC CONFIG
`$ node spg_exporter.js /other_config.json` - loads `/other_config.json`
