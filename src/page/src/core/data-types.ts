export interface EditorStatus {
  isEditable: boolean;
  text: string;
  prevTexts: string[];
  vendorName: EditorVendorName;
}

export type EditorVendorName = "GOOGLE" | "NAVER";
