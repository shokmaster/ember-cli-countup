/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const map = require('broccoli-stew').map;

module.exports = {
  name: 'ember-countup',

  included: function () {
    this._super.included.apply(this, arguments);

    let findHost = this._findHost;
    let app = findHost.call(this);
    this.app = app;
    app.import('vendor/countUp.js');
  },

  treeForVendor: function (vendorTree) {
    let countupTree = new Funnel(path.join(this.project.root, 'node_modules', 'countup.js', 'dist'));
    //Only add if not FastBoot
    countupTree = map(countupTree, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);

    let trees = [countupTree];
// Check if vendor tree is null
    if (vendorTree) {
      trees.push(vendorTree);
    }

    return new MergeTrees(trees);
  },

};
