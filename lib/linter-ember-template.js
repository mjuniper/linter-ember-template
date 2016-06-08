'use babel'

module.exports = {
  activate() {
    console.log('My package was activated')
  },

  deactivate() {
    console.log('My package was deactivated')
  },

  provideLinter() {
    console.log('We hit the linter');
    const provider = {
      name: 'Ember Template Linter',
      grammarScopes: ['text.html.mustache'], // ['*'] will get it triggered regardless of grammar
      scope: 'file', // or 'project'
      lintOnFly: true,
      lint: function(textEditor) {
        console.log('We are being linted')
        return new Promise(function(resolve, reject) {
          console.log('Our promise resolved');
          return resolve([{
            type: 'Error',
            text: 'Something went wrong',
            range:[[0,0], [0,1]],
            filePath: textEditor.getPath()
          }]);
        })
      }
    }
    return provider
  }
}
