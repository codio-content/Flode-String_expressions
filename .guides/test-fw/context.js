var constants = require('./constants');
var windows = require('./windows');

exports.ExecutionContext = {
  isRunning: false,
  variables: {},
  inputVariables: [],
  
  // Called by user-generated code

  get: function(variable) {
    var inputVariableIndex = this.getInputVariableIndex(variable);
    if (inputVariableIndex !== -1) {
      return this.inputVariables[inputVariableIndex].value;
    } else if (typeof this.variables[variable] !== 'undefined') {
      return this.variables[variable];
    }
    throw constants.VARIABLE_DOESNT_EXIST_ERROR + variable;
  },

  set: function(variable, value) {
    var inputVariableIndex = this.getInputVariableIndex(variable);
    if (inputVariableIndex !== -1) {
      this.inputVariables[inputVariableIndex].value = value;
    } else {
      this.variables[variable] = value;
    }
  },

  // Variable operations

  clearVariables: function() {
    for (var variable in this.variables) {
      if (this.variables.hasOwnProperty(variable)) {
        delete this.variables[variable];
      }
    }
  },

  resetVariables: function() {
    for (var variable in this.variables) {
      if (this.variables.hasOwnProperty(variable)) {
        this.variables[variable] = undefined;
      }
    }
  },

  printBlankVariables: function() {
    windows.SetVariableList(this.variables, false);
    windows.SetInputVariableList(this.inputVariables, true);
  },

  printVariables: function() {
    windows.SetVariableList(this.variables, true);
    windows.SetInputVariableList(this.inputVariables, false);
  },

  // Input variable operations
  
  getInputVariableIndex: function(name) {
    for (var i = 0; i < this.inputVariables.length; ++i) {
      if (this.inputVariables[i].name === name) {
        return i;
      }
    }
    return -1;
  },

  clearInputVariables: function() {
    this.inputVariables = [];
  },

  setInputVariable: function(name, value) {
    var inputVariableIndex = this.getInputVariableIndex(name);
    if (inputVariableIndex !== -1) {
      var inputVariable = this.inputVariables[inputVariableIndex];
      inputVariable.value = value;
      inputVariable.initialValue = value;
      return inputVariableIndex;
    }
    
    this.inputVariables.push({name: name, value: value, initialValue: value});
    return this.inputVariables.length - 1;
  },

  resetInputVariables: function() {
    for (var i = 0; i < this.inputVariables.length; ++i) {
      var initialValue = this.inputVariables[i].initialValue;
      this.inputVariables[i].value = Array.isArray(initialValue) ? initialValue.slice() : initialValue;
    }
  },
  
  // State operations

  setIsRunning: function(isRunning) {
    if (this.isRunning !== isRunning) {
      this.isRunning = isRunning;
      this.resetVariables();
      if (isRunning) {
        windows.SetWindowVisibility(true);
        this.resetInputVariables();
        this.printBlankVariables();
        windows.ClearOutput();
      }
    }
  }
};