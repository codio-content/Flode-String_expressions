// Used to load graph model from save file
var fs = require('fs');
var xmldom = require('./xmldom/dom-parser');
var mxgraph = require('./mxgraph');
// Used to run tests
var constants = require('./constants');
var context = require('./context').ExecutionContext;
var helpers = require('./helpers');
var windows = require('./windows');

exports.RunGraphWithInputs = function(fileName, inputs) {
  var model = LoadGraphModelFromSaveFile(fileName);
  if (!model) {
    return [];
  }

  // Create graph
  var graph = {model: model};
  var cell = helpers.GetStartCell(graph);
  var numSteps = constants.MAX_EXECUTABLE_CELLS;
  
  // Run graph
  context.setIsRunning(true);
  while (cell !== null && numSteps > 0) {
    if (cell.f2cCompiled === constants.SYNTAX_ERROR_TAG) {
      return [];
    }
    if (cell.f2cType === constants.CELL_TYPE_INPUT) {
      var inputName = cell.children[0];
      if (inputName.f2cCompiled === constants.SYNTAX_ERROR_TAG) {
        return;
      }
      var idx = context.setInputVariable(inputName.f2cCompiled, '');
      context.inputVariables[idx].value = inputs[idx];
    }
    cell = helpers.RunProgramSegmentAndGetNext(cell);
    numSteps--;
  }
  context.setIsRunning(false);

  return windows.Output;
};

var LoadGraphModelFromSaveFile = function(fileName) {
  var data = null;
  try {
    data = fs.readFileSync(fileName, 'utf8');
  } catch (e) {
    console.log('Couldn\'t read file: ' + fileName);
    return null;
  }

  if (data === '') {
    console.log('File: ' + fileName + ' is empty');
    return null;
  }

  var parsed = new xmldom.DOMParser().parseFromString(data);
  var encoded = parsed.childNodes[0];
  encoded.documentElement = encoded;
  
  // Need to change some behavior of xmldom returning empty string when attr doesn't exist
  var elementProto = Object.getPrototypeOf(encoded);
  var elementGetAttribute = elementProto.getAttribute;
  elementProto.getAttribute = function(attr) {
    return elementGetAttribute.call(this, attr) || null;
  };

  var model = new mxgraph.mxGraphModel();
  var decoder = new mxgraph.mxCodec(encoded);
  decoder.decode(encoded, model);

  return model;
};
