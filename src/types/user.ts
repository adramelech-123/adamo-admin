
export interface UserData {
  id: string;
  img: string;
  cropped_img: string;
  firstname: string;
  surname: string;
  doc_type: string;
  doc_num: string;
  country: string;
  finalized: boolean;
  authenticity_score: number;
  cursor_check: number;
  id_presence: boolean;
}

export type EditableUserData = Partial<UserData>;
