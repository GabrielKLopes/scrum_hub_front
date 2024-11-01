export interface DecodedToken {
    email: string;
    user_id: number;
    username: string;
    permission?: {
      permission_id: number;
      name: string;
      type: boolean;
      created_at: string;
      updated_at: string;
    };
    permissionUser:{
      permissionUser_id: number;
      name:string;
      createdvalue:boolean;
      deletevalue:boolean;
      updatevaleu:boolean;
      created_at: string;
      updated_at: string;

    }
}