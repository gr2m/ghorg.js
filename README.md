ghorg.js
=========

[noBackend](http://nobackend.org/) – GitHub Organizations edition.

It's 2014 …
-----------

Dreamcodin'

```js
api = ghorg('hoodiehq');

// show all milestones for a GitHub organization
api.milestones.findAll({state: 'open', filter: /\b\d+\.\d_\.\d+\b/}).then( renderMilestones );

// Add a milestone accross repos
milestone = {
  title: 'v1.0.0-beta',
  description: 'Because we can.'
}
api.milestones.add(milestone).then( showSuccessMessage );

// add only to some repos
repositories = [123,456,789]; // can be ids, names or objects with id properties.
api.milestones.add(milestone, {to: repositories}).then( showSuccessMessage );

// alternative ...
milestone = new ghorg.Milestone( properties );
milestone.addTo('hoodiehq');
milestone = new ghorg('hoodiehq').Milestone( properties );
milestone.addTo(repositories);

// get all issues
api.issues.findAll().progress( renderIssues )
api.issues.findAll({
  repos: repositories,
  labels: labels,
  milestones: milestones,
  assignees: users
}).progress( renderIssues )
```

### Authentication

```js
api = ghorg('hoodiehq');

// username / password
api.authenticate({
  username: 'gr2m',
  password: 'pommes'
}).then( doSomething );

// token (https://github.com/settings/tokens/new)
api.authenticate('7b3a6a13148ccac2b97447ad4b0098eea204ba24').then( doSomething );
