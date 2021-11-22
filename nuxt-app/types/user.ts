export interface group {
  groupId: number;
  groupName: string;
}

export interface allowedCategory {
  id: number;
  name: string;
}

export interface user {
  userId: number;
  userEmail: string;
  photoMetaData: {
    MEDIUM: string;
    ORIGINAL: string;
  };
  groups: { [key: number]: group };
  fullName: string;
  alowedCategories: {
    groups?: allowedCategory[];
    user?: allowedCategory[];
  };
}
