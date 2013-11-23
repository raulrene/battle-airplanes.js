/*global module:false*/
module.exports = function(grunt) {

  var sourceDir = "less/";
  var cssDir = "public/css/";

  function getLessFileTargets() {
    var targets = {};
    targets[cssDir+"style.css"] = sourceDir+"style.less";
    return targets;
  }

  grunt.task.loadNpmTasks("grunt-contrib-less");

  // Project configuration.
  grunt.initConfig({
    less: {
      development: {
        files: getLessFileTargets()
      },
      production: {
        options: {
          yuicompress: true
        },
        files: getLessFileTargets()
      }
    },
    watch : {
      files : [ sourceDir+"**/*.less" ],
      tasks : [ "less" ]
    }
  });

  // Default task.
  grunt.registerTask('default', 'less');

};
