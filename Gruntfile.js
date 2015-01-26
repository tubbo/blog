/**
 * Simple S3 build script for pushing files to Amazon. Takes all files
 * in ./dist and uploads them to a configured S3 bucket. Use Amazon's
 * web interface to configure that bucket for public display, and you
 * got yourself a web site! Bonus points if you use CloudFront to
 * distribute these assets all over the world for ultra-fast render
 * times.
 */

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['jshint', 'shell:build', 'aws_s3']);

  grunt.initConfig({
    shell: {
      build: {
        command: 'ember build --environment production'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'lib/**', 'Brocfile.js', 'blueprints/article/index.js']
    },
    aws_s3: {
      options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      production: {
        options: {
          bucket: process.env.AWS_S3_BUCKET_NAME,
          differential: true
        },
        files: [
          {
            expand: true,
            cwd: 'dist',
            src: ['**'],
            dest: '',
            action: 'upload'
          }
        ]
      }
    }
  });
};
