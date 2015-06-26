/* global marked */
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'article',
  classNames: ['page'],

  html: function() {
    return new Ember.Handlebars.SafeString(marked(this.get('body')));
  }.property('body'),

  lastUpdated: function() {
    return 'today';
  }
});
