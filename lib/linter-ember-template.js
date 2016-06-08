var Linter = require('ember-template-lint');
var loophole = require('loophole');

'use babel'

module.exports = {
  provideLinter() {
    const provider = {
      name: 'Ember Template Linter',
      grammarScopes: ['text.html.mustache'], // ['*'] will get it triggered regardless of grammar
      scope: 'file', // or 'project'
      lintOnFly: true,
      lint: function(textEditor) {
        return new Promise(function(resolve, reject) {
          let options = {
            configPath: atom.project.getPaths()[0] + "/.template-lintrc"
          };
          let linter = new Linter(options);

          let linterErrors = [];

          loophole.allowUnsafeNewFunction(() => {
            linterErrors = linter.verify({
              source: textEditor.getText(),
              moduleId: textEditor.getPath().slice(0, -4)
            });
          });

          let errors = [];

          linterErrors.forEach((error) => {
            errors.push({
              type: 'Error',
              text: error.message,
              range: [[error.line, error.column], [error.line, error.column + 5]],
              filePath: textEditor.getPath()
            });
          });

          resolve(errors);
        })
      }
    }
    return provider
  }
}
