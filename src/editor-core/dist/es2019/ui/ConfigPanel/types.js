export let ValidationError;

(function (ValidationError) {
  ValidationError["Required"] = "required";
  ValidationError["Invalid"] = "invalid";
})(ValidationError || (ValidationError = {}));

export let FieldTypeError;

(function (FieldTypeError) {
  FieldTypeError["isMultipleAndRadio"] = "isMultipleAndRadio";
})(FieldTypeError || (FieldTypeError = {}));