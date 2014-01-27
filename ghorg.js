/* jshint jquery: true */
'use strict';

(function(global, $){
  var ghorg = function(orgName) {
    var api = {};
    var basicAuth;

    // authenticate
    api.authenticate = function authenticate (auth) {
      basicAuth = 'Basic ' + btoa([auth.username, auth.password].join(':'));
      return $.Deferred().resolve(api).promise();
    };

    // Entities
    api.Milestone = function Milestone(properties) {
      $.extend(this, properties);

      this.addTo = function addMilestoneToRepositories(repos) {
        if (! $.isArray(repos)) {
          repos = [repos];
        }
        var promises = repos.map(function(repo) {
          return post('/repos/'+orgName+'/'+repo.name+'/milestones', this.toJSON());
        }, this);
        return $.when.apply($, promises);
      };

      this.toJSON = function() {
        return {
          title: this.title,
          state: this.state,
          description: this.description,
          due_on: this.dueOn
        };
      };
    };

    // repositories
    api.repositories = function repository( /*name*/ ) {
      var repoApi = {};
      return repoApi;
    };
    api.repositories.findAll = function findAllRepositories() {
      return get('/orgs/' + orgName + '/repos');
    };

    // milestones
    api.milestones = {};
    api.milestones.add = function addMilestone(properties) {
      var milestone = new api.Milestone(properties);
      return api.repositories.findAll().then( milestone.addTo.bind(milestone) );
    };

    // PRIVATE
    var ajaxHeaders = {
      Accept: 'application/vnd.github.v3+json'
      // 'Content-Type': 'application/vnd.github.v3+json'
    };
    function get (path) {
      return $.ajax({
        url: 'https://api.github.com' + path,
        headers: ajaxHeaders
      });
    }

    function post (path, data) {
      return $.ajax({
        type: 'POST',
        url: 'https://api.github.com' + path,
        data: JSON.stringify(data),
        headers: $.extend(ajaxHeaders, {
          Authorization: basicAuth
        })
      });
    }


    return api;
  };

  global.ghorg = ghorg;
}(window, jQuery));
