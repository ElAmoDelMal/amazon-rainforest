var path          = require('path');
var stylusDir     = 'dev/css';
var javascriptDir = 'public/javascript';
var JALP          = 'tu-papa';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        options: {
            stripBanners: true
        },
        styles: {
            src: ['dev/css/style.css', 'dev/css/carousel.css', 'dev/css/social-media.css'],
            dest: 'prod/css/styles.css'
        },
        scripts: {
            src: ['dev/js/script.js', 'dev/js/ie10-viewport-bug-workaround.js', 'dev/js/holder.js'],
            dest: 'prod/js/scripts.js'
        }
    },
    cssmin: {
      compress: {
        files: {
          "public/css/styles.min.css": 'prod/css/styles.css'
        }
      }
    },        
    uglify: {
      my_target: {
        files: {
          'public/js/scripts.min.js': 'prod/js/scripts.js'
        }
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'public/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'prod/images/'
        }]
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'dev/js/script.js']
    },
    stylus: {
        compile: {
            options: {
                paths: [stylusDir],
                'include css': true
            },
            files: {
                'public/css/styles.min.css': stylusDir + '/estilos.styl' 
            }
        }
    },
    watch: {
      stylesheets: {
          files: [stylusDir + '/**/*.styl', stylusDir + '/**/*.css'],
          tasks: ['stylus'],
          options: {
              interrupt: true
          }
      }
    },
    pagespeed: {
      options: {
        nokey: true,
        url: "https://developers.google.com"
      },
      prod: {
        options: {
          url: "https://developers.google.com/speed/docs/insights/v1/getting_started",
          locale: "en_GB",
          strategy: "desktop",
          threshold: 80
        }
      },
      paths: {
        options: {
          paths: ["/speed/docs/insights/v1/getting_started", "/speed/docs/about"],
          locale: "en_GB",
          strategy: "desktop",
          threshold: 80
        }
      }
    }

  });

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-imagemin');   
	grunt.loadNpmTasks('grunt-contrib-htmlmin'); 
	grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-stylus');  
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-pagespeed');
	// Default task(s).
	grunt.registerTask('compile', ['stylus']);
	grunt.registerTask('jalp', ['compile', 'watch']); 
  grunt.registerTask('default', ['compile']);
	grunt.registerTask('public', ['concat', 'cssmin', 'uglify']);

};