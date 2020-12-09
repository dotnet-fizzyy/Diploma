import * as routeConstants from '../constants/routeConstants';
import * as axios from './index';

export async function getUsers(params?: any) {
    const response = await axios.axiosGet(routeConstants.UsersUrl, params);

    return response.data;
}

export async function changeStoryColumn(jsonPatchDocument) {
    await axios.axiosPatch(routeConstants.StoriesUrls.boardMove, jsonPatchDocument);
}
