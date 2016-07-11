module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    docsTemplate: grunt.file.read('jsdoc2md/README.hbs'),
    jshint: {
      files: ['Gruntfile.js', 'index.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false,
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['test/**/*.js']
      }
    },
    jsdoc2md: {
      withOptions: {
        options: {
          'template': '<%= docsTemplate %>',
        },
        src: 'index.js',
        dest: 'README.md'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
  grunt.loadNpmTasks('grunt-release');

  grunt.registerTask('test', ['jshint', 'mochaTest']);
  grunt.registerTask('docs', ['test', 'jsdoc2md']);
  grunt.registerTask('default', ['test']);

};
