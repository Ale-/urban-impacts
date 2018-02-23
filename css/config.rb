# To prevent problems of encoding when compiling:
Encoding.default_external = "utf-8"

require 'compass/import-once/activate'
require 'sass-globbing'

# Syntax
preferred_syntax = :sass

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# Set this to the root of your project when deployed:
http_path  = "/"
css_dir    = "dist"
sass_dir   = "src"

# Set abstractions as an import path to every partial
add_import_path "src/abstractions"

#
# Output style
#
output_style  = (environment == :production) ? :compressed : :nested
line_comments = (environment == :production) ? false : true

# To prevent warnings about deprecated stuff
disable_warnings = true
