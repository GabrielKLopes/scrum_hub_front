export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUserPermission {
  permission_id: number;
  name: string;
  type: boolean;
  created_at: string;
  updated_at: string;
}

export interface IUserPermissionUser {
  permissionUser_id: number;
  name: string;
  createValue: boolean;
  deleteValue: boolean;
  updateValue: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  user_id: number;
  name: string;
  email?: string;
  creator?: {
    user_id: number;
    name: string;
    email: string;
  };
  permission?: {
    permission_id: number;
    name:string;
  };
  permissionUser?: {
    permissionUser_id: number;
    name:string;
  };
  squad?: {
    squad_id: number;
    name?:string;
  };
  created_at?: string;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  permissionUser_id: number;
  permission_id: number;
  squad_id: number;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  permission?: {
    permission_id: number;
  };
  permissionUser?: {
    permissionUser_id: number;
  };
  squad?: {
    squad_id: number;
  };
}
