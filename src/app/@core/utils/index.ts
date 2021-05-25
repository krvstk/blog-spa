export class BlogUtils {

  /**
   *
   * Check for changed formControls in FormGroup
   * @param form
   */
  public static getChangedFields(form: any) {
    const dirtyValues = {};

    Object.keys(form.controls)
      .forEach(key => {
        const currentControl = form.controls[key];

        if (currentControl.dirty) {
          if (currentControl.controls) {
            dirtyValues[key] = this.getChangedFields(currentControl);
          } else {
            dirtyValues[key] = currentControl.value;
          }
        }
      });

    return dirtyValues;
  }
}
