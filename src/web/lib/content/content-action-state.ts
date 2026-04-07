export interface ContentActionState {
  fieldErrors: Record<string, string>;
  message: string | null;
  status: "error" | "idle" | "success";
}

export const INITIAL_CONTENT_ACTION_STATE: ContentActionState = {
  fieldErrors: {},
  message: null,
  status: "idle",
};
