export interface ContentImageUploadActionState {
  fieldName: string | null;
  message: string | null;
  status: "error" | "idle" | "success";
  uploadedPath: string | null;
}

export const INITIAL_CONTENT_IMAGE_UPLOAD_ACTION_STATE: ContentImageUploadActionState = {
  fieldName: null,
  message: null,
  status: "idle",
  uploadedPath: null,
};
