
export enum ServerEndpoint {
    LOGIN="/public/v1/auth/login",
    UPDATE_FCM_TOKEN="/private/v1/user/update/fcmtoken",
    GET_LIST_GROUP="/private/v1/group/list",
    GET_DETAILS_GROUP="/private/v1/group/detail",
    DELETE_GROUP="/private/v1/group/delete",
    DELETE_BOT="/private/v1/bot/delete"
}