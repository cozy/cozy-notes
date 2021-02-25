export let AnnotationSelectionType;

(function (AnnotationSelectionType) {
  AnnotationSelectionType["INVALID"] = "invalid";
  AnnotationSelectionType["DISABLED"] = "disabled";
  AnnotationSelectionType["VALID"] = "valid";
})(AnnotationSelectionType || (AnnotationSelectionType = {}));

const prefix = 'ak-editor-annotation';
export const AnnotationTestIds = {
  prefix,
  floatingComponent: `${prefix}-floating-component`,
  floatingToolbarCreateButton: `${prefix}-toolbar-create-button`,
  componentSave: `${prefix}-dummy-save-button`,
  componentClose: `${prefix}-dummy-close-button`
};