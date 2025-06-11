
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
  authenticity_score: string;
  cursor_check: string;
  id_presence: string;
}

export type EditableUserData = Partial<UserData>;
