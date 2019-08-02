<img src="/logo.png" />

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




# EXAMPLE OUTPUT

```json
{
  "config_name": "AtlasExportObjectsOnly",
  "atlas_properties": {
    "width": 750,
    "height": 500
  },
  "images": [
    {
      "hash": "dfb7ec80e628212586b4c70d496803bd",
      "file": "SA_destille_hover.png",
      "coordinates": {
        "x": 0,
        "y": 0,
        "width": 250,
        "height": 250,
        "xend": 250,
        "yend": 250
      }
    },
    {
      "hash": "d1f89b401e37ab3911dbb02f2e04ba3b",
      "file": "SA_destille_normal.png",
      "coordinates": {
        "x": 250,
        "y": 0,
        "width": 250,
        "height": 250,
        "xend": 500,
        "yend": 250
      }
    },
    {
      "hash": "d5a09f3ec20e1f0bf70c1f8321fdef14",
      "file": "SA_dns squenzerx500_active.png",
      "coordinates": {
        "x": 0,
        "y": 250,
        "width": 250,
        "height": 250,
        "xend": 250,
        "yend": 500
      }
    },
    {
      "hash": "9994bba98f5390a7578c84115bb698a6",
      "file": "SA_dns squenzerx500_hover.png",
      "coordinates": {
        "x": 250,
        "y": 250,
        "width": 250,
        "height": 250,
        "xend": 500,
        "yend": 500
      }
    },
    {
      "hash": "4801bde9c1e00d93d6b2213e901d1abc",
      "file": "SA_dns squenzerx500_normal.png",
      "coordinates": {
        "x": 500,
        "y": 0,
        "width": 250,
        "height": 250,
        "xend": 750,
        "yend": 250
      }
    }
  ]
}



```

<img src="/watermark_sprite_atlas.png" />
