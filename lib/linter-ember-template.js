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
          let errors = [];

          errors.push({
            type: 'Error',
            text: 'Something went wrong',
            range:[[0,0], [0,1]],
            filePath: textEditor.getPath()
          });

          resolve(errors);
        })
      }
    }
    return provider
  }
}
