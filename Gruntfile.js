module.exports = function(grunt) {
  grunt.initConfig({
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'public/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'public/css/',
          ext: '.min.css'
        }]
      }
    },
    uglify: {
   my_target: {
     options: {
       sourceMap: true,
       sourceMapName: 'path/to/sourcemap.map'
     },
     files: {
       'js/script.min.js': ['js/script.js']
     }
   }
 },
 jshint:{
   files:["*.js", "js/script.js"],
   options: {
     globals: {
       jQuery: true
     },
   }
 },
 watch: {
   cssmin:{
     files:["css/style.css"],
     tasks:["cssmin"]
   }

},
  });


  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask("default", ["cssmin", "uglify"]);
  grunt.registerTask("cssmin", ["cssmin"]);
    grunt.registerTask("hint", ["jshint"]);
        grunt.registerTask("watch", ["cssmin"]);
};
