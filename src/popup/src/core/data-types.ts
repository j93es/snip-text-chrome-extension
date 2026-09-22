export interface EditorStatus {
  isEditorRendered: boolean;
  text: string;
  prevTexts: string[];
  vendorName: EditorVendorName;
}

export type EditorVendorName = "GOOGLE" | "NAVER";
