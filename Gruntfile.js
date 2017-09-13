module.exports = function(grunt) {
  grunt.initConfig({
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css/',
          src: ['*.css', '!*.min.css'],
          dest: 'css/',
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
 sass: {                              // Task
   dist: {                            // Target
     options: {                       // Target options
       style: 'expanded'
     },
     files: {                         // Dictionary of files
       'css/style.css': 'css/stlye.scss'
     }
   }
 },

 watch: {
   sass:{
     files["css/style.scss"],
     tasks["sass"]
   },
   cssmin:{
     files:["css/style.css"],
     tasks:["cssmin"]
   }


}
  });


  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask("default", ["cssmin", "uglify", "sass",]);

        grunt.registerTask("watchIT", ["watch"]);
};
