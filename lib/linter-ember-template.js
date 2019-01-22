var Linter = require('ember-template-lint');
var loophole = require('loophole');
var LinterHelpers = require('atom-linter');

'use babel'

module.exports = {
  provideLinter() {
    const provider = {
      name: 'Ember Template Linter',
      grammarScopes: [
        'text.html.mustache',
        'text.html.htmlbars',
        'text.html.handlebars'
      ],
      scope: 'file', // or 'project'
      lintsOnChange: true,
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
              severity: 'error',
              excerpt: error.message,
              location: {
                position: LinterHelpers.rangeFromLineNumber(textEditor, error.line - 1),
                file: textEditor.getPath()
              }
            });
          });

          resolve(errors);
        })
      }
    }
    return provider
  }
}
