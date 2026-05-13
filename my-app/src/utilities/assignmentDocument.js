function normalizeId(v) {
  if (v == null) return "";
  if (typeof v === "object" && v.toString) return v.toString();
  return String(v);
}

/**
 * Student-submitted assignment files.
 * @param {object} doc
 * @param {object | null} viewer current user from localStorage
 */
export function isStudentSubmission(doc, viewer) {
  if ((doc.category || "") !== "Assignment") return false;
  if (doc.assignmentKind === "submission") return true;
  if (doc.assignmentKind === "handout") return false;
  if (doc.uploaderRole === "Student") return true;
  if (
    viewer?.role === "Student" &&
    !doc.uploaderRole &&
    normalizeId(doc.uploaderId) === normalizeId(viewer?._id)
  ) {
    return true;
  }
  return false;
}

/**
 * Teacher-published assignment materials (handouts, etc.)
 */
export function isTeacherHandout(doc, viewer) {
  if ((doc.category || "") !== "Assignment") return false;
  return !isStudentSubmission(doc, viewer);
}
