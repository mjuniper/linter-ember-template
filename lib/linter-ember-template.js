'use babel';

import LinterEmberTemplateView from './linter-ember-template-view';
import { CompositeDisposable } from 'atom';

export default {

  linterEmberTemplateView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.linterEmberTemplateView = new LinterEmberTemplateView(state.linterEmberTemplateViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.linterEmberTemplateView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'linter-ember-template:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.linterEmberTemplateView.destroy();
  },

  serialize() {
    return {
      linterEmberTemplateViewState: this.linterEmberTemplateView.serialize()
    };
  },

  toggle() {
    console.log('LinterEmberTemplate was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
