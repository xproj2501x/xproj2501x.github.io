class Action {

}

class ActionResult {
  static success = new ActionResult(true, true);
  static fail = new ActionResult(false, true);
  static notFinished = new ActionResult(true, false);

  _succeeded;
  _done;

  constructor(succeeded, done) {
    this._succeeded = succeeded;
    this._done = done;
  }
}

export {Action, ActionResult}